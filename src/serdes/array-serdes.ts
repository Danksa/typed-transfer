import { Schema, SchemaType } from "../schema/schema.js";
import { DeserializationError } from "./deserialization-error.js";
import { Serdes } from "./serdes.js";
import { SerializationError } from "./serialization-error.js";

export type ArrayType<T extends Schema> = Array<SchemaType<T>>;

export class ArraySerdes<T extends Schema<any>> implements Serdes<ArrayType<T>> {
    private static readonly _LengthBytes: number = 2;
    private static readonly _MaxLength: number = Math.pow(2, 8 * this._LengthBytes) - 1;

    readonly elementSchema: T;

    constructor(elementSchema: T) {
        this.elementSchema = elementSchema;
    }

    serializedSize(value: ArrayType<T>): number {
        return ArraySerdes._LengthBytes + value.reduce((sum, element) => sum + this.elementSchema.serializedSize(element), 0);
    }

    serialized(value: ArrayType<T>): ArrayBuffer {
        if(value.length > ArraySerdes._MaxLength) {
            throw new SerializationError(this, `Array with length ${length} is longer than maximum of ${ArraySerdes._MaxLength}`);
        }

        const size = this.serializedSize(value);
        const encoded = new ArrayBuffer(size);
        const encodedLength = new Uint16Array(encoded, 0, 1);
        encodedLength[0] = value.length;

        const encodedArray = new Uint8Array(encoded, ArraySerdes._LengthBytes);
        let offset = 0;
        for(const element of value) {
            const encodedElement = new Uint8Array(this.elementSchema.serialized(element));
            encodedArray.set(encodedElement, offset);
            offset += encodedElement.byteLength;
        }
        return encoded;
    }

    deserialized(value: ArrayBuffer): ArrayType<T> {
        if(value.byteLength < ArraySerdes._LengthBytes) {
            throw new DeserializationError(this, 'Input buffer too short');
        }

        const encodedLength = new Uint16Array(value, 0, 1);
        const length = encodedLength[0];

        let offset = ArraySerdes._LengthBytes;
        const decoded = new Array<SchemaType<T>>();
        for(let i = 0; i < length; ++i) {
            const decodedElement = this.elementSchema.deserialized(value.slice(offset));
            decoded.push(decodedElement);
            offset += this.elementSchema.serializedSize(decodedElement);
        }
        return decoded;
    }
}