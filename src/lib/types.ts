import * as mupdfjs from 'mupdf/mupdfjs';

export type Color = mupdfjs.Color;
export type Rect = [ number, number, number, number ];

// <index> <isFlat>
export type Key = [ number, boolean ];

export interface SongMeta {
    title: string;
    author: string;
    description: string;
    text: string;
    key: Key;
    tempo?: number;
    timeSignature?: string;
    type: "nashville" | "chords";
    capo: number;
}

export interface Source {
    data: ArrayBuffer;
    patch: PatchData;
}

export interface PatchData {
    chords: { [key: number]: ChordPatchData[] };
    titleLocation: Rect;
    detailLocation?: Rect; // (Keys + Tempo + Time)
    capoLocation: Rect;
}

export interface ChordPatchData {
    rect: Rect;
    prefix: string;
    nashvile: string;
}

// export interface PatchOptions {
//     align?: number; // defaults to align left center
//     size: number;
//     thickness: number; 
//     color?: Color; // defaults to black
//     font?: string; // defaults to Helvetica
// };

export interface Song {
    id?: number;
    sourceId: number;
    meta: SongMeta;
    //  notes: Note[];
}

export interface Setlist {
    id?: number;
    title: string;
    description: string;
    author: String;
    songs: number[];
    createdAt: number;
    updatedAt: number;
}

export const ALIGN_LEFT_CENTER = 0;
export const ALIGN_RIGHT_CENTER = 1;