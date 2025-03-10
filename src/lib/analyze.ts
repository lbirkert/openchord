import * as pdfjsLib from 'pdfjs-dist';
import type { TextItem, TextStyle } from 'pdfjs-dist/types/src/display/api.js';
import { dumpKey, isNashvile, parseKey } from './chord.js';
import type { ChordPatchData, Key, PatchData, Rect, SongMeta, Source } from './types.js';
import type { Font } from 'pdf-lib/cjs/types/fontkit.js';

export const wordsKey = [
    'Tonart', 'Key'
];

export const wordsTempo = [
    'Tempo'
];

export const wordsTimeSignature = [
    'Time', 'Taktart'
];


type Line = {
    text: string;
    rect: Rect;
};

function _extendLine(word: TextItem, line: Line | undefined, style: TextStyle): Line {
    const minX = word.transform[4],
        maxX = minX + word.width,
        minY = word.transform[5] + style.descent * word.height,
        maxY = minY + word.height,
        text = word.str.trim();
    if (line === undefined) {
        return {
            text, rect: [minX, minY,
                maxX, maxY,]
        };
    }

    // enlarge rect
    line.rect[0] = Math.min(line.rect[0], minX);
    line.rect[1] = Math.min(line.rect[1], minY);
    line.rect[2] = Math.max(line.rect[2], maxX);
    line.rect[3] = Math.max(line.rect[3], maxY);

    if (text !== '' && line.text !== '') {
        line.text += ' ';
    }
    line.text += text;

    return line;
}

function _getLines(words: TextItem[], styles: { [key: string]: TextStyle }): Line[] {
    const EPSILON = 1.0;

    // Sort words
    const sorted = words.toSorted((a, b) => {
        const ay = a.transform[5],
            by = b.transform[5],
            ax = a.transform[4],
            bx = b.transform[4];

        return Math.abs(ay - by) < EPSILON ? ax - bx : by - ay;
    });

    // Group words with similar y-val
    const lines = [];
    let line: Line | undefined;
    let lastY: number | undefined;
    for (const word of sorted) {
        const wordY = word.transform[5];
        if (lastY === undefined) lastY = wordY;
        if (lastY! - wordY > EPSILON) {
            lines.push(line!);
            line = undefined;
            lastY = wordY;
        }

        line = _extendLine(word, line, styles[word.fontName]!);
    }

    return lines;
}

function _cleanLyrics(line: string): string {
    // Remove binds
    return line.replace(/\s*-\s*/gm, '');
}

// analyze a song sheet
// TODO: keyhint for analysis
export async function analyzeSheet(data: ArrayBuffer): Promise<[Source, SongMeta]> {
    const dataClone = new ArrayBuffer(data.byteLength);
    new Uint8Array(dataClone).set(new Uint8Array(data));
    const pdf = await pdfjsLib.getDocument({ data: dataClone }).promise;

    // patch data
    // let titlePatch: HeaderPatch = undefined!;
    // let capoPatch: HeaderPatch = undefined!;
    // let authorPatch: HeaderPatch = undefined!;
    // let descriptionPatch: HeaderPatch | undefined;
    // let detailPatch: HeaderPatch | undefined;
    // let chordPatches: { [page: number]: ChordPatch[] } = {};

    let titleLocation: Rect = undefined!;
    let capoLocation: Rect = undefined!;
    let detailLocation: Rect | undefined;
    let chords: { [page: number]: ChordPatchData[] } = {};

    // metadata
    let title: string = undefined!;
    let author: string = '';
    let description: string = '';
    let text: string = '';
    let key: Key = parseKey('C')!;
    let timeSignature: string | undefined;
    let tempo: number | undefined;

    for (let pageN = 1; pageN <= pdf.numPages; pageN++) {
        const page = await pdf.getPage(pageN);
        const textContent = await page.getTextContent();
        const words = textContent.items.map((w) => w as TextItem);

        console.log(words);

        const lines = _getLines(words, textContent.styles);

        // extract lyrics
        const lyricLines = lines.slice(4).filter((line) => {
            const score = line.text.split(' ').map((w) => w.length).reduce((a, b) => a + b, 0);
            return score > 15;
        }).map((l) => _cleanLyrics(l.text));
        if (text !== '') text += ' ';
        text += lyricLines.join(' ');

        // TODO: make this more pretty
        if (pageN === 1) {
            // fallback description
            description = lyricLines[0];

            // title line is always the 1st
            titleLocation = lines[0].rect;
            title = lines[0].text;

            // find detail line
            let detailLineIdx: number | undefined;
            for (let lineIdx = 1; lineIdx < lines.length; lineIdx++) {
                const line = lines[lineIdx];
                const lineWords = line.text.split(' ').reverse();
                while (true) {
                    if (lineWords.length == 0) {
                        detailLocation = line.rect;
                        detailLineIdx = lineIdx;
                        break;
                    }

                    const wordKey = lineWords.pop()!;
                    lineWords.pop();
                    const wordValue = lineWords.pop();
                    lineWords.pop();
                    if (wordValue === undefined) break;
                    if (wordsKey.includes(wordKey)) {
                        key = parseKey(wordValue) ?? key;
                    } else if (wordsTempo.includes(wordKey)) {
                        tempo = parseInt(wordValue);
                    } else if (wordsTimeSignature.includes(wordKey)) {
                        timeSignature = wordValue;
                    } else break;
                }

                if (detailLineIdx !== undefined) break;
            }

            if (detailLineIdx !== undefined) {
                // only author
                if (detailLineIdx > 1)
                    author = lines[1].text;

                // author + description
                if (detailLineIdx > 2) {
                    description = lines[2].text;
                }
            }

            // place capo patch at top right corner
            const viewport = page.getViewport();
            const capoX = viewport.viewBox[2] - 30, capoY = viewport.viewBox[3] - 100;
            capoLocation = [capoX, capoY, capoX, capoY];
        }

        // find chord section
        let chordStart = 0;
        let lastY = 0;
        for (const word of words) {
            // TODO: epsilon this
            const wordY = word.transform[5];
            if (wordY < lastY) break;
            chordStart += 1;
            lastY = wordY;
        }

        // get chord patches
        chords[pageN] = [];
        for (let i = chordStart; i < words.length; i++) {
            const word = words[i];
            const minX = word.transform[4],
                maxX = minX + word.width,
                minY = word.transform[5],
                maxY = minY + word.height;
            const segs = word.str.trim().split(' ');
            const nashvile = segs[segs.length - 1];
            segs[segs.length - 1] = '';
            const prefix = segs.join(' ');

            // check for invalid prefix
            if(prefix.match(/^[|:\s]*$/gm) === null) continue;

            // check for proper nashvile
            if (!isNashvile(nashvile)) continue;

            chords[pageN].push({
                rect: [minX, minY, maxX, maxY],
                nashvile,
                prefix: segs.join(' '),
            });
        }
    }

    await pdf.destroy();

    const patch: PatchData = {
        titleLocation,
        detailLocation,
        capoLocation,
        chords,
    };

    const meta: SongMeta = {
        title,
        author,
        description,
        tempo,
        text,
        key,
        timeSignature,
        capo: 0,
        type: 'chords',
    };

    console.log('Title', title);
    console.log('Author', author);
    console.log('Text', text);
    console.log('Description', description);
    console.log('Key', dumpKey(key!));
    console.log('Time', timeSignature);
    console.log('Tempo', tempo);
    console.log('Chords', chords);

    return [{
        data,
        patch
    }, meta];
}