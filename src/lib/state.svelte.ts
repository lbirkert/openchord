import type { Setlist, Song } from "./types.js";

class OpenChordState {
    // current import files
    importFiles: ArrayBuffer[] = $state([]);
    // current import preview
    importPreview: string | undefined = $state();

    // opened setlist
    setlist: Setlist | undefined = $state();

    // opened song
    song: Song | undefined = $state();

    // whether library is opened
    library: boolean = $state(false);
}

export const openSongState = new OpenChordState();