import { db } from '$lib/db.js';
import { openDB, deleteDB, type IDBPDatabase, type DBSchema } from 'idb';
import { MIGRAITON_FAILED, MIGRAITON_NO_NEED, MIGRAITON_SUCCESSFUL } from './migration.js';

const OLD_DB = 'OpenSong2';

async function maybeOpenOld() {
    try {
        // Attempt to open the database with version 1 (we're not upgrading here, just checking)
        let upgrade = false;
        const db = await openDB(OLD_DB, 1, {
            upgrade: () => upgrade = true,
        });
        if(upgrade) {
            db.close();
            await deleteDB(OLD_DB);
            return undefined;
        }
        return db;
    } catch (error) {
        return undefined;
    }
};

// Step 4: Migrate data from OpenSong2 to OpenChord
async function migrateData(oldDb: IDBPDatabase, newDb: IDBPDatabase) {
    try {
        const stores = oldDb.objectStoreNames;
        for (let storeName of stores) {
            console.log(storeName);
            const all = await oldDb.getAll(storeName);
            await Promise.all(all.map((v) => newDb.put(storeName, v)));
        }
    } catch (error) {
        console.error('Error migrating data:', error);
        throw error;
    }
};

export async function maybeMigrate01RenameDatabase(): Promise<number> {
    try {
        const oldDb = await maybeOpenOld();
        if (oldDb === undefined) return MIGRAITON_NO_NEED;
        const newDb = await db.get();
        await migrateData(oldDb, newDb as IDBPDatabase);

        // Optionally, delete the old database after migration
        oldDb.close();
        await new Promise((resolve, reject) => {
            deleteDB(OLD_DB, { blocked: () => reject('cannot delete database!') })
                .then(resolve).catch(reject);
        });

        return MIGRAITON_SUCCESSFUL; // migration successful
    } catch (error) {
        console.error('Migration failed:', error);
        return MIGRAITON_FAILED;
    }
}
