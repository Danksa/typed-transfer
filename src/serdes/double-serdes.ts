import { Serdes } from '../serdes/serdes.js';

export class DoubleSerdes implements Serdes<number> {
    static readonly Instance: DoubleSerdes = new DoubleSerdes();

    private static readonly _DoubleSize: number = 8;

    private constructor() {}

    serializedSize(value: number): number {
        return DoubleSerdes._DoubleSize;
    }

    serialized(value: number): ArrayBuffer {
        const encoded = new Float64Array(1);
        encoded[0] = value;
        return encoded.buffer;
    }

    deserialized(value: ArrayBuffer): number {
        if (value.byteLength < DoubleSerdes._DoubleSize) {
            throw new Error('Length too short');
        }
        const encoded = new Float64Array(value, 0, 1);
        return encoded[0];
    }
}
