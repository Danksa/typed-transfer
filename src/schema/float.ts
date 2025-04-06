import { FloatSerdes } from '../serdes/float-serdes.js';
import { Schema } from './schema.js';

export type FloatSchema = Schema<number>;

export const Float = (): FloatSchema => {
    return FloatSerdes.Instance as FloatSchema;
};
