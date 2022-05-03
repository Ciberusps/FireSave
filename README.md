# FireSave

Saves manager

![cover](https://user-images.githubusercontent.com/14001879/167883425-0023a3de-a32d-41c7-aa60-551f16883073.jpg)

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
  - [ ] name editing
  - [ ] tags
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

## Troubleshooting

If u found game that doesn't work or malfunction u can open new [issue](https://github.com/Ciberusps/FireSave/issues)

if you see stuff like this just `npm i` again

```
App threw an error during load
Error: The module '\\?\F:\FireSave\release\app\node_modules\greenworks\lib\greenworks-win64.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 99. This version of Node.js requires
NODE_MODULE_VERSION 103. Please try re-compiling or re-installing
```

## Support

You can boost up my motivation/development speed via DonationAlerts - https://www.donationalerts.com/r/ciberusps

## Setup

- copy `.env.example` rename to `.env` and fill
- optionaly make things from "How to update SteamworksSDK" section not required for start
- `npm i`
- now you should be ready

## How to update SteamworksSDK

- download steamworks sdk from https://partner.steamgames.com/downloads/list
- extract content from "sdk" folder to "/steamworks_sdk" folder
- fill `STEAMWORKS_SDK_ARCHIVE_PASSWORD` in `.env`
- `npm run steamworks-sdk:zip`
- upload `steamworks-sdk:zip` to google drive, make it available to "anyone with the link"(not possible to place zip in git somehow zip brokes after being pushed to any remote same for gitlab and github)
- fill `STEAMWORKS_SDK_GOOGLE_DRIVE_LINK` in `.env` via instructions in `.env.example`
- `npm run steamworks-sdk:unzip` will automatically runned on depenecies install via `npm i`

### Build

- make some changes
- bump version `npm run bump:version 0.3.6-beta`
- commit & push changes `git push`
- tag it `git tag v0.3.6 && git push --tags`
- wait for github action release
- got to github/releases page and release new version

## Steamworks(greenworks)

- Place steamworks `sdk` from https://partner.steamgames.com/downloads/list to `node_modules/greenworks/deps/steamworks_sdk`
  `npm install –global –production windows-build-tools`

## Based

Based on [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) - last commit [#cfd04f5](https://github.com/electron-react-boilerplate/electron-react-boilerplate/commit/cfd04f5375ea5b43ec1c735c078eaaa4fe8cc074)
