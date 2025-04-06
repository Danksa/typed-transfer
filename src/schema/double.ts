import { DoubleSerdes } from './../serdes/double-serdes.js';
import { Schema } from './schema.js';

export type DoubleSchema = Schema<number>;

export const Double = (): DoubleSchema => {
    return Instance;
};

const Instance: DoubleSchema = {
    serializedSize: (value) => DoubleSerdes.Instance.serializedSize(value),
    serialized: (value) => DoubleSerdes.Instance.serialized(value),
    deserialized: (value) => DoubleSerdes.Instance.deserialized(value)
} as DoubleSchema;
