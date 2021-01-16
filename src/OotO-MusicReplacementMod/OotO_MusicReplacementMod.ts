import { IPlugin, IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';
import { IOOTCore } from 'modloader64_api/OOT/OOTAPI';
import { InjectCore } from 'modloader64_api/CoreInjection';
import path from 'path';
import fs from 'fs-extra';
import { SequencePlayer } from './SequencePlayer';

class OotO_MusicReplacementMod implements IPlugin {

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
    }

    onTick(frame?: number | undefined): void {
        // Mute OG music
        this.ModLoader.emulator.rdramWriteBuffer(0x801139D4, Buffer.alloc(0xB8));

        this.sequencePlayers.forEach(player => {
            if (player.last_music_id === player.music_id && player.music_id !== 0x00) {
                // Set volume
                if ((player.volume_og * 100) < 100) {
                    player.music.volume = player.volume_og * 100;
                }

                // Decrease volume if paused
                if (this.core.helper.isPaused()) {
                    player.music.volume /= 3;
                }

                if (player.volume_og < 0.1 || player.is_muted) {
                    player.music.volume = 0;
                }
            }

            // Mute music if just went out of title screen
            if (this.core.helper.isSceneNumberValid() && this.is_out_of_title < 4) {
                this.is_out_of_title += 1;

                if (player.music !== undefined) {
                    player.music.volume = 0;
                }
            } else if (!this.core.helper.isSceneNumberValid()) {
                this.is_out_of_title = 0;
            }

            // Play new music
            if ((player.last_music_id !== player.music_id || player.time <= 0x0A) && player.is_og_playing === true && player.music_id !== 0x00) {
                if (player.music !== undefined) {
                    player.music.stop();
                    player.music.release();
                    player.last_music_id = 0;
                }

                let music_folder: string = path.resolve("./mods/music");
                fs.readdirSync(music_folder).forEach((file: string) => {
                    let f: string = path.resolve(music_folder, file);
                    let id: number = parseInt(path.parse(file).name.split('-')[0].trim(), 16);
                    if (id == player.music_id) {
                        player.music = this.ModLoader.sound.loadMusic(f);

                        if (path.parse(file).name.split('-')[1].trim() === "loop") {
                            player.music.loop = true;
                        }

                        player.music.play();
                        player.last_music_id = id;
                    }
                });
            }
        });
    }
}

module.exports = OotO_MusicReplacementMod;