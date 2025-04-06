import { DoubleSerdes } from './../serdes/double-serdes.js';
import { Schema } from './schema.js';

export type DoubleSchema = Schema<number>;

export const Double = (): DoubleSchema => {
    return DoubleSerdes.Instance as DoubleSchema;
};
