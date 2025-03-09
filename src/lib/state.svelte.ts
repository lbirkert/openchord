import type { Setlist } from "./types.js";

class OpenSongState {
    // current import files
    importFiles: Uint8Array[] = $state([]);
    // current import preview
    importPreview: string | undefined = $state();

    // current setlist
    setlist: Setlist | undefined = $state();
}

export const openSongState = new OpenSongState();