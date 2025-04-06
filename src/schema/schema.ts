import { Serdes } from '../serdes/serdes.js';

export type Schema<T = unknown> = Serdes<T> & { type: T };

export type SchemaType<T extends Schema> = T['type'];
