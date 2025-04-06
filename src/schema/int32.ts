import { Int32Serdes } from '../serdes/int32-serdes.js';
import { Schema } from './schema.js';

export type Int32Schema = Schema<number>;

export const Int32 = (): Int32Schema => {
    return Int32Serdes.Instance as Int32Schema;
};
