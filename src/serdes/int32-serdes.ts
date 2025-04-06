import { Serdes } from '../serdes/serdes.js';

export class Int32Serdes implements Serdes<number> {
    static readonly Instance: Int32Serdes = new Int32Serdes();

    private static readonly _Bytes: number = 4;

    private constructor() {}

    serializedSize(value: number): number {
        return Int32Serdes._Bytes;
    }

    serialized(value: number): ArrayBuffer {
        const size = this.serializedSize(value);
        const encoded = new ArrayBuffer(size);

        const test = new Uint32Array(encoded);
        test[0] = value;

        return encoded;
    }

    deserialized(value: ArrayBuffer): number {
        if (value.byteLength < Int32Serdes._Bytes) {
            throw new Error('Invalid length');
        }

        const encoded = new Uint32Array(value);
        return encoded[0];
    }
}
