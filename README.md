# FireSave

[![Crowdin](https://badges.crowdin.net/firesave/localized.svg)](https://crowdin.com/project/firesave)

**FireSave** is a **saves management** app that helps you **to make saves**, name them, tag, sort, filter, **and load of course**.

UPD: steam release wont be in near future, steam rejected to publish app "not fit categories" 😐

![github_header_banner](https://user-images.githubusercontent.com/14001879/177992026-c1f2ff5d-7fa9-423d-99c8-edf64c35b9f1.png)

## Features

- AutoSaves
- Quick saves(F5)
- Automatical screenshots
- Windows/MacOS/Linux/SteamOS support
- Steam games auto-detection
- [not sure] Steam deck should works

## For whom

### For gamers

- beat the boss with another build without playing the whole game from the beginning
- make another choice and see what will happen. You can return at any time or even continue all storylines concurrently without saves from one line being overwritten

### For game developers and QA

Create saves for different test cases. Forget saves copy-pasting, creating monster scripts for save states emulation/recreation, or wasting your time on unnecessary tooling. Just make saves and load it to test the behavior you expected. You can add your game in FireSave even if it's not yet on Steam.

### For content creators - streamers/video bloggers

Speed up your video production - recording gameplay footage becomes much easier with FireSave

- return to any point of your walkthrough and record required moments as you want without playing the whole game from the beginning
- no more wasting hours on rewriting broken footage
- free up time for more important things such as analysis and reflection of the gaming experience gained
- make game content on youtube or twitch

### For speedrunners

Create saves for segments you want to train and switch between them fast.

### For retro-gamers and old games

- play old games and don't suffer from making manual backups
- add cloud saves in games like Dark Souls 3, Mafia, Dead Space, Fable, Gothic, Mass Effect, Overlord, Prince of Persia, Tomb Raider, and thousands of others

### For Steam Deck users [coming soon]

Want to continue playing your games without cloud saves on the Steam Deck - easily make a save on the desktop and then load it on the Steam Deck

## Current limitations

- Game info fetching(name, image...) works only for steam games
- Quick save shortcut dont work for games in a fullscreen mode(only window/borderless window)
- Impossible to change saves folder location

## FAQ

- [How it works](./docs/how_it_works.md)
- [How to add "custom" game](./docs/how_to_add_custom_game.md)
- [Can I use FireSave in games with online](./docs/games_with_online.md)

## Supported games

Any game that use save files like Elden Ring, Dark Souls 1-3, Hollow Knight...

## Plans

- [x] More games support(Hollow Knight?)
- [ ] Saves folder change(was only in steam version)
- [ ] Cloud sync Google Drive ~~Steam Cloud~~
- [ ] QOL features for saves
  - [x] name editing
  - [x] tags
  - [ ] sorts & filters
  - [ ] search
- [ ] Localization
- [x] Steam deck support
- [ ] Steam deck UI/UX adapt
- [ ] Import saves
- [ ] Saves library - opportunity to share saves with other users
- [ ] In-game overlay

## Localization

If you want to contribute

Translations -
![de translation](https://img.shields.io/badge/dynamic/json?color=blue&label=de&style=flat&query=%24.progress.0.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![es-ES translation](https://img.shields.io/badge/dynamic/json?color=blue&label=es-ES&style=flat&query=%24.progress.1.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![fr translation](https://img.shields.io/badge/dynamic/json?color=blue&label=fr&style=flat&query=%24.progress.2.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![it translation](https://img.shields.io/badge/dynamic/json?color=blue&label=it&style=flat&query=%24.progress.3.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![ja translation](https://img.shields.io/badge/dynamic/json?color=blue&label=ja&style=flat&query=%24.progress.4.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![ko translation](https://img.shields.io/badge/dynamic/json?color=blue&label=ko&style=flat&query=%24.progress.5.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![pl translation](https://img.shields.io/badge/dynamic/json?color=blue&label=pl&style=flat&query=%24.progress.6.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![pt-BR translation](https://img.shields.io/badge/dynamic/json?color=blue&label=pt-BR&style=flat&query=%24.progress.7.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![ru translation](https://img.shields.io/badge/dynamic/json?color=blue&label=ru&style=flat&query=%24.progress.8.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![uk translation](https://img.shields.io/badge/dynamic/json?color=blue&label=uk&style=flat&query=%24.progress.9.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![zh-CN translation](https://img.shields.io/badge/dynamic/json?color=blue&label=zh-CN&style=flat&query=%24.progress.10.data.translationProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)

Proofreading -
![de proofreading](https://img.shields.io/badge/dynamic/json?color=green&label=de&style=flat&query=%24.progress.0.data.approvalProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![es-ES proofreading](https://img.shields.io/badge/dynamic/json?color=green&label=es-ES&style=flat&query=%24.progress.1.data.approvalProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![fr proofreading](https://img.shields.io/badge/dynamic/json?color=green&label=fr&style=flat&query=%24.progress.2.data.approvalProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![it proofreading](https://img.shields.io/badge/dynamic/json?color=green&label=it&style=flat&query=%24.progress.3.data.approvalProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![ja proofreading](https://img.shields.io/badge/dynamic/json?color=green&label=ja&style=flat&query=%24.progress.4.data.approvalProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![ko proofreading](https://img.shields.io/badge/dynamic/json?color=green&label=ko&style=flat&query=%24.progress.5.data.approvalProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![pl proofreading](https://img.shields.io/badge/dynamic/json?color=green&label=pl&style=flat&query=%24.progress.6.data.approvalProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![pt-BR proofreading](https://img.shields.io/badge/dynamic/json?color=green&label=pt-BR&style=flat&query=%24.progress.7.data.approvalProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![ru proofreading](https://img.shields.io/badge/dynamic/json?color=green&label=ru&style=flat&query=%24.progress.8.data.approvalProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![uk proofreading](https://img.shields.io/badge/dynamic/json?color=green&label=uk&style=flat&query=%24.progress.9.data.approvalProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)
![zh-CN proofreading](https://img.shields.io/badge/dynamic/json?color=green&label=zh-CN&style=flat&query=%24.progress.10.data.approvalProgress&url=https%3A%2F%2Fbadges.awesome-crowdin.com%2Fstats-15265004-526302.json)

## Motivation

Many games have imperfect or simplified saves system - single save slot, save slots overwriting, no manual saves, terrible autosaves system and so on. FireSave is attempt to fix such problems in as much games as possible and provide a convenient way to manage your saves.

## How to Contribute

Check out [contribute guide][contribute]

[contribute]: https://github.com/Ciberusps/FireSave/blob/main/CONTRIBUTING.md

## About

If you have problem contact me via [issues](https://github.com/Ciberusps/FireSave/issues), [telegram](https://t.me/Ciberus) or [email](mailto:ciberus.ps+github@gmail.com)

## Support

You can support me on patreon https://www.patreon.com/ciberus/membership
