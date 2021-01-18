import { IPlugin, IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';
import { IOOTCore } from 'modloader64_api/OOT/OOTAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import path from 'path';
import fs from 'fs-extra';
import { SequencePlayer } from './SequencePlayer';

class OoT_MusicReplacementMod implements IPlugin {

    ModLoader!: IModLoaderAPI;
    @InjectCore()
    core!: IOOTCore;

    is_out_of_title!: number;

    sequencePlayers!: SequencePlayer[];

    preinit(): void {
    }

    init(): void {
    }

    postinit(): void {
        this.sequencePlayers = new Array<SequencePlayer>(4);
        this.sequencePlayers.push(new SequencePlayer(this.ModLoader.emulator, 0x80128B60));
        this.sequencePlayers.push(new SequencePlayer(this.ModLoader.emulator, 0x80128CC0));
        this.sequencePlayers.push(new SequencePlayer(this.ModLoader.emulator, 0x80128E20));
        this.sequencePlayers.push(new SequencePlayer(this.ModLoader.emulator, 0x80128F80));

        // Mute OG music
        this.ModLoader.utils.setTimeoutFrames(() => {
            this.ModLoader.emulator.rdramWriteBuffer(0x801139B2, Buffer.alloc(0xD8));
        }, 1);
    }

    onTick(frame?: number | undefined): void {
        this.sequencePlayers.forEach(player => {
            if (player.is_og_playing && player.music !== undefined) {
                if (player.loop_start !== undefined) {
                    player.SetLoopTimes(player.loop_start, player.loop_end);
                }

                if ((player.volume_og * 100) < 100) {
                    player.music.volume = player.volume_og * 100;
                }

                // Decrease volume if paused
                if (this.core.helper.isPaused()) {
                    player.music.volume /= 3;
                }

                if (player.is_muted) {
                    player.music.volume = 0;
                }
            }

            // Play new music
            if (!player.last_music_playing && player.is_og_playing) {
                if (player.music !== undefined) {
                    player.music.stop();
                    player.music.release();
                    player.last_music_id = 0;
                }

                let music_folder: string = path.resolve("./mods/music");
                fs.readdirSync(music_folder).forEach((file: string) => {
                    let fileSplits: string[] = path.parse(file).name.split('-');
                    let f: string = path.resolve(music_folder, file);
                    let id: number = parseInt(fileSplits[0].trim(), 16);
                    if (id == player.music_id) {
                        player.music = this.ModLoader.sound.loadMusic(f);

                        if (fileSplits.length > 1) {
                            if (fileSplits[1].trim() === "loop") {
                                player.music.loop = true;

                                if (fileSplits.length === 4) {
                                    player.loop_start = parseFloat(fileSplits[2].trim());
                                    player.loop_end = parseFloat(fileSplits[3].trim());
                                    player.SetLoopTimes(player.loop_start, player.loop_end);
                                }
                            }
                        }

                        player.music.play();
                        player.last_music_id = id;
                    }
                });
            }

            player.last_music_playing = player.is_og_playing;
        });
    }
}

module.exports = OoT_MusicReplacementMod;