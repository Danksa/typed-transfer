import { FloatSerdes } from '../serdes/float-serdes.js';
import { Schema } from './schema.js';

export type FloatSchema = Schema<number>;

export const Float = (): FloatSchema => {
    return Instance;
};

const Instance: FloatSchema = {
    serializedSize: (value) => FloatSerdes.Instance.serializedSize(value),
    serialized: (value) => FloatSerdes.Instance.serialized(value),
    deserialized: (value) => FloatSerdes.Instance.deserialized(value)
} as FloatSchema;
