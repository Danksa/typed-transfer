import { Int32Serdes } from '../serdes/int32-serdes.js';
import { Schema } from './schema.js';

export type Int32Schema = Schema<number>;

export const Int32 = (): Int32Schema => {
    return Instance;
};

const Instance: Int32Schema = {
    serializedSize: (value) => Int32Serdes.Instance.serializedSize(value),
    serialized: (value) => Int32Serdes.Instance.serialized(value),
    deserialized: (value) => Int32Serdes.Instance.deserialized(value)
} as Int32Schema;
