# FireSave

## Setup

- copy `.env.example` rename to `.env` and fill
- optionally setup up [steam for development](#How-to-setup-Steam-for-development)
- `npm i --legacy-peer-deps`
- now you should be ready

### How to setup Steam for development

- check "How to update SteamworksSDK" section and create your `steamworks_sdk`
- clone `node-steamworks` and `npm link` it, following instruction below
  - `npm install –global –production windows-build-tools`
  - go to your projects folder
  - git clone `git@github.com:Ciberusps/node-steamworks.git`
  - `cd node-steamworks`
  - unpack steamworks-sdk to `node-steamworks/deps/steamworks_sdk`
  - `npm install`
  - `npm link`
  - go to FireSave folder
  - `npm link "greenworks"` - it will link `node-steamworks`

### How to update SteamworksSDK

- download [steamworks sdk](https://partner.steamgames.com/downloads/list)
- extract content from "sdk" folder to `/steamworks_sdk` folder
- fill `STEAMWORKS_SDK_ARCHIVE_PASSWORD` in `.env`
- run 7zip and create archive with password from `steamworks_sdk` folder
- upload `steamworks-sdk.zip` to google drive, make it available to "anyone with the link"(not possible to place zip in git somehow zip brokes after being pushed to any remote same for gitlab and github)
- fill `STEAMWORKS_SDK_GOOGLE_DRIVE_LINK` in `.env` via instructions in `.env.example`

### Build

- make some changes
- bump version `npm run bump:version 0.3.6`
- commit & push changes `git push`
- tag it `git tag v0.3.6 && git push --tags`
- wait for github action release
- got to github/releases page and release new version

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
