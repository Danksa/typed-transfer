import { Serdes } from '../serdes/serdes.js';
import { Schema, SchemaType } from '../schema/schema.js';

export type StructureType<T extends { [key in string]: Schema }> = {
    [key in keyof T]: SchemaType<T[key]>;
};

export type Structure<T extends Record<string, Schema>> = {
    [key in keyof T]: T[key] extends Schema<infer R> ? Schema<R> : Schema;
};

export class ObjectSerdes<T extends Structure<T>> implements Serdes<StructureType<T>> {
    readonly structure: T;

    constructor(structure: T) {
        this.structure = structure;
    }

    serializedSize(value: StructureType<T>): number {
        const contentSize = Object.entries(value)
            .map(([key, value]) => this.structure[key as keyof T].serializedSize(value))
            .reduce((sum, current) => sum + current, 0);
        return contentSize;
    }

    serialized(value: StructureType<T>): ArrayBuffer {
        const size = this.serializedSize(value);
        const encoded = new Uint8Array(size);
        let offset = 0;

        for (const [key, propValue] of Object.entries(value)) {
            const encodedValue = new Uint8Array(this.structure[key as keyof T].serialized(propValue));
            encoded.set(encodedValue, offset);
            offset += encodedValue.length;
        }

        return encoded.buffer;
    }

    deserialized(value: ArrayBuffer): StructureType<T> {
        const result = {} as Record<string, unknown>;
        let offset = 0;
        for (const [key, valueSchema] of Object.entries(this.structure) as unknown as ReadonlyArray<
            readonly [Extract<keyof T, string>, T[keyof T]]
        >) {
            const decodedValue = valueSchema.deserialized(value.slice(offset));

            result[key] = decodedValue;
            offset += valueSchema.serializedSize(decodedValue);
        }

        return result as StructureType<T>;
    }
}
