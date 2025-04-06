import { StringSerdes } from '../../../src/serdes/string-serdes.js';
import { describe, it, expect } from 'vitest';

describe('string-serdes', () => {
    describe('serialization', () => {
        it('should serialize a string', () => {
            // arrange
            const serdes = StringSerdes.Instance;
            const text = 'Hello, world!';
    
            // act
            const serialized = serdes.serialized(text);
    
            // assert
            expect(serialized).toEqual(new Uint8Array([
                13, 0, ...charCodes(text)
            ]).buffer);
        });
    
        it('should serialize a string with unicode symbols', () => {
            // arrange
            const serdes = StringSerdes.Instance;
            const text = 'Heute gehe ich ins Übergrößengeschäft!';
    
            // act
            const serialized = serdes.serialized(text);
    
            // assert
            expect(new Uint8Array(serialized)).toEqual(new Uint8Array([
                42, 0, ...charCodes(text)
            ]));
        });

        it('should throw an error if serializing a string exceeding 65535 bytes', () => {
            // arrange
            const serdes = StringSerdes.Instance;
            const text = 'x'.repeat(Math.pow(2, 16));
    
            // act
            const serialize = () => serdes.serialized(text);
    
            // assert
            expect(serialize).toThrow();
        });
    });
    
    describe('deserialization', () => {
        it('should deserialize a string', () => {
            // arrange
            const serdes = StringSerdes.Instance;
            const text = 'Hello, world!';
    
            // act
            const deserialized = serdes.deserialized(new Uint8Array([
                13, 0, ...charCodes(text)
            ]).buffer);
    
            // assert
            expect(deserialized).toEqual(text);
        });
    
        it('should deserialize a string with unicode symbols', () => {
            // arrange
            const serdes = StringSerdes.Instance;
            const text = 'Heute gehe ich ins Übergrößengeschäft!';
    
            // act
            const deserialized = serdes.deserialized(new Uint8Array([
                42, 0, ...charCodes(text)
            ]).buffer);
    
            // assert
            expect(deserialized).toEqual(text);
        });
    
        it('should throw an error if deserializing input shorter than 2 bytes', () => {
            // arrange
            const serdes = StringSerdes.Instance;
    
            // act
            const deserialize = () => serdes.deserialized(new Uint8Array([
                0
            ]).buffer);
    
            // assert
            expect(deserialize).toThrow();
        });
    
        it('should throw an error when deserializing if input is shorter than encoded length', () => {
            // arrange
            const serdes = StringSerdes.Instance;
            const text = 'Test';
    
            // act
            const deserialize = () => serdes.deserialized(new Uint8Array([
                text.length + 1, 0, ...charCodes(text)
            ]).buffer);
    
            // assert
            expect(deserialize).toThrow();
        });
    });
});

const charCodes = (s: string): ReadonlyArray<number> => {
    const encoder = new TextEncoder();
    return Array.from(encoder.encode(s));
};

