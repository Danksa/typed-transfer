import { Serdes } from '../serdes/serdes.js';

export type Schema<T = unknown> = Serdes<T> & { readonly type: T };

export type SchemaType<T extends Schema> = T['type'];
