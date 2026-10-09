"use strict";

class Caesar {
    static #englishABC = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
    ];
    static #spanishABC = Caesar.#englishABC.toSpliced(Caesar.#englishABC.indexOf("n") + 1, 0, "ñ");
    static #encryptMode = true;
    static #useEnglishVocab = true;
    static #minValue = 3;
    static #maxValue = 7;

    static getABC() {
        return Caesar.#useEnglishVocab ? Caesar.#englishABC : Caesar.#spanishABC;
    }

    static setEncryptMode() {
        Caesar.#encryptMode = true;
    }

    static setDecryptMode() {
        Caesar.#encryptMode = false;
    }

    static setEnglishVocabulary() {
        Caesar.#useEnglishVocab = true;
    }

    static setSpanishVocabulary() {
        Caesar.#useEnglishVocab = false;
    }

    /**
     * 
     * @param {string} text 
     * @param {number} shift 
     * @returns Text encrypted or decrypted.
     */
    static cipher(text, shift) {
        if (shift > Caesar.#maxValue || shift < Caesar.#minValue) {
            return "";
        }

        const abc = Caesar.getABC();
        const n = abc.length;
        const direction = Caesar.#encryptMode ? 1 : -1;
        const k = (((shift * direction) % n) + n) % n;

        return [...text]
            .map((ch) => {
                const lower = ch.toLowerCase();
                const index = abc.indexOf(lower);
                if (index === -1) return ch;
                const newIndex = (index + k) % n;
                const mapped = abc[newIndex];
                return ch === lower ? mapped : mapped.toUpperCase();
            })
            .join("");
    }
}

export { Caesar };