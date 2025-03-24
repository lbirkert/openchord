// Chord base notes

import type { Key } from "./types.js";

// <function>: <sharp variant> <flat variant>
export const chordBases = [
    ['C', 'C'],
    ['C#', 'Db'],
    ['D', 'D'],
    ['D#', 'Eb'],
    ['E', 'E'],
    ['F', 'F'],
    ['F#', 'Gb'],
    ['G', 'G'],
    ['G#', 'Ab'],
    ['A', 'A'],
    ['A#', 'Bb'],
    ['B', 'B'],
];

// Chord base notes (nashvile)
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


// Circle of fiths
export const circleOfFiths: { [keyStr: string]: Key } = {
    'C': [0, false],
    'G': [7, false],
    'D': [2, false],
    'A': [9, false],
    'E': [4, false],
    'B': [11, false],
    'F#': [6, false],
    'F': [5, true],
    'Bb': [10, true],
    'Eb': [3, true],
    'Ab': [8, true],
    'Db': [1, true],
    'Gb': [6, true],
};

// capo keys are the non-sharped base notes
export const capoKeys = chordBases.map((c) => c[1]);

// Key str aliases
export const keyStrAlias: { [keyStr: string]: string } = {
    'Ges': 'Gb',
    'Des': 'Db',
    'As': 'Ab',
    'Es': 'Eb',
    'H': 'B',
    'Fis': 'F#',
    'Hb': 'Bb', // unconventional
    'Hes': 'Bb', // unconventional
};

export function parseKey(keyStr: string): Key | undefined {
    return circleOfFiths[keyStrAlias[keyStr] ?? keyStr];
}

export function dumpKey(key: Key): string {
    return chordBases[key[0]][key[1] ? 1 : 0];
}

// get index of base note
export function getBaseIdx(base: string, bases: string[][]) {
    for (let i = 0; i < bases.length; i++) {
        if (bases[i].includes(base)) return i;
    }

    throw Error(`Invalid base note! ${base}`);
}

// convert chord in nashvile form to the appropriate key
export function convertChord(text: string, key: Key): string | undefined {
    // 1. Step, check root
    const root = chordBasesNashvile.flat().find((base) => text.startsWith(base));
    if (!root) {
        return undefined;
    }
    const root_idx = getBaseIdx(root, chordBasesNashvile);
    const croot = chordBases[modKeyIdx(root_idx + key[0])][key[1] ? 1 : 0]; // TODO: maybe don't take the 1st always
    text = text.substring(root.length);

    // 2. Step, get inversion
    const inversion = chordBasesNashvile.flat().find((base) => text.endsWith('/' + base));
    let cinversion = '';
    if (inversion) {
        const inversion_idx = getBaseIdx(inversion, chordBasesNashvile);
        text = text.substring(0, text.length - inversion.length - 1);
        cinversion = '/' + chordBases[modKeyIdx(inversion_idx + key[0])][key[1] ? 1 : 0]; // TODO: same here
    }

    // TODO: 3. Step => extensions

    return croot + text + cinversion;
}

export function isNashvile(text: string): boolean {
    return convertChord(text, parseKey('C')!) !== undefined;
}

export function modKeyIdx(keyIdx: number) {
    const KEYS = chordBases.length;
    return ((keyIdx % KEYS) + KEYS) % KEYS;
}
