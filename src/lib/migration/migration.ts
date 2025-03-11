import { maybeMigrate01RenameDatabase } from "./01_rename_database.js";

export const MIGRAITON_NO_NEED = 0;
export const MIGRAITON_SUCCESSFUL = 1;
export const MIGRAITON_FAILED = 2;

export const migrations = [
    maybeMigrate01RenameDatabase
];

export async function migrate() {
    for(const maybeMigrate of migrations) {
        const status = await maybeMigrate();
        switch(status) {
            case MIGRAITON_NO_NEED:
                console.log('[MIGRATION]', maybeMigrate, 'finished with MIGRATION_NO_NEED');
                break;
            case MIGRAITON_SUCCESSFUL:
                console.log('[MIGRATION]', maybeMigrate, 'finished with MIGRATION_SUCCESSFUL');
                break;
            case MIGRAITON_FAILED:
                console.log('[MIGRATION]', maybeMigrate, 'finished with MIGRATION_FAILED');
                break;
            default:
                console.log('[MIGRATION]', maybeMigrate, 'finished with unknown status code', status);
        }
    }
}