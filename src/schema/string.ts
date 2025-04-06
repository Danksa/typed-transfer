import { Schema } from './schema.js';
import { StringSerdes } from '../serdes/string-serdes.js';

export type StringSchema = Schema<string>;

export const String = (): StringSchema => {
    return Instance;
};

const Instance: StringSchema = {
    serializedSize: (value) => StringSerdes.Instance.serializedSize(value),
    serialized: (value) => StringSerdes.Instance.serialized(value),
    deserialized: (value) => StringSerdes.Instance.deserialized(value)
} as StringSchema;
