# FireSave

Saves manager

<img src="https://cdn.ciberus.gg/final_5.png" width="900">

## Motivation

Many games have imperfect or simplified saves system - single save slot, save slots overwriting, no manual saves, terrible autosaves system and so on. FireSave is attempt to fix such problems in as much games as possible and provide a convenient way to manage your saves.

## Features

- AutoSaves
- Quick saves(F5)
- Screenshots
- Auto update(on start)

## Current limitations

- Support games with only one save file
- Game info fetching(name, image...) works only for steam games
- Quick save shortcut dont work for games in a fullscreen mode(only borderless window/window)
- Impossible to change saves folder location, will change ASAP

## How it works

FireSave copy paste save file to "store folder"(default "C://GamesSaves") and save some data about it in `config.json` file.
Possibility of its application strongly depends on how in-game save system works.

## Supported games(100% works)

- DARK SOULS™: REMASTERED
- DARK SOULS™ II: Scholar of the First Sin
- DARK SOULS™ III

## Plans

Short-term:

- QOL features for saves
  - name editing
  - tags
  - sorts & filters
  - search
- More games support(Hollow Knight?)
- Saves folder change

Mid-term:

- Localization
- Auto detect installed games
- Import old saves
- MacOS/Linux support(for strange ppl (¬‿¬))

Long-term:

- Saves library - opportunity to share saves with other users
- Cloud sync Google Drive/Dropbox/Yandex Drive/whatever...

## Troubleshooting

If u found game that doesn't work or malfunction u can open new [issue](https://github.com/Ciberusps/FireSave/issues)

## Support

You can boost up my motivation/development speed via DonationAlerts - https://www.donationalerts.com/r/ciberusps

## Based

Based on Electron React Boilerplate - https://github.com/electron-react-boilerplate/electron-react-boilerplate
