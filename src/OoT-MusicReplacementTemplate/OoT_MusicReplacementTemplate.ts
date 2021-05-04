import { IModLoaderAPI, IPlugin } from "modloader64_api/IModLoaderAPI";
import path from 'path';
import fs from 'fs-extra';
import { MusicReplacementEvents, MusicReplacementTrack } from "./MusicReplacementAPI";
import { bus } from "modloader64_api/EventHandler";

class OoT_MusicReplacementTemplate implements IPlugin {

    ModLoader!: IModLoaderAPI;
    pluginName?: string | undefined;
    pluginHash?: string | undefined;

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

    preinit(): void {
        this.searchRecursive(path.resolve(__dirname, "music")).forEach((file: string) => {
            bus.emit(MusicReplacementEvents.LOAD_TRACK, new MusicReplacementTrack(path.parse(file).name, fs.readFileSync(file)));
        });
    }

    init(): void {
    }

    postinit(): void {
    }

    onTick(frame?: number): void {
    }

}

module.exports = OoT_MusicReplacementTemplate;