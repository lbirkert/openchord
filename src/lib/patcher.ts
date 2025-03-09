// This file is for patching the key of a Songselect/CCLI songsheet.

import type { PDFPage } from 'mupdf';
import * as mupdfjs from 'mupdf/mupdfjs';

export const chordBases = [
    ['C', 'C'],
    ['C#', 'Db', 'Cis', 'Des'],
    ['D', 'D'],
    ['D#', 'Eb', 'Dis', 'Es'],
    ['E', 'E'],
    ['F', 'F'],
    ['F#', 'Gb', 'Fis', 'Ges'],
    ['G', 'G'],
    ['G#', 'Ab', 'Gis', 'As'],
    ['A', 'A'],
    ['A#', 'Bb', 'Ais', 'Bes'],
    ['B', 'B', 'H'],
];

export const chordBasesNashvile = [
    ['1'],
    ['#1', 'b2'],
    ['2'],
    ['#2', 'b3'],
    ['3'],
    ['4'],
    ['#4', 'b5'],
    ['5'],
    ['#5', 'b6'],
    ['6'],
    ['#6', 'b7'],
    ['7']
];

// get index of base note
export function getBaseIdx(base: string, bases: string[][]) {
    for (let i = 0; i < bases.length; i++) {
        if (bases[i].includes(base)) return i;
    }

    throw Error(`Invalid base note! ${base}`);
}

// convert chord in nashvile form to the appropriate key
export function convertChord(text: string, key: string) {
    const key_idx = getBaseIdx(key, chordBases);

    // 1. Step, check root
    const root = chordBasesNashvile.flat().find((base) => text.startsWith(base));
    if (!root) {
        return null;
    }
    const root_idx = getBaseIdx(root, chordBasesNashvile);
    const croot = chordBases[(root_idx + key_idx) % chordBases.length][0]; // TODO: maybe don't take the 1st always
    text = text.substring(root.length);

    // 2. Step, get inversion
    const inversion = chordBasesNashvile.flat().find((base) => text.startsWith('/' + base));
    let cinversion = '';
    if (inversion) {
        const inversion_idx = getBaseIdx(inversion, chordBasesNashvile);
        text = text.substring(0, text.length - inversion.length - 1);
        cinversion = '/' + chordBases[(inversion_idx + key_idx) % chordBases.length][0]; // TODO: same here
    }

    // TODO: 3. Step => extensions

    return croot + text + cinversion;
}

export type PDFWord = {
    rect: mupdfjs.Rect,
    text: string,
    font: mupdfjs.Font,
    size: number,
};

// Get the words of the page
export function getWords(page: PDFPage): PDFWord[] {
    const words: PDFWord[] = [];
    let cwordRect: mupdfjs.Rect | undefined;
    let cwordFont: mupdfjs.Font | undefined;
    let cwordSize: number | undefined;
    let cwordText = '';

    const endWord = () => {
        // If word is complete, append to list
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

    const enlargeRect = ([x0, y0, _, __, ___, ____, x1, y1]: number[]) => {
        if(cwordRect === undefined) {
            return cwordRect = [x0, y0, x1, y1];
        }

        cwordRect[0] = Math.min(cwordRect[0], x0);
        cwordRect[1] = Math.min(cwordRect[1], y0);
        cwordRect[2] = Math.max(cwordRect[2], x1);
        cwordRect[3] = Math.max(cwordRect[3], y1);
    }

    page.toStructuredText('').walk({
        onChar(c, _origin, font, size, quad) {
            enlargeRect(quad);

            cwordFont = font;
            cwordSize = size;
            
            if(c == ' ') {
                endWord();
            } else {
                cwordText += c;
            }
        },
        endLine: endWord,
    });

    return words;
}

export function overwriteChords(contents: Uint8Array, key: string): Uint8Array {
    const doc: mupdfjs.PDFDocument = mupdfjs.PDFDocument.openDocument(contents, 'application/pdf');

    for (let pageIdx = 0; pageIdx < doc.countPages(); pageIdx++) {
        const page = new mupdfjs.PDFPage(doc, pageIdx);
        const words = getWords(page);

        // find chord section
        let last_y = 0;
        let end_section = 0;
        for (const word of words) {
            const curr_y = word.rect[3];
            if (curr_y < last_y) {
                break;
            }
            end_section += 1;
            last_y = curr_y;
        }

        console.log(words.slice(end_section).map(w => w.text));

        // convert the chords and overwrite them
        for (let i = end_section; i < words.length; i++) {
            const { rect: [x0, y0, x1, y1], text } = words[i];

            const new_chord = convertChord(text, key);
            if (new_chord == null) {
                continue;
            }

            const width = x1 - x0, height = y1 - y0;

            page.addRedaction({ x: x0, y: y0, width, height });
            page.applyRedactions(false);

            const fontSize = 11;
            const padding = 2;
            const color: [number, number, number] = [0, 0, 0];
            page.insertText(new_chord, [x0, y1 - fontSize - padding], 'Helvetica', fontSize, {
                strokeThickness: 0.5, fillColor: color, strokeColor: color,
            });
        }
        
        page.destroy();
    }

    const result = doc.saveToBuffer().asUint8Array();
    doc.destroy();
    return result;
}