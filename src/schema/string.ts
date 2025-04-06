import { Schema } from './schema.js';
import { StringSerdes } from '../serdes/string-serdes.js';

export type StringSchema = Schema<string>;

export const String = (): StringSchema => {
    return StringSerdes.Instance as unknown as StringSchema;
};
