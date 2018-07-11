"use strict";

/**
 * Version 1 Genesis contract. Please save another copy of your data locally during experiment.
 * we may update/transfer/cross chain in next version so please make a backup file.
 */
const VERSION = 1;

/**
 * IMMUTABLE means the character cannot be affected forever.
 * BINARY_MUTABLE means the character can be affected by affectCharacter function in the contract.
 * FULLY_MUTABLE means the character can be affected & setattributes in the contract.
 */
const MutabilityType = Object.freeze({
    IMMUTABLE: 0,
    BINARY_MUTABLE: 1,
    FULLY_MUTABLE: 2,
    MAX_TYPE_SYMBOL: 2
});

/**
 * Utility Methods
 */
function randomize(lower, upper) {
    return Math.floor((Math.random() * (upper - lower) + lower));
}

function checkIntAndRound(lower, upper, numberToCheck) {
    if (isNaN(numberToCheck)) {
        throw Error(numberToCheck + " is not a number");
    }

    const parsedInt = parseInt(numberToCheck);
    if (parsedInt < lower) {
        return lower;
    }
    if (parsedInt > upper) {
        return upper;
    }
    return parsedInt;
}

function parseBoolean (string) {
    let bool;
    bool = (function() {
        switch (false) {
            case string.toLowerCase() !== 'true':
                return true;
            case string.toLowerCase() !== 'false':
                return false;
        }
    })();
    if (typeof bool === "boolean") {
        return bool;
    }
    throw Error(string + " is not a boolean");
}

/**
 * Character constructor
 * @param name: character name
 * @param mutabilityType: if the effect is positive or negative
 *
 */
class Character {

    constructor(name, mutabilityType) {
        this.name = name;
        this.hp = 100;
        this.mp = 100;
        this.str = 50;
        this.int = 50;
        this.san = 50;
        this.luck = 50;
        this.charm = 50;
        //mutabilityType is an immutable attribute which is set only once at construction
        this.mutabilityType = mutabilityType;
        this.optionalAttr = {};
    }

    initialRandomize() {
        this.name = "Adam";
        this.hp = randomize(0, 100);
        this.mp = randomize(0, 100);
        this.str = randomize(0, 100);
        this.int = randomize(0, 100);
        this.san = randomize(0, 100);
        this.luck = randomize(0, 100);
        this.charm = randomize(0, 100);
        this.mutabilityType = MutabilityType.FULLY_MUTABLE;
    }

    serialize() {
        return JSON.stringify(this);
    }
}

const GenesisDB = function () {
    LocalContractStorage.defineProperties(this, {
        characterNo: null,
        callNo: null,
        version: null
    });

    LocalContractStorage.defineMapProperty(this, "GenesisCharacter");
};

