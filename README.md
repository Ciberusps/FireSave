# FireSave

[![Crowdin](https://badges.crowdin.net/firesave/localized.svg)](https://crowdin.com/project/firesave)

!WARNING! in active development breaking changes might be in every version

FireSave is a saves management app that helps you to make saves, name them, tag, sort, filter, and load of course. All saves are synced between devices with the steam cloud(only steam version). Add cloud saves in games that don't support steam cloud saves, like Dark Souls 3

![github_header_banner](https://user-images.githubusercontent.com/14001879/177992026-c1f2ff5d-7fa9-423d-99c8-edf64c35b9f1.png)

## Motivation

Many games have imperfect or simplified saves system - single save slot, save slots overwriting, no manual saves, terrible autosaves system and so on. FireSave is attempt to fix such problems in as much games as possible and provide a convenient way to manage your saves.

## Features

- AutoSaves
- Quick saves(F5)
- Screenshots

## Current limitations

- Game info fetching(name, image...) works only for steam games
- Quick save shortcut dont work for games in a fullscreen mode(only window/borderless window)
- Impossible to change saves folder location

## How it works

FireSave copy paste save file to "store folder"(default "C://GamesSaves") and save some data about it in `config.json` file.
Possibility of its application strongly depends on how in-game save system works.

## Supported games

Any game that use saves files like Elden Ring, Dark Souls 1-3, Hollow Knight...

## Plans

Short-term:

- [x] More games support(Hollow Knight?)
- [ ] QOL features for saves
  - [x] name editing
  - [x] tags
  - [ ] sorts & filters
  - [ ] search

Mid-term:

- [x] Auto detect installed games
- [ ] Steam beta release
- [ ] Steam Cloud ~~Cloud sync Google Drive/Dropbox/Yandex Drive/whatever...~~
- [ ] Localization

Long-term:

- [ ] Saves library - opportunity to share saves with other users
- [ ] In-game overlay
- [ ] Steam deck support
  - [ ] UI/UX adapt

TODO:

- [ ] MacOS/Linux support(for strange ppl (¬‿¬))
- [ ] Import old saves
- [ ] Saves folder change

## How to Contribute

Check out [contribute guide][contribute]

[contribute]: https://github.com/Ciberusps/FireSave/blob/main/CONTRIBUTING.md

## Support

You can boost up my motivation/development speed via [DonationAlerts](https://www.donationalerts.com/r/ciberusps)
