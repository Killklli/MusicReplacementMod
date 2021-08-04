import { IPlugin, IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import path from 'path';
import fs from 'fs-extra';
import { SequencePlayer } from './SequencePlayer';
import { IOOTCore } from 'modloader64_api/OOT/OOTAPI';
import { EventHandler } from 'modloader64_api/EventHandler';
import { MusicReplacementEvents, MusicReplacementTrack } from './MusicReplacementAPI';
import { onViUpdate } from "modloader64_api/PluginLifecycle";
import { Font } from "modloader64_api/Sylvain/Gfx";

interface OoTMusicReplacement_Config {
    current_option: string;
}

class OoT_MusicReplacementMod implements IPlugin {

    ModLoader!: IModLoaderAPI;
    @InjectCore()
    core!: IOOTCore;
    font!: Font;
    is_out_of_title!: number;
    force_replay!: boolean;
    sequencePlayers!: SequencePlayer[];
    config!: OoTMusicReplacement_Config;
    music_folder!: string;
    cache: Map<string, Buffer> = new Map<string, Buffer>();
    packs: Array<string> = new Array<string>();
    // Create arrays for checking if we already have audio assigned to sections
    bgm: Array<string> = ["02", "18", "19", "1A", "1B", "1C", "1D", "1E",
        "1F", "26", "27", "28", "29", "2A", "2C", "2D", "2E",
        "2F", "30", "38", "3A", "3C", "3E", "3F", "40", "42",
        "4A", "4B", "4C", "4D", "4E", "4F", "50", "54", "55",
        "56", "57", "58", "5A", "5B", "5C", "5F", "60", "61",
        "62", "63", "64", "65", "67", "68", "69", "6A", "6B",
        "6C", "51", "52", "66"];
    fanfares: Array<string> = ["20", "21", "22", "23", "24", "25", "2B",
        "32", "33", "34", "35", "36", "37", "39", "3B", "3D",
        "41", "43", "53", "59", "5E"]

    preinit(): void {
        if (!fs.existsSync("./music")) {
            fs.mkdirSync("./music");
        }
        if (!fs.existsSync("./music/packs")) {
            fs.mkdirSync("./music/packs");
        }
        if (!fs.existsSync("./music/fanfares")) {
            fs.mkdirSync("./music/fanfares");
        }
        if (!fs.existsSync("./music/bgm")) {
            fs.mkdirSync("./music/bgm");
        }
    }

    @EventHandler(MusicReplacementEvents.LOAD_TRACK)
    onTrack(track: MusicReplacementTrack) {
        this.ModLoader.logger.info("Caching music track from API: " + track.name + ".");
        this.cache.set(track.name, track.content);
    }

    init(): void {
        this.config = this.ModLoader.config.registerConfigCategory("OoT_MusicReplacementMod") as OoTMusicReplacement_Config;
        this.ModLoader.config.setData("OoT_MusicReplacementMod", "current_option", "OoT_MusicReplacementMod-Randomize", false);
        this.music_folder = path.resolve(global.ModLoader.startdir, "music");
        this.packs = this.find_pack_names(this.music_folder + "/packs/");
        // If we have a pack already set, load that as the default rather than rando
        if (this.config.current_option !== "OoT_MusicReplacementMod-Randomize") {
            this.load_pack_folder(this.config.current_option);
        }
        else {
            this.load_random_music();
        }
    }

    postinit(): void {
        // Create emulated sequence players
        this.sequencePlayers = new Array<SequencePlayer>(3);
        this.sequencePlayers.push(new SequencePlayer(this.ModLoader.emulator, 0x80128B60));
        this.sequencePlayers.push(new SequencePlayer(this.ModLoader.emulator, 0x80128CC0));
        //this.sequencePlayers.push(new SequencePlayer(this.ModLoader.emulator, 0x80128E20));
        this.sequencePlayers.push(new SequencePlayer(this.ModLoader.emulator, 0x80128F80));

        //Mute OG Music
        this.ModLoader.utils.setIntervalFrames(() => {
            for (let i = 0x3; i < 0x26; i++) {
                this.ModLoader.emulator.rdramWrite32(0x80113750 + (i * 0x10), 0xFFFFFFFF);
            }
        }, 10);
    }

    get_random_item(current: Array<string>, array: Array<string>): string {
        // Randomly get an id from the array passed.
        var random = array[Math.floor(Math.random() * array.length)]
        if (!current.includes(random)) {
            return random;
        }
        else {
            return this.get_random_item(current, array);
        }
    }

    shuffle(array: Array<string>) {
        var currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }


    load_random_music() {
        this.cache = new Map<string, Buffer>();
        var bgm_files = Array<string>();
        var fanfare_files = Array<string>();
        var picked_bgm = Array<string>();
        var picked_fanfare = Array<string>();

        // Search our bgm and fanfare folders for files
        this.searchRecursive(this.music_folder + "/bgm/").forEach((file: string) => {
            this.ModLoader.logger.info("Finding BGM Songs: " + file + ".");
            bgm_files.push(file);
        });
        this.searchRecursive(this.music_folder + "/fanfares/").forEach((file: string) => {
            this.ModLoader.logger.info("Finding Fanfares: " + file + ".");
            fanfare_files.push(file);
        });

        // If we have any set of files found cache them into their cache in their own position
        if (bgm_files.length > 0) {
            this.shuffle(bgm_files).every(file => {
                if (picked_bgm.length === this.bgm.length) {
                    return false;
                }
                else {
                    this.ModLoader.logger.info("Caching song: " + file + ".");
                    var random = this.get_random_item(picked_bgm, this.bgm);
                    picked_bgm.push(random);
                    let buf: Buffer = fs.readFileSync(file);
                    this.cache.set(random, buf);
                }
                return true;
            });
        }
        if (fanfare_files.length > 0) {
            this.shuffle(fanfare_files).every(file => {
                if (picked_fanfare.length === this.fanfares.length) {
                    return false;
                }
                else {
                    this.ModLoader.logger.info("Caching fanfare: " + file + ".");
                    var random = this.get_random_item(picked_fanfare, this.fanfares);
                    picked_fanfare.push(random)
                    let buf: Buffer = fs.readFileSync(file);
                    this.cache.set(random, buf);
                }
                return true;
            });
        }
    }

    load_pack_folder(dir: string) {
        this.cache = new Map<string, Buffer>();
        this.searchRecursive(dir).forEach((file: string) => {
            this.ModLoader.logger.info("Caching music track from folder: " + file + ".");
            let buf: Buffer = fs.readFileSync(file);
            let name: string = path.parse(file).name;
            this.cache.set(name, buf);
        });
    }

    find_pack_names(dir: string): Array<string> {
        let results = new Array<string>();
        // Read contents of directory
        fs.readdirSync(dir).forEach((dirInner) => {
            // Obtain absolute path
            dirInner = path.resolve(dir, dirInner);

            // Get stats to determine if path is a directory or a file
            var stat = fs.statSync(dirInner);

            // If path is a directory, scan it and combine results
            if (stat.isDirectory()) {
                results.push(dirInner);
            }
        });
        return results;
    }

    searchRecursive(dir: string): Array<string> {
        // This is where we store pattern matches of all files inside the directory
        let results = new Array<string>();

        // Read contents of directory
        fs.readdirSync(dir).forEach((dirInner) => {
            // Obtain absolute path
            dirInner = path.resolve(dir, dirInner);

            // Get stats to determine if path is a directory or a file
            var stat = fs.statSync(dirInner);

            // If path is a directory, scan it and combine results
            if (stat.isDirectory()) {
                results = results.concat(this.searchRecursive(dirInner));
            }

            // If path is a file and ends with pattern then push it onto results
            if (stat.isFile()) {
                results.push(dirInner);
            }
        });

        return results;
    }

    onTick(frame?: number | undefined): void {
        this.sequencePlayers.forEach(player => {
            // Only change volume if the OG song is actually playing
            if (player.music !== undefined && player.last_music_playing && player.last_music_id === player.music_id) {
                // Set volume to the same as in-game
                if ((player.volume_og * 100) <= 100) {
                    player.music.volume = (player.volume_og * 100);
                }

                // Decrease volume if paused
                if (player.is_paused) {
                    player.music.volume /= 3;
                }

                // Mute music if OG is muted too
                /*if (player.is_muted) {
                    player.music.volume = 0;
                }*/
            }

            // Play new music
            if ((!player.last_music_playing || player.last_music_id !== player.music_id) && player.is_og_playing || this.force_replay === true) {
                if (player.music !== undefined) {
                    player.music.stop();
                    player.music.release();
                }
                this.force_replay = false;

                this.cache.forEach((buf: Buffer, file: string) => {
                    let update = false;
                    if (this.config.current_option === "OoT_MusicReplacementMod-Randomize") {
                        let id: number = parseInt(file.trim(), 16);

                        // Check for file arguments in the file name
                        if (id === player.music_id) {
                            player.music = this.ModLoader.sound.initMusic(buf);
                            update = true;
                            if (this.bgm.includes(file)) {
                                player.music.loop = true;
                            }
                        }
                    }
                    else {
                        let fileSplits: string[] = path.parse(file).name.split('-');
                        let id: number = parseInt(fileSplits[0].trim(), 16);

                        // Check for file arguments in the file name
                        if (id === player.music_id) {
                            player.music = this.ModLoader.sound.initMusic(buf);
                            update = true;
                            if (fileSplits.length > 1) {
                                if (fileSplits[1].trim() === "loop") {
                                    player.music.loop = true;

                                    if (fileSplits.length >= 4) {
                                        player.loop_start = parseFloat(fileSplits[2].trim());
                                        player.loop_end = parseFloat(fileSplits[3].trim());
                                        player.SetLoopTimes(player.loop_start, player.loop_end);
                                    }
                                }
                            }
                        }
                    }
                    if (update === true) {
                        let vol = (global.ModLoader["GLOBAL_VOLUME"] as number) >= player.volume_og ? player.volume_og : global.ModLoader["GLOBAL_VOLUME"] as number;
                        player.music.volume = vol;
                        player.music.play();

                        player.last_music_id = player.music_id;
                        player.last_music_playing = player.is_og_playing;

                        return;
                    }
                });
            }

            player.last_music_id = player.music_id;
            player.last_music_playing = player.is_og_playing;
        });
    }

    @onViUpdate()
    onViUpdate() {
        if (this.ModLoader.ImGui.beginMainMenuBar()) {
            if (this.ModLoader.ImGui.beginMenu("Mods")) {
                if (this.ModLoader.ImGui.beginMenu("Music Replacement")) {
                    if (this.ModLoader.ImGui.beginMenu("Music Paks")) {
                        this.packs.forEach(pack_name => {
                            if (this.ModLoader.ImGui.menuItem(path.basename(pack_name), undefined, ((this.config.current_option == pack_name) ? true : false))) {
                                this.load_pack_folder(pack_name);
                                this.force_replay = true;
                                this.ModLoader.config.setData("OoT_MusicReplacementMod", "current_option", pack_name, true);
                                this.ModLoader.config.save();
                            }
                        });
                        this.ModLoader.ImGui.endMenu();
                    }
                    if (this.ModLoader.ImGui.menuItem("Randomize Music", undefined, ((this.config.current_option == "OoT_MusicReplacementMod-Randomize") ? true : false))) {
                        this.load_random_music()
                        this.force_replay = true;
                        this.ModLoader.config.setData("OoT_MusicReplacementMod", "current_option", "OoT_MusicReplacementMod-Randomize", true);
                        this.ModLoader.config.save();
                    }
                    this.ModLoader.ImGui.endMenu();
                }
                this.ModLoader.ImGui.endMenu();
            }
            this.ModLoader.ImGui.endMainMenuBar();
        }

    }
}

module.exports = OoT_MusicReplacementMod;