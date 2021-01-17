import IMemory from "modloader64_api/IMemory";
import { Music } from 'modloader64_api/Sound/sfml_audio';

export class TimeSpan {
    offset!: number;
    length!: number;
}

export class SequencePlayer {
    private emulator: IMemory;

    private base_address: number;

    public last_music_id!: number;
    public music!: Music;
    public timeSpan!: TimeSpan;

    public loop_start!: number;
    public loop_end!: number;

    constructor(emu: IMemory, base_address: number) {
        this.emulator = emu;
        this.base_address = base_address;
    }

    get music_id(): number {
        return this.emulator.rdramRead8(this.base_address + 0x04);
    }

    get time(): number {
        return this.emulator.rdramRead16(this.base_address + 0xE2);
    }

    get volume_og(): number {
        return this.emulator.rdramReadF32(this.base_address + 0x1C) * this.emulator.rdramReadF32(this.base_address + 0x2C);
    }

    get is_og_playing(): boolean {
        return this.emulator.rdramReadBit8(this.base_address, 0);
    }

    SetLoopTimes(start: number, end: number): void {
        this.timeSpan = new TimeSpan();
        this.timeSpan.offset = start;
        this.timeSpan.length = end - start;
        this.music.loopPoints = this.timeSpan;
    }

    get is_muted(): boolean {
        return this.emulator.rdramReadBit8(this.base_address, 1);
    }
}