# Music Replacement Mod (OoT)

This mod allows some music in Ocarina of Time to be replaced with external audio files.

## Usage

Place the pak file in your `mods` folder and enable the mod in the launcher. On first launch it will create a `music` folder at `./ModLoader/music`.

Within that folder it will have `packs`, `bgm` and `fanfares`. 

### BGM and Fanfares can accept any file name and when the random option is selected in the mods section, it will randomly pick from the files in the folder.

Eg: `./ModLoader/music/bgm/my-random-song.ogg`
and
`./ModLoader/music/bgm/random_fanfare.ogg`

### Packs can be loaded in with specific songs tying to specific locations in game. (designated below)

You can have multiple packs by naming the folders as

`./ModLoader/music/packs/PACK_NAME/`

Simply add your OGG, FLAC or WAV files inside the pack folder and make sure they are named as follows:
`1A-loop.ogg`

- `1A` represents the music ID from the game you want to replace with this audio file. A list of music IDs from Ocarina of Time can be found at: https://wiki.cloudmodding.com/oot/Music_Sequences

- `loop` represents if the audio file should loop. Set it to `noloop` if you don't want the music to loop. Looping should be used for background music, while fanfares or ocarina songs should not be looping.

- `.ogg` is the file extension of your audio file and can be different. You shouldn't touch it at all when renaming your file.

### .OGG is recommended! .MP3 files are not supported!

# Here are a list of all the supported music IDs.

Filename | Track Name
------------ | -------------
02 | Hyrule Field
18 | Dodongo's Cavern
19 | Kakariko Village (Adult)
1A | Normal Battle
1B | Boss Battle
1C | Inside the Deku Tree
1D | Market
1E | Title Theme
1F | House
20 | Game Over
21 | Boss Clear
22 | Obtain Item
23 | Enter Ganondorf
24 | Obtain Heart Container
25 | Prelude of Light
26 | Inside Jabu-Jabu's Belly
27 | Kakariko Village (Child)
28 | Great Fairy's Fountain
29 | Zelda's Theme
2A | Fire Temple
2B | Open Treasure Chest
2C | Forest Temple
2D | Hyrule Castle Courtyard
2E | Ganondorf's Theme
2F | Lon Lon Ranch
30 | Goron City
32 | Obtain Spiritual Stone
33 | Bolero of Fire
34 | Minuet of Forest
35 | Serenade of Water
36 | Requiem of Spirit
37 | Nocturne of Shadow
38 | Mini-Boss Battle
39 | Obtain Small Item
3A | Temple of Time
3B | Escape from Lon Lon Ranch
3C | Kokiri Forest
3D | Obtain Fairy Ocarina
3E | Lost Woods
3F | Spirit Temple
40 | Horse Race
41 | Horse Race Goal
42 | Ingo's Theme
43 | Obtain Medallion
4A | Fairy Flying
4B | Deku Tree
4C | Windmill Hut
4D | Legend of Hyrule
4E | Shooting Gallery
4F | Sheik's Theme
50 | Zora's Domain
51 | Enter Zelda
52 | Goodbye to Zelda
53 | Master Sword
54 | Ganon
55 | Shop
56 | Chamber of the Sages
57 | File Select
58 | Ice Cavern
59 | Open Door of Temple of Time
5A | Kaepora Gaebora's Theme
5B | Shadow Temple
5C | Water Temple
5D | Ganon's Castle Bridge
5E | Ocarina of Time
5F | Gerudo Valley
60 | Potion Shop
61 | Kotake & Koume's Theme
62 | Escape from Ganon's Castle
63 | Ganon's Castle Underground
64 | Ganondorf Battle
65 | Ganon Battle
66 | Seal of Six Sages
67 | End Credits I
68 | End Credits II
69 | End Credits III
6A | End Credits IV
6B | King Dodongo & Volvagia Boss Battle
6C | Mini-Game
