
import { type DBSchema, type IDBPDatabase } from 'idb';
import { type Source, type Song, type Setlist } from './types.js';
import { browser } from '$app/environment';

// Define the database schema
interface OpenSongDB extends DBSchema {
    source: {
        key: number; // Auto-incrementing ID
        value: Source;
    };
    song: {
        key: number; // Auto-incrementing ID
        value: Song;
    };
    setlist: {
        key: number; // Auto-incrementing ID
        value: Setlist;
    };
    pdfCache: {
        key: string; // key is: song_id + hash of song_meta
        value: {
            data: Uint8Array; // Binary PDF data
            timestamp: number; // Store insertion time
        };
    };
}

class IDBWrapper {
    _idb?: IDBPDatabase<OpenSongDB>;
    _initPromise: Promise<void>

    constructor() {
        this._initPromise = this._init();
    }

    async _init() {
        if(!browser) await new Promise(()=>{});
        const idb = await import('idb');
        this._idb = await idb.openDB<OpenSongDB>('OpenSong', 1, {
            upgrade(db) {
                db.createObjectStore('source', { keyPath: 'id', autoIncrement: true });
                db.createObjectStore('song', { keyPath: 'id', autoIncrement: true });
                db.createObjectStore('setlist', { keyPath: 'id', autoIncrement: true });
                db.createObjectStore('pdfCache', { keyPath: 'id' });
            },
        });
    }

    async get(): Promise<IDBPDatabase<OpenSongDB>> {
        await this._initPromise;
        return this._idb!;
    }
}

export const db = new IDBWrapper();