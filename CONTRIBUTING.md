# FireSave

## Setup

- copy `.env.example` rename to `.env` and fill
- optionaly make things from "How to update SteamworksSDK" section not required for start
- `npm i`
- now you should be ready

## How to update SteamworksSDK

- download steamworks sdk from https://partner.steamgames.com/downloads/list
- extract content from "sdk" folder to `/steamworks_sdk` folder
- fill `STEAMWORKS_SDK_ARCHIVE_PASSWORD` in `.env`
- run 7zip and create archive with password from `steamworks_sdk` folder
- upload `steamworks-sdk:zip` to google drive, make it available to "anyone with the link"(not possible to place zip in git somehow zip brokes after being pushed to any remote same for gitlab and github)
- fill `STEAMWORKS_SDK_GOOGLE_DRIVE_LINK` in `.env` via instructions in `.env.example`
- `npm run steamworks-sdk:unzip` will automatically runned on depenecies install via `npm i`

## How to add "steam auth files" for release on steam via github action

- auth with `./steamworks_sdk/tools/ContentBuilder/builder/steamcmd +login ${steam_login} ${steam_password} +quit`
- fill `STEAMWORKS_SDK_ARCHIVE_PASSWORD` in `.env`
- copy
  - `./steamworks_sdk/tools/ContentBuilder/builder/config/config.vdf`
  - `./steamworks_sdk/tools/ContentBuilder/builder/ssfn<hashOfNumbers>` only "hidden" required - [how to show hidden files](https://support.microsoft.com/en-us/windows/view-hidden-files-and-folders-in-windows-97fbc472-c603-9d90-91d0-1166d1d9f4b5)
  - files to `./steam_auth_files` folder
- open `steam_auth_files` select all files and create .zip password protected archive using 7zip and password from `STEAMWORKS_SDK_ARCHIVE_PASSWORD`
- upload archive on google drive
- fill `STEAM_AUTH_FILES_GOOGLE_DRIVE_LINK` in `.env` via instructions in `.env.example`

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

## Based

Based on [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) - last commit [#cfd04f5](https://github.com/electron-react-boilerplate/electron-react-boilerplate/commit/cfd04f5375ea5b43ec1c735c078eaaa4fe8cc074)
