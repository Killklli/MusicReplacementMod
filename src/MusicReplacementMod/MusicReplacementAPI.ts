export const enum MusicReplacementEvents{
    LOAD_TRACK = "MusicReplacementEvents:LOAD_TRACK"
}

export class MusicReplacementTrack{
    name: string;
    content: Buffer;

    constructor(name: string, content: Buffer){
        this.name = name;
        this.content = content;
    }
}