// TODO: refactor back to mupdf

import * as pdfjsLib from 'pdfjs-dist';
import type { TextItem, TextStyle } from 'pdfjs-dist/types/src/display/api.js';
import { convertChordToNashvile, dumpKey, isNashvile, isNashvileConvertable, parseKey } from './chord.js';
import type { ChordPatchData, Key, PatchData, Rect, SongMeta, Source } from './types.js';
import { Font, PDFDocument, PDFPage, type PDFWord, type Quad } from 'mupdf/mupdfjs';

export const wordsKey = [
    'Tonart', 'Key'
];

export const wordsTempo = [
    'Tempo'
];

export const wordsTimeSignature = [
    'Time', 'Taktart'
];

export type PDFLine = {
    rect: Rect,
    text: string,
};

// Get the lines
function _getLines(words: PDFWord[]): PDFLine[] {
    const EPSILON = 2;

    const sorted = words.toSorted((a, b) => {
        return a.rect[3] - b.rect[3];
    });

    const lines: PDFLine[] = [];

    let lineWords: PDFWord[] = [];
    let lineRect: Rect | undefined;
    let lastY;

    const enlargeRect = (wordRect: Rect) => {
        if (lineRect === undefined) {
            return lineRect = [...wordRect];
        }

        if (wordRect[0] > wordRect[2] || wordRect[1] > wordRect[3]) {
            throw Error(wordRect.toString());
        }

        lineRect[0] = Math.min(lineRect[0], wordRect[0]);
        lineRect[1] = Math.min(lineRect[1], wordRect[1]);
        lineRect[2] = Math.max(lineRect[2], wordRect[2]);
        lineRect[3] = Math.max(lineRect[3], wordRect[3]);
    }

    for (const word of sorted) {
        if (lastY !== undefined &&
            Math.abs(word.rect[3] - lastY) > EPSILON) {
            lineWords.sort((a, b) => {
                return a.rect[0] - b.rect[0];
            });
            const text = lineWords.map((w) => w.text).join(' ');
            lines.push({
                rect: lineRect!,
                text
            });
            lineWords = [];
            lineRect = undefined;
        }
        lineWords.push(word);
        enlargeRect(word.rect);
        lastY = word.rect[3];
    }

    return lines;
}

function _getWords(page: PDFPage) {
    const words: PDFWord[] = [];
    let cwordRect: Rect | undefined;
    let cwordFont: Font | undefined;
    let cwordSize: number | undefined;
    let cwordText = '';

    const endWord = () => {
        // if word is complete, append to list
        if (
            cwordRect !== undefined &&
            cwordFont !== undefined &&
            cwordSize !== undefined &&
            cwordText !== ''
        ) {
            words.push({
                rect: cwordRect,
                text: cwordText,
                font: cwordFont,
                size: cwordSize,
            });
        }

        // Reset values
        cwordRect = undefined;
        cwordFont = undefined;
        cwordSize = undefined;
        cwordText = '';
    };

    const enlargeRect = (quad: Quad) => {
        if (cwordRect === undefined) {
            cwordRect = [quad[0], quad[1], quad[6], quad[7]];
            return;
        }

        cwordRect[0] = Math.min(cwordRect[0], quad[0]);
        cwordRect[1] = Math.min(cwordRect[1], quad[1]);
        cwordRect[2] = Math.max(cwordRect[2], quad[6]);
        cwordRect[3] = Math.max(cwordRect[3], quad[7]);
    }

    // extract the words from the page
    page.toStructuredText("preserve-whitespace,preserve-spans").walk({
        onChar(c, _origin, font, size, quad) {
            cwordFont = font;
            cwordSize = size;

            // split by whitespace
            if (c == ' ') {
                endWord();
            } else {
                enlargeRect(quad);
                cwordText += c;
            }
        },
        // split by block
        endLine: endWord,
        endTextBlock: endWord,
    });

    return words;
}

function _cleanLyrics(line: string): string {
    // Remove binds
    return line.replace(/\s*-\s*/gm, '');
}

function _mergeClose(textItems: PDFWord[]) {
    // return textItems;
    const MAX_Y_DIFF = 0;
    const MAX_X_DIFF = 1;
    const mergedItems = [];

    let lastMaxX: number = 0;
    let lastMinY: number = 0;
    for (const item of textItems) {
        console.log(item, lastMinY, lastMaxX);
        if (Math.abs(item.rect[0] - lastMaxX) < MAX_X_DIFF &&
            Math.abs(lastMinY - item.rect[1]) < MAX_Y_DIFF) {
            const merge = mergedItems[mergedItems.length - 1];
            merge.text += item.text;
            merge.rect[0] = Math.min(merge.rect[0], item.rect[0]);
            merge.rect[1] = Math.min(merge.rect[1], item.rect[1]);
            merge.rect[2] = Math.max(merge.rect[2], item.rect[2]);
            merge.rect[3] = Math.max(merge.rect[3], item.rect[3]);
            console.log('MERGE');
        } else mergedItems.push(item);

        lastMaxX = item.rect[2];
        lastMinY = item.rect[1];
    }

    //console.log(mergedItems);

    return mergedItems;
}


// analyze a song sheet
// TODO: keyhint for analysis
export async function analyzeSheet(data: ArrayBuffer): Promise<[Source, SongMeta]> {
    const doc = PDFDocument.openDocument(data, 'application/pdf');

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

    for (let pageIdx = 0; pageIdx < doc.countPages(); pageIdx++) {
        const page = new PDFPage(doc, pageIdx);
        const words = _mergeClose(_getWords(page));
        const lines = _getLines(words);

        const viewport = page.getBounds();
        const convrect = (rect: Rect) => {
            [rect[3], rect[1]] = [
                viewport[3] - rect[1],
                viewport[3] - rect[3]
            ];
            return rect;
        };

        // extract lyrics
        const lyricLines = lines.slice(4).filter((line) => {
            const score = line.text.split(' ').map((w) => w.length).reduce((a, b) => a + b, 0);
            return score > 15;
        }).map((l) => _cleanLyrics(l.text));
        if (text !== '') text += ' ';
        text += lyricLines.join(' ');

        // TODO: make this more pretty
        if (pageIdx === 0) {
            // fallback description
            description = lyricLines[0];

            // title line is always the 1st
            titleLocation = convrect(lines[0].rect);
            console.log('TITLOC', titleLocation, viewport);
            title = lines[0].text;

            // find detail line
            let detailLineIdx: number | undefined;
            for (let lineIdx = 1; lineIdx < lines.length; lineIdx++) {
                const line = lines[lineIdx];
                const lineWords = line.text.split(' ').reverse();
                while (true) {
                    if (lineWords.length == 0) {
                        detailLocation = convrect(line.rect);
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
            const capoX = viewport[2] - 30, capoY = viewport[3] - 100;
            capoLocation = [capoX, capoY, capoX, capoY];
        }

        // find chord section
        let chordStart = 0;
        let lastY = 0;
        for (const word of words) {
            // TODO: epsilon this
            const wordY = word.rect[1];
            if (wordY < lastY) break;
            chordStart += 1;
            lastY = wordY;
        }

        // get chord patches
        chords[pageIdx] = [];
        for (let i = chordStart; i < words.length; i++) {
            const word = words[i];

            // check for proper nashvile
            if (isNashvileConvertable(word.text, key)) {
                word.text = convertChordToNashvile(word.text, key)!;
            }
            if (!isNashvile(word.text)) continue;

            chords[pageIdx].push({
                rect: convrect(word.rect),
                nashvile: word.text,
            });
        }
    }

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