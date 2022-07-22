# FireSave

[![Crowdin](https://badges.crowdin.net/firesave/localized.svg)](https://crowdin.com/project/firesave)

**FireSave** is a **saves management** app that helps you **to make saves**, name them, tag, sort, filter, **and load of course**.

UPD: steam release wont be in near future, steam rejected to publish app "not-fit categories" 😐

![github_header_banner](https://user-images.githubusercontent.com/14001879/177992026-c1f2ff5d-7fa9-423d-99c8-edf64c35b9f1.png)

## Motivation

Many games have imperfect or simplified saves system - single save slot, save slots overwriting, no manual saves, terrible autosaves system and so on. FireSave is attempt to fix such problems in as much games as possible and provide a convenient way to manage your saves.

## Features

- AutoSaves
- Quick saves(F5)
- Screenshots
- Windows/MacOS/Linux/SteamOS supported
- Steam games auto-detection
- [not sure] Steam deck should works

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
- [ ] Steam beta release - steam rejected app "not-fit categories" 😐
- [ ] Steam Cloud ~~Cloud sync Google Drive/Dropbox/Yandex Drive/whatever...~~
- [ ] Localization

Long-term:

- [ ] Saves library - opportunity to share saves with other users
- [ ] In-game overlay
- [x] Steam deck support, should run on SteamOS, but UI not adapted
- [ ] Steam deck UI/UX adapt

Backlog:

- [x] MacOS/Linux support(for strange ppl (¬‿¬))
- [ ] Import old saves
- [ ] Saves folder change(was only in steam version)

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

## How to Contribute

Check out [contribute guide][contribute]

[contribute]: https://github.com/Ciberusps/FireSave/blob/main/CONTRIBUTING.md

## About

If you have problem contact me via [issues](https://github.com/Ciberusps/FireSave/issues), [telegram](https://t.me/Ciberus) or [email](mailto:ciberus.ps+github@gmail.com)

## Support

You can support me on patreon https://www.patreon.com/ciberus/membership
