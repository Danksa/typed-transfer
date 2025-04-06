export type Serdes<T> = {
    readonly serialized: (value: T) => ArrayBuffer;
    readonly deserialized: (value: ArrayBuffer) => T;
    readonly serializedSize: (value: T) => number;
};
