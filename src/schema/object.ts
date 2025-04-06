import { ObjectSerdes, Structure, StructureType } from '../serdes/object-serdes.js';
import { Schema } from './schema.js';

export type ObjectSchema<T extends { [key in string]: Schema }> = Schema<StructureType<T>> & {
    structure: T;
};

export const Object = <T extends Structure<T>>(structure: T): ObjectSchema<T> => {
    return new ObjectSerdes<T>(structure) as ObjectSchema<T>;
};
