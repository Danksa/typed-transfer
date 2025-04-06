export type Serdes<T> = {
    serialized: (value: T) => ArrayBuffer;
    deserialized: (value: ArrayBuffer) => T;
    serializedSize: (value: T) => number;
};
