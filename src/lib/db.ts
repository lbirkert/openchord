
import { type DBSchema, type IDBPDatabase } from 'idb';
import { type Source, type Song, type Setlist } from './types.js';
import { browser } from '$app/environment';

// Define the database schema
interface OpenChordDB extends DBSchema {
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
            id?: string;
            data: ArrayBuffer; // Binary PDF data
            timestamp: number; // Store insertion time
        };
        indexes: {
            timestamp: 'timestamp';
        };
    };
}

class IDBWrapper {
    _idb?: IDBPDatabase<OpenChordDB>;
    _initPromise: Promise<void>

    constructor() {
        this._initPromise = this._init();
    }

    async _init() {
        if (!browser) await new Promise(() => { });
        const idb = await import('idb');
        console.log('[IDB] opening database!')
        this._idb = await idb.openDB<OpenChordDB>('OpenChord2', 1, {
            terminated() {
                console.log('[IDB] terminated...');
            },
            blocked() {
                console.log('[IDB] blocked...');
            },
            blocking() {
                console.log('[IDB] blocking...');
            },
            upgrade(db) {
                console.log('[IDB] performing upgrade')
                db.createObjectStore('source', { keyPath: 'id', autoIncrement: true });
                db.createObjectStore('song', { keyPath: 'id', autoIncrement: true });
                db.createObjectStore('setlist', { keyPath: 'id', autoIncrement: true });
                db.createObjectStore('pdfCache', { keyPath: 'id' })
                    .createIndex('timestamp', 'timestamp');
            },
        });
    }

    async get(): Promise<IDBPDatabase<OpenChordDB>> {
        await this._initPromise;
        return this._idb!;
    }
}

export const db = new IDBWrapper();