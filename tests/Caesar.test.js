import { Caesar } from "../src/classes/Caesar";
import { describe, test, expect, beforeEach } from "vitest";

beforeEach(() => {
    Caesar.setEncryptMode();
    Caesar.setEnglishVocabulary();
});

describe("Ceasar mode setters", () => {
    test("defaults to encrypt mode with English vocabulary", () => {
        expect(Caesar.cipher("abc", 3)).toBe("def");
    });

    test("setDecryptMode flips behavior so cipher decrypts", () => {
        Caesar.setDecryptMode();
        expect(Caesar.cipher("def", 3)).toBe("abc");
        expect(Caesar.cipher("abc", 7)).toBe("tuv");
    });

    test("setEncryptMode after setDecryptMode encrypts again", () => {
        Caesar.setDecryptMode();
        Caesar.setEncryptMode();
        expect(Caesar.cipher("abc", 3)).toBe("def");
    });

    test("setSpanishVocabulary uses the Spanish alphabet", () => {
        Caesar.setSpanishVocabulary();
        expect(Caesar.cipher("n", 3)).toBe("p");
    });

    test("setEnglishVocabulary after setSpanishVocabulary uses English again", () => {
        Caesar.setSpanishVocabulary();
        Caesar.setEnglishVocabulary();
        expect(Caesar.cipher("abc", 3)).toBe("def");
    });
});

describe("Caesar.cipher encryption", () => {
    test("shifts lowercase letters forward by the given amount", () => {
        expect(Caesar.cipher("abc", 3)).toBe("def");
    });

    test("wraps around the end of the alphabet", () => {
        expect(Caesar.cipher("xyz", 3)).toBe("abc");
    });

    test("preserves uppercase letters", () => {
        expect(Caesar.cipher("AbC", 3)).toBe("DeF");
    });

    test("leaves non-letter characters untouched", () => {
        expect(Caesar.cipher("hello world!", 3)).toBe("khoor zruog!");
    });

    test("separates letters without spaces or punctuation", () => {
        expect(Caesar.cipher("abc xyz ABC 123", 3)).toBe("def abc DEF 123");
    });
});

describe("Caesar.cipher decryption", () => {
    test("shifts letters backward by the given amount", () => {
        Caesar.setDecryptMode();
        expect(Caesar.cipher("def", 3)).toBe("abc");
    });

    test("wraps around the start of the alphabet", () => {
        Caesar.setDecryptMode();
        expect(Caesar.cipher("abc", 3)).toBe("xyz");
    });

    test("round-trips English text", () => {
        Caesar.setEncryptMode();
        const encrypted = Caesar.cipher("The quick brown fox", 5);
        Caesar.setDecryptMode();
        expect(Caesar.cipher(encrypted, 5)).toBe("The quick brown fox");
    });
});

describe("Caesar.cipher Spanish vocabulary", () => {
    test("includes the ñ character and treats it as a regular letter", () => {
        Caesar.setSpanishVocabulary();
        expect(Caesar.cipher("ñ", 3)).toBe("q");
    });

    test("wraps before the a of the Spanish alphabet", () => {
        Caesar.setDecryptMode();
        Caesar.setSpanishVocabulary();
        expect(Caesar.cipher("a", 3)).toBe("x");
    });

    test("round-trips Spanish text", () => {
        Caesar.setSpanishVocabulary();
        const encrypted = Caesar.cipher("Hola ñoño 123!", 4);
        Caesar.setDecryptMode();
        expect(Caesar.cipher(encrypted, 4)).toBe("Hola ñoño 123!");
    });
});

describe("Caesar.cipher shift validation", () => {
    test("returns an empty string when shift is greater than the maximum", () => {
        expect(Caesar.cipher("abc", 8)).toBe("");
    });

    test("returns an empty string when shift is less than the minimum", () => {
        expect(Caesar.cipher("abc", 2)).toBe("");
    });

    test("returns an empty string when shift is zero", () => {
        expect(Caesar.cipher("abc", 0)).toBe("");
    });

    test("accepts the minimum valid shift", () => {
        expect(Caesar.cipher("abc", 3)).toBe("def");
    });

    test("accepts the maximum valid shift", () => {
        expect(Caesar.cipher("abc", 7)).toBe("hij");
    });

    test("returns an empty string when the text is empty", () => {
        expect(Caesar.cipher("", 3)).toBe("");
    });
});