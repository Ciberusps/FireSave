const gamesCharactersNames = [
  [
    // Just funny
    "Boss Name",

    // Earthworm Jim
    "Earthworm Jim",

    // GTA
    "Niko Bellic",
    "Carl Johnson",
    "Trevor Philips",
    "Tommy Vercetti",

    // Assassin's Creed https://en.wikipedia.org/wiki/Category:Assassin%27s_Creed_characters
    "Alexios and Kassandra",
    "Altaïr Ibn-LaʼAhad",
    "Arno Dorian",
    "Aveline de Grandpré",
    "Bayek of Siwa",
    "Desmond Miles",
    "Edward Kenway",
    "Ezio Auditore da Firenze",
    "Frye twins",
    "Haytham Kenway",

    // Max Payne
    "Max Payne",

    // Naruto
    "Itachi Uchiha",
    "Naruto Uzumaki",
    "Sasuke Uchiha",
    "Kakashi Hatake",
    "Shikamaru Nara",
    "Konohamaru Sarutobi",
    "Minato Namizake",
    "Jiraiya",
    "Gaara",
    "Madara Uchiha",
    "Obito Uchiha",
    "Hashirama Senju",
    "Neji Hyuga",
    "Ino Yaminaka",
    "Sakura Haruno",

    // Red Dead Redemption 2 https://www.ign.com/wikis/red-dead-redemption-2/Characters
    "Arthur Morgan",
    "Dutch van der Linde",
    "Bill Williamson",
    "Javier Escuella",
    "John Marston",
    "Charles Smith",
    "Micah Bell",
    "Sadie Adler",
    "Hosea Matthews",
    "Abigail Roberts- wife of John Marston and mother to Jack",
    "Uncle",
    "Josiah Trelawny",
    "Lenny Summers",
    "Sean Macguire",
    "Mary-Beth Gaskill",
    "Karen Jones",
    "Tilly Jackson",
    "Leopold Strauss",
    "Reverend Swanson",
    "Susan Grimshaw",
    "Molly O'Shea",
    "Pearson",
    "Jack Marston",

    // Activision https://en.wikipedia.org/wiki/Category:Activision_characters
    "Alex Mason",
    "Captain Price",
    "Spyro",
  ],

  // Resident Evil
  [
    "Ada Wong",
    "Albert Wesker",
    "Alcina Dimitrescu",
    "Alice",
    "Chris Redfield",
    "Claire Redfield",
    "Leon S. Kennedy",
    "Jill Valentine",
    "Hanzo",
  ],

  // Metal Gear characters
  [
    "Big Boss",
    "EVA",
    "Gray Fox",
    "Quiet",
    "Raiden",
    "Revolver Ocelot",
    "Solid Snake",
    "Venom Snake",
  ],

  // top 50 https://www.gamedesigning.org/gaming/characters/
  [
    "Commander Shepard",
    "Ezio Auditore De Firenze",
    "Earthworm Jim",
    "Pit of Kid Icarus",
    "Fargoth",
    "McCree",
    "Jonathan Irons",
    "Handsome Jack",
    "Rayman",
    "Diddy Kong",
    "Urdnot Wrex",
    "Ryu Hayabusa",
    "Spyro",
    "Nathan Drake",
    "Deckard Cain",
    "Gordon Freeman",
    "GLaDOS",
    "Samus Aran",
    "Princess Zelda",
    "Agent 47",
    "Sam Fisher",
    "Jack of Blades",
    "Sonic the Hedgehog",
    "Donkey Kong",
    "Banjo",
    "Pikachu",
    "Bonnie MacFarlane",
    "Rayne",
    "Cortana",
    "Sarah Kerrigan",
    "Bowser",
    "Marcus Fenix",
    "Megaman",
    "Max Payne",
    "Subzero",
    "Kratos",
    "Kitana",
    "Scorpion",
    "Ganondorf",
    "Pacman",
    "Duke Nukem",
    "Cloud Strife",
    "Geralt of Rivia",
    "Lara Croft",
    "Princess Peach Toadstool",
    "Solid Snake",
    "Mario",
    "Link",
    "John Marston",
    "Master Chief",
  ],

  // top 50 https://www.empireonline.com/movies/features/50-greatest-video-game-characters/
  [
    "Ryu Hayabusa",
    "Dirk The Daring",
    "Donkey Kong",
    "The Horned Reaper",
    "Vault Boy",
    "Marcus Fenix",
    "Leon Kennedy",
    "HK-47",
    "Sam & Max",
    "Pyramid Head",
    "Dr Fred Eddison",
    "Mr",
    "Dante",
    "Pac Man",
    "Big Daddy",
    "Prince of Persia",
    "Alucard",
    "The Announcer",
    "Miner Willy",
    "Kane",
    "Manny Cavalera",
    "Garrett",
    "Harman Smith",
    "Ryu",
    "Samus Aran",
    "Arthas Menethil",
    "Sabre Man",
    "Bowser",
    "Nathan Drake",
    "Agent 47",
    "Duke Nukem",
    "Solid Snake",
    "American McGee's Alice",
    "Illidan Stormrage",
    "Brucie",
    "Kratos",
    "Sonic",
    "Cloud Strife",
    "GLaDOS",
    "Minsc & Boo",
    "Sephiroth",
    "The Lemmings",
    "Master Chief",
    "Guybrush Threepwood",
    "Link",
    "Lara Croft",
    "The Nameless One",
    "Shodan",
    "Mario",
    "Gordon Freeman",
  ],

  // DS3 bosses - wiki
  [
    "Iudex Gundyr",
    "Vordt of the Boreal Valley",
    "Curse-Rotted Greatwood",
    "Crystal Sage",
    "Abyss Watchers",
    "Deacons of the Deep",
    "High Lord Wolnir",
    "Old Demon King",
    "Pontiff Sulyvahn",
    "Yhorm the Giant",
    "Aldrich",
    "Dancer of the Boreal Valley",
    "Dragonslayer Armour",
    "Oceiros, the Consumed King",
    "Champion Gundyr",
    "Lothric, Younger Prince",
    "Ancient Wyvern",
    "Nameless King",
    "Soul of Cinder",
    "Sister Friede",
    "Champion's Gravetender & Gravetender Greatwolf",
    "Demon Prince",
    "Halflight, Spear of the Church",
    "Darkeater Midir",
    "Slave Knight Gael",
  ],

  // DS1 bosses - wiki
  [
    "Asylum Demon",
    "Taurus Demon",
    "Bell Gargoyles",
    "Moonlight Butterfly",
    "Capra Demon",
    "Gaping Dragon",
    "Stray Demon",
    "Chaos Witch Quelaag",
    "Great Grey Wolf Sif",
    "Iron Golem",
    "Crossbreed Priscilla",
    "Ornstein and Smough",
    "Dark Sun Gwyndolin",
    "Pinwheel",
    "Gravelord Nito",
    "Seath the Scaleless",
    "The Four Kings",
    "Ceaseless Discharge",
    "Centipede Demon",
    "Firesage Demon",
    "Bed of Chaos",
    "Gwyn, Lord of Cinder",
    "Sanctuary Guardian",
    "Artorias the Abysswalker",
    "Black Dragon Kalameet",
    "Manus, Father of the Abyss",
  ],

  [
    // Dota 2
    "Abaddon",
    "Alchemist",
    "Ancient Apparition",
    "Anti-Mage",
    "Arc Warden",
    "Axe",
    "Bane",
    "Batrider",
    "Beastmaster",
    "Bloodseeker",
    "Bounty Hunter",
    "Brewmaster",
    "Bristleback",
    "Broodmother",
    "Centaur Warrunner",
    "Chaos Knight",
    "Chen",
    "Clinkz",
    "Clockwerk",
    "Crystal Maiden",
    "Dark Seer",
    "Dark Willow",
    "Dawnbreaker",
    "Dazzle",
    "Death Prophet",
    "Disruptor",
    "Doom",
    "Dragon Knight",
    "Drow Ranger",
    "Earth Spirit",
    "Earthshaker",
    "Elder Titan",
    "Ember Spirit",
    "Enchantress",
    "Enigma",
    "Faceless Void",
    "Grimstroke",
    "Gyrocopter",
    "Hoodwink",
    "Huskar",
    "Invoker",
    "Io",
    "Jakiro",
    "Juggernaut",
    "Keeper of the Light",
    "Kunkka",
    "Legion Commander",
    "Leshrac",
    "Lich",
    "Lifestealer",
    "Lina",
    "Lion",
    "Lone Druid",
    "Luna",
    "Lycan",
    "Magnus",
    "Marci",
    "Mars",
    "Medusa",
    "Meepo",
    "Mirana",
    "Monkey King",
    "Morphling",
    "Naga Siren",
    "Nature's Prophet",
    "Necrophos",
    "Night Stalker",
    "Nyx Assassin",
    "Ogre Magi",
    "Omniknight",
    "Oracle",
    "Outworld Destroyer",
    "Pangolier",
    "Phantom Assassin",
    "Phantom Lancer",
    "Phoenix",
    "Primal Beast",
    "Puck",
    "Pudge",
    "Pugna",
    "Queen of Pain",
    "Razor",
    "Riki",
    "Rubick",
    "Sand King",
    "Shadow Demon",
    "Shadow Fiend",
    "Shadow Shaman",
    "Silencer",
    "Skywrath Mage",
    "Slardar",
    "Slark",
    "Snapfire",
    "Sniper",
    "Spectre",
    "Spirit Breaker",
    "Storm Spirit",
    "Sven",
    "Techies",
    "Templar Assassin",
    "Terrorblade",
    "Tidehunter",
    "Timbersaw",
    "Tinker",
    "Tiny",
    "Treant Protector",
    "Troll Warlord",
    "Tusk",
    "Underlord",
    "Undying",
    "Ursa",
    "Vengeful Spirit",
    "Venomancer",
    "Viper",
    "Visage",
    "Void Spirit",
    "Warlock",
    "Weaver",
    "Windranger",
    "Winter Wyvern",
    "Witch Doctor",
    "Wraith King",
    "Zeus",

    // Dota AllStars Heroes https://gaming-tools.com/warcraft-3/dota-heroes/
    "Abaddon",
    "Alchemist",
    "Ancient Apparition",
    "Anti Mage",
    "Arc Warden",
    "Axe",
    "Bane",
    "Batrider",
    "Beastmaster",
    "Bloodseeker",
    "Bone",
    "Bounty Hunter",
    "Bristleback",
    "Broodmother",
    "Centaur Warchief",
    "Chaos Knight",
    "Chen",
    "Clock",
    "Crystal Maiden",
    "Darkseer",
    "Dazzle",
    "Death Prophet",
    "Doom",
    "Dragon Knight",
    "Drow Ranger",
    "Earthshaker",
    "Ember",
    "Enchantress",
    "Enigma",
    "Ezalor",
    "Faceless Void",
    "Furion",
    "Geomancer",
    "Goblin Shredder",
    "Gyrocopter",
    "Huskar",
    "Invoker",
    "Jakiro",
    "Kunkka",
    "Legion Commander",
    "Leshrac",
    "Lich",
    "Lifestealer",
    "Lina",
    "Lion",
    "Lone Druid",
    "Luna",
    "Lycan",
    "Magnus",
    "Medusa",
    "Mirana",
    "Morphling",
    "Naga Siren",
    "Necro",
    "Nerubian Assassin",
    "Night Stalker",
    "Obsidian Destroyer",
    "Ogre Magi",
    "Omni Knight",
    "Pandaren Brewmaster",
    "Phantom Assassin",
    "Phantom Lancer",
    "Phoenix",
    "Pitlord",
    "Puck",
    "Pudge",
    "Pugna",
    "Queen of Pain",
    "Razor",
    "Rhasta",
    "Riki",
    "Rubick",
    "Sandking",
    "Shadow Demon",
    "Shadow Fiend",
    "Silencer",
    "Skeleton King",
    "Skywrath Mage",
    "Slardar",
    "Slark",
    "Sniper",
    "Spectre",
    "Bara",
    "Storm Spirit",
    "Sven",
    "Tauren Chieftaint",
    "Techies",
    "Templar Assassin",
    "Terrorblade",
    "Thrall",
    "Tidehunter",
    "Tinker",
    "Tiny",
    "Treant Protector",
    "Troll Warlord",
    "Tuskarr",
    "Undying",
    "Ursa Warrior",
    "Vengeful Spirit",
    "Venomancer",
    "Viper",
    "Visage",
    "Warlock",
    "Weaver",
    "Windrunner",
    "Winter Wyvern",
    "Wisp",
    "Witch Doctor",
    "Yurnero",
    "Zeus",

    // Dota AllStars Items https://gaming-tools.com/warcraft-3/dota-items/
    "Dagon 5",
    "Dagon 4",
    "Divine Rapier",
    "Satanic",
    "Butterfly",
    "Eye of Skadi",
    "Buriza-do Kyanon",
    "Hex/Guinsoo’s Scythe of Vyse",
    "Assault Cuirass",
    "Heart of Tarrasque",
    "Mjollnir",
    "Dagon 3",
    "Monkey King Bar",
    "Refresher Orb",
    "Necronomicon 3",
    "Linkens Sphere",
    "Radiance",
    "Bloodstone",
    "Orchid Malevolence",
    "Manta Style",
    "Ethereal Blade",
    "Shivas Guard",
    "Sange and Yasha",
    "Stygian Desolator",
    "Battle Fury",
    "Black King Bar",
    "Sacred Relic",
    "Hyperstone",
    "Void Stone",
    "Mystic Staff",
    "Energy Booster",
    "Point Booster",
    "Vitality Booster",
    "Orb of Venom",
    "Vanguard",
    "Blade Mail",
    "Soul Booster",
    "Hood of Defiance",
    "Eul’s Scepter of Divinity",
    "Force Staff",
    "Dagon 1",
    "Dagon 2",
    "Necronomicon 1",
    "Necronomicon 2",
    "Aghanim’s Scepter",
    "Mekansm",
    "Vladmir’s Offering",
    "Arcane Boots",
    "Khadgard’s Pipe of Insight",
    "Lothar’s Edge",
    "Diffusal Blade",
    "Eaglehorn",
    "Messerschmidt’s Reaver",
    "Cranium Basher",
    "Maelstrom",
    "Boots of Travel",
    "Armlet of Mordiggian",
    "Demon Edge",
    "Crystalys",
    "Sange",
    "Yasha",
    "Kelen’s Dagger",
    "Ultimate Orb",
    "Mask of Madness",
    "Hand of Midas",
    "Helm of the Dominator",
    "Talisman of Evasion",
    "Perseverance",
    "Oblivion Staff",
    "Ghost Scepter",
    "Mithril Hammer",
    "Javelin",
    "Power Treads",
    "Plate Mail",
    "Phase Boots",
    "Claymore",
    "Broadsword",
    "Ogre Axe",
    "Blade of Alacrity",
    "Staff of Wizardry",
    "Cheese",
    "Helm of Iron Will",
    "Mask of Death",
    "Quarterstaff",
    "Ring of Health",
    "Urn of Shadows",
    "Natherezim Buckler",
    "Soul Ring",
    "Gem of True Sight",
    "Headdress of Rejuvenation",
    "Bottle",
    "Chainmail",
    "Poor Man’s Shield",
    "Bracer",
    "Magic Wand",
    "Null Talisman",
    "Ring of Basilius",
    "Gloves of Haste",
    "Boots of Speed",
    "Planeswalker’s Cloak",
    "Wraith Band",
    "Boots of Elvenskin",
    "Robe of the Magi",
    "Belt of Giant Strength",
    "Blades of Attack",
    "Flying Courier",
    "Ring of Regeneration",
    "Sobi Mask",
    "Stout Shield",
    "Quelling Blade",
    "Magic Stick",
    "Observer Wards",
    "Sentry Wards",
    "Circlet of Nobility",
    "Dust of Appearance",
    "Ring of Protection",
    "Animal Courier",
    "Gauntlets of Ogre Strength",
    "Slippers of Agility",
    "Mantle of Intelligence",
    "Scroll of Town Portal",
    "Healing Salve",
    "Ancient Tango of Essifation",
    "Ironwood Branch",
    "Clarity Potion",
    "Aegis of the Immortal",
  ],

  // Overwatch https://playoverwatch.com/en-gb/heroes/
  [
    "Ana",
    "Ashe",
    "Baptiste",
    "Bastion",
    "Brigitte",
    "Cassidy",
    "D.Va",
    "Doomfist",
    "Echo",
    "Genji",
    "Hanzo",
    "Junkrat",
    "Lúcio",
    "Mei",
    "Mercy",
    "Moira",
    "Orisa",
    "Pharah",
    "Reaper",
    "Reinhardt",
    "Roadhog",
    "Sigma",
    "Soldier: 76",
    "Sombra",
    "Symmetra",
    "Torbjörn",
    "Tracer",
    "Widowmaker",
    "Winston",
    "Wrecking Ball",
    "Zarya",
    "Zenyatta",
  ],

  // Warcraft 3 Characters https://www.pastemagazine.com/games/world-of-warcraft/10-best-world-of-warcraft-characters
  [
    "Sargeras",
    "Jaina Proudmoore",
    "C’Thun",
    "Maiev Shadowsong",
    "Kael’thas Sunstrider",
    "Lord Serpentis",
    "Illidan Stormrage",
    "Mankrik",
    "Chen Stormstout",
    "Vol’jin",
  ],
];

export const getRandomCharacterName = () => {
  const randomGameIdx = Math.floor(Math.random() * gamesCharactersNames.length);
  const gameCharacterNames = gamesCharactersNames[randomGameIdx];

  const randomIndex = Math.floor(Math.random() * gameCharacterNames.length);
  return gameCharacterNames[randomIndex];
};
