# Music Replacement Mod (OoT)

This mod allows some music in Ocarina of Time to be replaced with external audio files.

Once you've loaded your music/collections you can select them from in game under the `mods -> Music Replacement` tab

## Usage

Place the pak file in your `mods` folder and enable the mod in the launcher. On first launch it will create a `music` folder at `./ModLoader/music`.

Within that folder it will have `collections`, `bgm` and `fanfares`. 

### BGM and Fanfares can accept any file name and when the random option is selected in the mods section, it will randomly pick from the files in the folder.

Eg: `./ModLoader/music/bgm/my-random-song.ogg`
and
`./ModLoader/music/bgm/random_fanfare.ogg`

### collections can be loaded in with specific songs tying to specific locations in game. (designated below)

You can have multiple collections by naming the folders as

`./ModLoader/music/collections/COLLECTION_NAME/`

While replacing `COLLECTION_NAME` with what you want your collection to be named.

Simply add your OGG, FLAC or WAV files inside the collection folder and make sure they are named as follows:
`1A-loop.ogg`

- `1A` represents the music ID from the game you want to replace with this audio file. A list of music IDs from Ocarina of Time can be found at: https://wiki.cloudmodding.com/oot/Music_Sequences

- `loop` represents if the audio file should loop. Set it to `noloop` if you don't want the music to loop. Looping should be used for background music, while fanfares or ocarina songs should not be looping.

- You can set what times the file loops at by specifying the start and the end in the following format `1A-loop-3000-10000.ogg` (Position-Loop-Start-End) (Time is in miliseconds)

- `.ogg` is the file extension of your audio file and can be different. You shouldn't touch it at all when renaming your file.

### .OGG is recommended! .MP3 files are not supported!

# Here are a list of all the supported music IDs.

## OoT

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


## MM
Filename | Track Name
------------ | -------------
2 | Termina Field
3 | Forest Chase
4 | Majora's Theme
5 | The Clock Tower
6 | Stone Tower Temple
7 | Stone Tower Temple Inverted
8 | Missed Event 1
9 | Title
10 | Mask Salesman
11 | Song of Healing
12 | Southern Swamp
13 | Ghost Attack
14 | Mini Game
15 | Sharp's Curse
16 | Great Bay Coast
17 | Ikana Valley
18 | Court of the Deku King
19 | Mountain Village
20 | Pirates' Fortress
21 | Clock Town Day 1
22 | Clock Town Day 2
23 | Clock Town Day 3
24 | [File Select]
25 | Event Clear
26 | Battle
27 | Boss Battle
28 | Woodfall Temple
29 | Clock Town Day 1
30 | Forest Ambush
31 | House
32 | Game Over
33 | Boss Clear
34 | Item Catch
35 | Clock Town Day 2
36 | Complete a Heart Piece
37 | Playing Minigame
38 | Goron Race
39 | Music Box House
40 | Fairy's Fountain
41 | Zelda's Lullaby
42 | Rosa Sisters' Dance
43 | Open Chest
44 | Marine Research Laboratory
45 | The Four Giants
46 | Guru-Guru's Song
47 | Romani Ranch
48 | Goron Village
49 | Mayor Dotour
50 | Ocarina Epona's Song
51 | Ocarina Sun's Song
52 | Ocarina Song of Time
53 | Ocarina Song of Storms
54 | Zora Hall
55 | A New Mask
56 | Mini Boss
57 | Small Item Catch
58 | Astral Observatory
59 | Clock Town Cavern
60 | Milk Bar Latte
61 | Meet Zelda (OoT)
62 | Woods of Mystery
63 | Goron Race Goal
64 | Gorman Race
65 | Race Finish
66 | Gorman Bros.
67 | Kotake's Potion Shop
68 | Store
69 | Gaebora's Theme
70 | Target Practice
71 | Ocarina Song of Soaring
72 | Ocarina Song of Healing
73 | Inverted Song of Time
74 | Song of Double Time
75 | Sonata of Awakening
76 | Goron Lullaby
77 | New Wave Bossa Nova
78 | Elegy of Emptiness
79 | Oath to Order
80 | Sword Training
81 | Ocarina Goron Lullaby Intro
82 | New Song
83 | Bremen March
84 | Ballad of the Wind Fish
85 | Song of Soaring
86 | Milk Bar Latte
87 | Final Hours
88 | Mikau's Tale
89 | Mikau's Fin
90 | Don Gero's Song
91 | Ocarina Sonata of Awakening
92 | Ocarina Goron Lullaby
93 | Ocarina New Wave Bossa Nova
94 | Ocarina Elegy of Emptiness
95 | Ocarina Oath to Order
96 | Last Dungeon
97 | OCA Lullaby Half
98 | Bass and Guitar Session
99 | Piano Solo
100 | The Indigo-Go's Rehearsal
101 | Snowhead Temple
102 | Great Bay Temple
103 | Demo Sax
104 | Demo Vocal
105 | Majora's Wrath
106 | Majora's Incarnation
107 | Majora's Mask Battle
108 | Bass Practice
109 | Drums Practice
110 | Piano Practice
111 | Ikana Castle
112 | Calling the Four Giants
113 | Kamaro's Dance
114 | Cremia's Carriage
115 | Keaton
116 | The End/Credits I
117 | Forest Ambush (?)
118 | Title Screen
119 | Surfacing of Woodfall
120 | Woodfall Clear
121 | Snowhead Clear
123 | To the Moon
124 | Goodbye Giants
125 | Tatl and Tael
126 | Moon's Destruction
130 | The End/Credits II