GenesisDB.prototype = {

    init: function () {
        this.characterNo = 3;
        this.callNo = 0;
        this.version = VERSION;

        //Create an immutable adam0
        const adam0 = new Character("Adam0", MutabilityType.IMMUTABLE);
        this.GenesisCharacter.set(0, adam0);

        //Create a mutable adam1
        const adam1 = new Character("Adam1", MutabilityType.BINARY_MUTABLE);
        this.GenesisCharacter.set(1, adam1);

        //Create a mutable adam2
        const adam2 = new Character("Adam2", MutabilityType.FULLY_MUTABLE);
        this.GenesisCharacter.set(2, adam2);
    },

    // Get version of the contract.
    getVersion: function () {
        return this.version;
    },

    //拿General信息
    getCharacter: function (id) {
        this.callNo++;
        return this.GenesisCharacter.get(id);
    },

    //Range Query
    getCharacterRange(start, end) {
        const selected = [];
        let left = Math.max(0, start);
        let right = Math.min(end, this.characterNo - 1);
        for (let i = left; i < right + 1; i++) {
            selected.push(this.GenesisCharacter.get(i));
        }
        return selected;
    },

    getCharacterNo: function () {
        return this.characterNo;
    },

    getCallNo: function () {
        return this.callNo;
    },

    /**
     * getAdam0
     * get Adam0 directly.
     * try this method when you first join Genesis
     */
    getAdam0: function () {
        this.callNo++;
        return this.GenesisCharacter.get(0);
    },

    /**
     * getAdam1
     * get Adam1 directly.
     */
    getAdam1: function () {
        this.callNo++;
        return this.GenesisCharacter.get(1);
    },

    /**
     * getAdam2
     * get Adam2 directly.
     */
    getAdam2: function () {
        this.callNo++;
        return this.GenesisCharacter.get(2);
    },

    //随机一个Adam并以string形式返回，所有属性在0-100之间随机
    /**
     * getCharacterRandom
     * get a random Adam and return.
     * all stats between 0-100.
     */
    getCharacterRandom: function () {
        const characterRandom = new Character();
        characterRandom.initialRandomize();
        return characterRandom;
    },

    /**
     * getCharacterRandom
     * get a random Adam and return as a string.
     * all stats between 0-100.
     */
    getCharacterRandomStrFormat: function () {
        const characterRandom = new Character();
        characterRandom.initialRandomize()
        characterRandom.optionalAttr['dummy1'] = 'dummy1';
        characterRandom.optionalAttr['dummy2'] = 'dummy2';
        return characterRandom.serialize();
    },

    /**
     * Do a positive or negative effect to the character with given Id
     * @param id: character id
     * @param isPositiveEffect: if the effect is positive or negative
     * @returns {*}
     */
    affectCharacter: function (id, isPositiveEffect) {
        const character = this.GenesisCharacter.get(id);
        if (character.mutabilityType === MutabilityType.IMMUTABLE) {
            throw new Error("character " + id + " is immutable.");
        }

        if (parseBoolean(isPositiveEffect)) {
            character.hp = checkIntAndRound(0, 100, character.hp + randomize(0, 10));
            character.mp = checkIntAndRound(0, 100, character.mp + randomize(0, 10));
            character.str = checkIntAndRound(0, 100, character.str + randomize(0, 10));
            character.int = checkIntAndRound(0, 100, character.int + randomize(0, 10));
            character.san = checkIntAndRound(0, 100, character.san + randomize(0, 10));
            character.luck = checkIntAndRound(0, 100, character.luck + randomize(0, 10));
            character.charm = checkIntAndRound(0, 100, character.charm + randomize(0, 10));
        } else {
            character.hp = checkIntAndRound(0, 100, character.hp - randomize(0, 10));
            character.mp = checkIntAndRound(0, 100, character.mp - randomize(0, 10));
            character.str = checkIntAndRound(0, 100, character.str - randomize(0, 10));
            character.int = checkIntAndRound(0, 100, character.int - randomize(0, 10));
            character.san = checkIntAndRound(0, 100, character.san - randomize(0, 10));
            character.luck = checkIntAndRound(0, 100, character.luck - randomize(0, 10));
            character.charm = checkIntAndRound(0, 100, character.charm - randomize(0, 10));
        }

        this.GenesisCharacter.set(id, character);
        return this.GenesisCharacter.get(id);
    },

    /**
     * Set character attributes directly
     * @param id: character id
     * @param hp: character hp
     * @param mp: character mp
     * @param str: character str
     * @param int: character int
     * @param san: character san
     * @param luck: character luck
     * @param charm: character charm
     *
     * @returns {*}
     */
    setCharacterAttributes: function (id, hp, mp, str, int, san, luck, charm) {
        const character = this.GenesisCharacter.get(id);
        if (character.mutabilityType !== MutabilityType.FULLY_MUTABLE) {
            throw new Error("Character " + id + " needs to be FULLY_MUTABLE.");
        }

        character.hp = checkIntAndRound(0, 100, hp);
        character.mp = checkIntAndRound(0, 100, mp);
        character.str = checkIntAndRound(0, 100, str);
        character.int = checkIntAndRound(0, 100, int);
        character.san = checkIntAndRound(0, 100, san);
        character.luck = checkIntAndRound(0, 100, luck);
        character.charm = checkIntAndRound(0, 100, charm);

        this.GenesisCharacter.set(id, character);
        return this.GenesisCharacter.get(id);
    },

    setOptionalAttribute: function (id, optAttrKey, optAttrValue) {
        const character = this.GenesisCharacter.get(id);
        if (character.mutabilityType !== MutabilityType.FULLY_MUTABLE) {
            throw new Error("Character " + id + " needs to be FULLY_MUTABLE.");
        }

        character.optionalAttr[optAttrKey] = optAttrValue;
        this.GenesisCharacter.set(id, character);
    },

    /**
     * Insert Character
     * @param jsonStr: new character json
     * check demo1 examples to get a quick start
     *
     * @returns {*}
     */
    insertCharacter: function (jsonStr) {
        let characterJson;
        try {
            let replaced = jsonStr.substr(0, jsonStr.lastIndexOf("}") + 1);
            replaced = replaced.replace(/^.+?{/,'{').replace(/\\/g, '').replace(/(")+/g, '\"');
            characterJson = JSON.parse(replaced);
        } catch (err) {
            throw new Error("Errored when deserialize JSON: " + err);
        }

        const characterToInsert = new Character(characterJson.name,
            checkIntAndRound(0, MutabilityType.MAX_TYPE_SYMBOL, characterJson.mutabilityType));

        characterToInsert.hp = checkIntAndRound(0, 100, characterJson.hp);
        characterToInsert.mp = checkIntAndRound(0, 100, characterJson.mp);
        characterToInsert.str = checkIntAndRound(0, 100, characterJson.str);
        characterToInsert.int = checkIntAndRound(0, 100, characterJson.int);
        characterToInsert.san = checkIntAndRound(0, 100, characterJson.san);
        characterToInsert.luck = checkIntAndRound(0, 100, characterJson.luck);
        characterToInsert.charm = checkIntAndRound(0, 100, characterJson.charm);
        characterToInsert.optionalAttr = characterJson.optionalAttr;

        if (this.checkLegal(characterToInsert)) {
            this.GenesisCharacter.set(this.characterNo, characterToInsert);
            this.characterNo++;
        } else {
            throw new Error("Data Error, character can only have stats between 0 - 100");
        }
    },

    checkLegal: function (characterToInsert) {

        if (characterToInsert.hp < 0 || characterToInsert.hp > 100) {
            return false;
        } else if (characterToInsert.mp < 0 || characterToInsert.mp > 100) {
            return false;
        } else if (characterToInsert.str < 0 || characterToInsert.str > 100) {
            return false;
        } else if (characterToInsert.int < 0 || characterToInsert.int > 100) {
            return false;
        } else if (characterToInsert.san < 0 || characterToInsert.san > 100) {
            return false;
        } else if (characterToInsert.luck < 0 || characterToInsert.luck > 100) {
            return false;
        } else if (characterToInsert.charm < 0 || characterToInsert.charm > 100) {
            return false;
        } else if (characterToInsert.mutabilityType < 0 || characterToInsert.mutabilityType > MutabilityType.MAX_TYPE_SYMBOL) {
            return false;
        }

        return true;
    }
};

module.exports = GenesisDB;
