<h1>
<img src="/brand/banner-dark.svg#gh-dark-mode-only" alt="OpenChord" width="400px"/>
<img src="/brand/banner-light.svg#gh-light-mode-only" alt="OpenChord" width="400px"/>
</h1>

OpenChord (acronym: OPENCHRD) is an opensource PWA (progressive web app),
which allows importing PDF song sheets and has a builtin patcher for transposing.
It is supposed to be a church-specific, lightweight, free and cross platform application.

----

## Usage

> TL:DR; use the [web app](https://lbirkert.com/openchord) or download a native binary from
[releases](https://github.com/lbirkert/openchord/releases)

OpenChord is a progressive web app and therefore works in the browser by default.
A public instance is hosted on [my website](https://lbirkert.com/openchord).
Please note though that, since OpenChord is entirely local, if you happen to
clear your browser data (IndexedDB), the data of OpenChord will be gone as well.

An alternative is to use an application bundle, which you can download from the
[releases tab](https://github.com/lbirkert/openchord/releases).
The app itself is bundled using [Tauri](https://tauri.app) a tool for creating
"small, fast, secure, cross-platform applications".

## Developing

Make sure to [install bun](https://bun.sh/) first!

1. Install dependencies: `bun install`
2. Run the dev server: `bun run dev`
3. (optional) Expose to test in LAN: `bun run dev --host`

----

This software is licensed under [the MIT License](LICENSE).

&copy; 2025 - Lucas Birkert - All rights reserved
