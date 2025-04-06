import { DeserializationError } from './deserialization-error.js';
import { Serdes } from './serdes.js';
import { SerializationError } from './serialization-error.js';

export class StringSerdes implements Serdes<string> {
    static readonly Instance: StringSerdes = new StringSerdes();

    private static readonly _LengthBytes: number = 2;
    private static readonly _MaxLength: number = Math.pow(2, 8 * this._LengthBytes) - 1;
    private readonly _encoder: TextEncoder;
    private readonly _decoder: TextDecoder;

    private constructor() {
        this._encoder = new TextEncoder();
        this._decoder = new TextDecoder();
    }

    serializedSize(value: string): number {
        return this._encoder.encode(value).length + StringSerdes._LengthBytes;
    }

    serialized(value: string): ArrayBuffer {
        const s = this._encoder.encode(value);
        const length = s.length;
        if (length > StringSerdes._MaxLength) {
            throw new SerializationError(
                this, `String with length ${length} is longer than maximum of ${StringSerdes._MaxLength}`
            );
        }

        const encodedSize = length + StringSerdes._LengthBytes;
        const encoded = new ArrayBuffer(encodedSize);

        const encodedLength = new Uint16Array(encoded, 0, 1);
        encodedLength[0] = length;

        const encodedString = new Uint8Array(encoded, StringSerdes._LengthBytes);
        encodedString.set(s);
        return encoded;
    }

    deserialized(value: ArrayBuffer): string {
        if (value.byteLength < StringSerdes._LengthBytes) {
            throw new DeserializationError(this, 'Input buffer too short');
        }

        const encodedLength = new Uint16Array(value, 0, 1);
        const length = encodedLength[0];

        const totalLength = length + StringSerdes._LengthBytes;
        if (value.byteLength < totalLength) {
            throw new DeserializationError(this, 'Input buffer shorter than serialized length value indicates');
        }

        const encodedString = new Uint8Array(value, StringSerdes._LengthBytes, length);
        return this._decoder.decode(encodedString);
    }
}
