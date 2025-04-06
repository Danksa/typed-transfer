import { ArraySerdes, ArrayType } from "../serdes/array-serdes.js";
import { Schema } from "./schema.js";

export type ArraySchema<T extends Schema> = Schema<ArrayType<T>> & { readonly elementSchema: T };

export const Array = <T extends Schema>(elementSchema: T): ArraySchema<T> => {
    return new ArraySerdes(elementSchema) as ArraySchema<T>;
};