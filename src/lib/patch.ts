import { PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib';
import type { Rect, Song, SongMeta, Source } from './types.js';
import { capoKeys, convertChord, dumpKey, modKeyIdx, parseKey } from './chord.js';
import hash from 'object-hash';
import { db } from './db.js';
import * as mupdfjs from 'mupdf/mupdfjs';

function _redact(page: PDFPage, rect: Rect) {
    page.drawRectangle({
        x: rect[0],
        y: rect[1],
        width: rect[2] - rect[0],
        height: rect[3] - rect[1],
        color: rgb(1, 1, 1),
    });
}

export async function patchSheet(source: Source, meta: SongMeta): Promise<ArrayBuffer> {
    // Load the existing PDF
    const pdfDoc = await PDFDocument.load(source.data);
    const pages = pdfDoc.getPages();

    const firstPage = pages[0];
    _redact(firstPage, source.patch.titleLocation);

    const transposeKey = meta.capo == 0 ? meta.key :
        parseKey(capoKeys[modKeyIdx(meta.key[0] - meta.capo)])!;

    const helv = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    firstPage.drawText(meta.title, {
        x: source.patch.titleLocation[0],
        y: source.patch.titleLocation[1] + 3,
        font: helv,
        size: 15,
        color: rgb(0, 0, 0),
    });

    if (source.patch.detailLocation !== undefined) {
        _redact(firstPage, source.patch.detailLocation);
        //const detailText = 'Key - A | Tempo - 188 | Time - 4/4'; // TODO
        let detailText = 'Key - ' + dumpKey(meta.key);
        if (meta.tempo) detailText += ' | Tempo - ' + meta.tempo;
        if (meta.timeSignature) detailText += ' | Time - ' + meta.timeSignature;

        firstPage.drawText(detailText, {
            x: source.patch.detailLocation[0],
            y: source.patch.detailLocation[1] + 2,
            font: helv,
            size: 8,
            color: rgb(0, 0, 0),
        });
    }

    if (meta.capo !== 0) {
        const capoText = `Capo ${meta.capo} - ${dumpKey(transposeKey)}`;
        firstPage.drawText(capoText, {
            x: source.patch.capoLocation[0] - capoText.length * 6.5,
            y: source.patch.capoLocation[1],
            font: helv,
            size: 12,
            color: rgb(0, 0, 0),
        });
    }

    for (let pageIdx = 0; pageIdx < pages.length; pageIdx++) {
        const page = pages[pageIdx];
        const chords = source.patch.chords[pageIdx];

        for (const chord of chords) {
            const rect: Rect = [...chord.rect];
            _redact(page, rect);

            const converted = convertChord(chord.nashvile, transposeKey)!;
            console.log(chord.nashvile, converted);
            page.drawText(converted, {
                x: rect[0],
                y: rect[1],
                font: helv,
                size: 12,
                color: rgb(0, 0, 0),
            });
        }

    }


    // Save modified PDF
    const data = await pdfDoc.save();
    return data.buffer as ArrayBuffer;
}

export async function getSheet(song: Song): Promise<ArrayBuffer> {
    const CACHE_MAX_ENTRIES = 5;

    const metaHash = hash(song.meta);
    const cacheKey = `${song.id!}_${metaHash}`;
    const cached = await (await db.get()).get('pdfCache', cacheKey);
    if (cached !== undefined) {
        return cached.data;
    }
    const source = await (await db.get()).get('source', song.sourceId);
    if (source === undefined) {
        throw Error('song has missing source');
    }
    const data = await patchSheet(source, song.meta);

    const tx = (await db.get()).transaction('pdfCache', 'readwrite');
    // clear cache if necessary
    let count = await tx.store.count();

    const cursor = await tx.store.index('timestamp').openCursor();
    while (count-- >= CACHE_MAX_ENTRIES) {
        await cursor?.delete();
        await cursor?.continue();
    }

    await tx.store.add({
        data,
        timestamp: Date.now(),
        id: cacheKey,
    });

    return data;
}