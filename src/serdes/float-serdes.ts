import { Serdes } from '../serdes/serdes.js';

export class FloatSerdes implements Serdes<number> {
    static readonly Instance: FloatSerdes = new FloatSerdes();

    private static readonly _FloatSize: number = 4;

    private constructor() {}

    serializedSize(value: number): number {
        return FloatSerdes._FloatSize;
    }

    serialized(value: number): ArrayBuffer {
        const encoded = new Float32Array(1);
        encoded[0] = value;
        return encoded.buffer;
    }

    deserialized(value: ArrayBuffer): number {
        if (value.byteLength < FloatSerdes._FloatSize) {
            throw new Error('Length too short');
        }
        const encoded = new Float32Array(value, 0, 1);
        return encoded[0];
    }
}
