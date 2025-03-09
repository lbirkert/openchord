import { db, type OpenSongDB } from "./db.js";
import { overwriteChords } from "./patcher.js";
import type { Song, PDFSource, Setlist } from "./types.js";

class SetlistPool {
    db: OpenSongDB

    _cache: Map<number, Setlist>
    _initPromise: Promise<void>

    constructor(db: OpenSongDB) {
        this.db = db;
        this._cache = new Map();
        this._initPromise = this._populate()
    }

    async _populate() {
        const entries = await this.db.getAll('setlists');
        for (const entry of entries) {
            this._cache.set(entry.id, {
                name: entry.name,
                songs: entry.songs,
            });
        }
    }

    async delete(id: number): Promise<void> {
        this._cache.delete(id);
        await this.db.delete('setlists', id);
    }

    async add(song: Setlist): Promise<number> {
        const key = await this.db.add('setlists', song) as number;
        this._cache.set(key, song);
        return key;
    }

    async get(id: number): Promise<Setlist | undefined> {
        await this._initPromise;
        return this._cache.get(id);
    }

    async getAll(id: number): Promise<Map<number, Setlist>> {
        await this._initPromise;
        return this._cache;
    }
}

class SongPool {
    db: OpenSongDB

    _cache: Map<number, Song>
    _initPromise: Promise<void>

    constructor(db: OpenSongDB) {
        this.db = db;
        this._cache = new Map();
        this._initPromise = this._populate()
    }

    async _populate() {
        const entries = await this.db.getAll('songs');
        for (const entry of entries) {
            this._cache.set(entry.id, {
                name: entry.name,
            });
        }
    }

    async delete(id: number): Promise<void> {
        this._cache.delete(id);
        await this.db.delete('songs', id);
    }

    async add(song: Song): Promise<number> {
        const key = await this.db.add('songs', song) as number;
        this._cache.set(key, song);
        return key;
    }

    async get(id: number): Promise<Song | undefined> {
        await this._initPromise;
        return this._cache.get(id);
    }

    async getAll(id: number): Promise<Map<number, Song>> {
        await this._initPromise;
        return this._cache;
    }
}

class PDFSourcePool {
    db: OpenSongDB

    _cache: Map<string, PDFSource>
    _lastAccess: Map<string, number>

    static CACHE_MAX_SIZE = 1000;

    constructor(db: OpenSongDB) {
        this.db = db;
        this._cache = new Map();
        this._lastAccess = new Map();
    }

    // free the cache
    free() {
        const toRemove = this._lastAccess.entries().toArray().sort((a, b) => {
            return b[1] - a[1];
        }).slice(PDFSourcePool.CACHE_MAX_SIZE).map((e) => e[0]);

        for (const entry of toRemove) {
            this._cache.delete(entry);
        }
    }

    _cacheInsert(id: string, source: PDFSource) {
        this._cache.set(id, source);
        this._lastAccess.set(id, Date.now());
        this.free();
    }

    async delete(id: string): Promise<void> {
        this._cache.delete(id);
        await this.db.delete('pdf-sources', id);
    }

    async add(source: PDFSource, id?: string): Promise<string> {
        const _id = await this.db.add('pdf-sources', source, id) as string;
        this._cacheInsert(id ?? _id, source);
        return id ?? _id;
    }

    async getOrPatch(songId: number, key: string): Promise<PDFSource | undefined> {
        const cached = await this.get(`${songId}_${key}`);
        if (cached !== undefined) {
            return cached;
        }

        // patch original pdf
        const original = await this.get(`${songId}_orig`);
        if (original === undefined) {
            return undefined;
        }

        const patched = {
            pdf: overwriteChords(original.pdf, key)
        };
        this.add(patched, `${songId}_${key}`);

        return patched;
    }

    async get(id: string): Promise<PDFSource | undefined> {
        const cached = this._cache.get(id);
        if (cached !== undefined) {
            this._lastAccess.set(id, Date.now());
            return cached;
        }

        // insert into cache
        const source = await this.db.get('pdf-sources', id);
        if (source !== undefined) {
            this._cacheInsert(id, source);
        }

        return source;
    }
}

export const pdfSourcePool = new PDFSourcePool(db);
export const songPool = new SongPool(db);
export const setlistPool = new SetlistPool(db);