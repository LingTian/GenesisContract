"use strict";

const MutabilityType = Object.freeze({
    IMMUTABLE: 0,
    BINARY_MUTABLE: 1,
    FULLY_MUTABLE: 2,
    TYPE_RANGE: 2
});

// Util methods
function randomize(lower, upper) {
    return Math.floor((Math.random() * (upper - lower) + lower));
}

function checkNumberAndRound(lower, upper, numberToCheck) {
    if (isNaN(numberToCheck)) {
        throw Error(numberToCheck + "is not a number");
    }
    if (numberToCheck < lower) {
        return lower;
    }
    if (numberToCheck > upper) {
        return upper;
    }
    return numberToCheck;
}

class Adam {

    constructor(name, mutabilityType) {
        this.name = name;
        this.hp = 100;
        this.mp = 100;
        this.str = 50;
        this.int = 50;
        this.san = 50;
        this.luck = 50;
        this.charm = 50;
        this.mutabilityType = mutabilityType;
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
        this.mutabilityType = false;
    }

    serialize() {
        return JSON.stringify(this);
    }
}

const GenesisDB = function () {
    LocalContractStorage.defineProperties(this, {
        characterNo: null,
        callNo: null,
        number: null,
        version: null
    });

    LocalContractStorage.defineMapProperty(this, "GenesisCharacter");
};

GenesisDB.prototype = {

    init: function () {
        this.characterNo = 3;
        this.callNo = 0;
        this.version = 1;

        //Create an immutable adam0
        const adam0 = new Adam("Adam0", MutabilityType.IMMUTABLE);
        this.GenesisCharacter.set(0, adam0);

        //Create a mutable adam1
        const adam1 = new Adam("Adam1", MutabilityType.BINARY_MUTABLE);
        this.GenesisCharacter.set(1, adam1);

        //Create a mutable adam2
        const adam2 = new Adam("Adam2", MutabilityType.FULLY_MUTABLE);
        this.GenesisCharacter.set(2, adam2);
    },

    //拿General信息
    getCharacter: function (id) {
        this.callNo++;
        return this.GenesisCharacter.get(id);
    },

    getCharacterNo: function () {
        return this.characterNo;
    },

    getCallNo: function () {
        return this.callNo;
    },

    //拿Adam0不可改变，固定属性，故事的开始～
    getAdam0: function () {
        this.callNo++;
        return this.GenesisCharacter.get(0);
    },

    getAdam1: function () {
        this.callNo++;
        return this.GenesisCharacter.get(1);
    },

    getAdam2: function () {
        this.callNo++;
        return this.GenesisCharacter.get(2);
    },

    //随机一个Adam并以string形式返回，所有属性在0-100之间随机
    getAdamRandom: function () {
        const adamRandom = new Adam();
        adamRandom.initialRandomize();
        return adamRandom;
    },

    //随机一个Adam，所有属性在0-100之间随机
    getAdamRandomStrFormat: function () {
        const adamRandom = new Adam();
        adamRandom.initialRandomize();
        return adamRandom.serialize();
    },

    /**
     * Do a positive or negative effect to the adam with given Id
     * @param id: adam id
     * @param isPositiveEffect: if the effect is positive or negative
     * @returns {*}
     */
    affectAdam: function (id, isPositiveEffect) {
        const adam = this.GenesisCharacter.get(id);
        if (adam.mutabilityType === MutabilityType.IMMUTABLE) {
            throw new Error("Adam " + id + " is immutable.");
        }
        if (isPositiveEffect) {
            adam.hp = checkNumberAndRound(0, 100, adam.hp + randomize(0, 10));
            adam.mp = checkNumberAndRound(0, 100, adam.mp + randomize(0, 10));
            adam.str = checkNumberAndRound(0, 100, adam.str + randomize(0, 10));
            adam.int = checkNumberAndRound(0, 100, adam.int + randomize(0, 10));
            adam.san = checkNumberAndRound(0, 100, adam.san + randomize(0, 10));
            adam.luck = checkNumberAndRound(0, 100, adam.luck + randomize(0, 10));
            adam.charm = checkNumberAndRound(0, 100, adam.charm + randomize(0, 10));
        } else {
            adam.hp = checkNumberAndRound(0, 100, adam.hp - randomize(0, 10));
            adam.mp = checkNumberAndRound(0, 100, adam.mp - randomize(0, 10));
            adam.str = checkNumberAndRound(0, 100, adam.str - randomize(0, 10));
            adam.int = checkNumberAndRound(0, 100, adam.int - randomize(0, 10));
            adam.san = checkNumberAndRound(0, 100, adam.san - randomize(0, 10));
            adam.luck = checkNumberAndRound(0, 100, adam.luck - randomize(0, 10));
            adam.charm = checkNumberAndRound(0, 100, adam.charm - randomize(0, 10));
        }

        this.GenesisCharacter.set(id, adam);
        return this.GenesisCharacter.get(id);
    },

    setAdamAttributes: function (id, hp, mp, str, int, san, luck, charm) {
        const adam = this.GenesisCharacter.get(id);
        if (adam.mutabilityType === MutabilityType.IMMUTABLE) {
            throw new Error("Adam " + id + " is immutable.");
        }

        adam.hp = checkNumberAndRound(0, 100, hp);
        adam.mp = checkNumberAndRound(0, 100, mp);
        adam.str = checkNumberAndRound(0, 100, str);
        adam.int = checkNumberAndRound(0, 100, int);
        adam.san = checkNumberAndRound(0, 100, san);
        adam.luck = checkNumberAndRound(0, 100, luck);
        adam.charm = checkNumberAndRound(0, 100, charm);

        this.GenesisCharacter.set(id, adam);
        return this.GenesisCharacter.get(id);
    },

    saveAdam: function (jsonStr) {
        let adamJson;
        try {
            let replaced = jsonStr.substr(0, jsonStr.lastIndexOf("}") + 1);
            replaced = replaced.replace(/^.+?{/,'{').replace(/\\/g, '').replace(/(")+/g, '\"');
            adamJson = JSON.parse(replaced);
        } catch (err) {
            throw new Error("Errored when deserialize JSON: " + err.message);
        }
        const adamToInsert = new Adam();

        if (this.checkLegal(adamJson)) {
            adamToInsert.name = adamJson.name;
            adamToInsert.hp = checkNumberAndRound(0, 100, adamJson.hp);
            adamToInsert.mp = checkNumberAndRound(0, 100, adamJson.mp);
            adamToInsert.str = checkNumberAndRound(0, 100, adamJson.str);
            adamToInsert.int = checkNumberAndRound(0, 100, adamJson.int);
            adamToInsert.san = checkNumberAndRound(0, 100, adamJson.san);
            adamToInsert.luck = checkNumberAndRound(0, 100, adamJson.luck);
            adamToInsert.charm = checkNumberAndRound(0, 100, adamJson.charm);
            adamToInsert.mutabilityType = adamJson.mutabilityType;

            this.GenesisCharacter.set(this.characterNo, adamToInsert);
            this.characterNo++;
        } else {
            throw new Error("Data Error, Adam can only have stats between 0 - 100");
        }
    },

    checkLegal: function (adamToSave) {

        if (adamToSave.hp < 0 || adamToSave.hp > 100) {
            return false;
        } else if (adamToSave.mp < 0 || adamToSave.mp > 100) {
            return false;
        } else if (adamToSave.str < 0 || adamToSave.str > 100) {
            return false;
        } else if (adamToSave.int < 0 || adamToSave.int > 100) {
            return false;
        } else if (adamToSave.san < 0 || adamToSave.san > 100) {
            return false;
        } else if (adamToSave.luck < 0 || adamToSave.luck > 100) {
            return false;
        } else if (adamToSave.charm < 0 || adamToSave.charm > 100) {
            return false;
        } else if (adamToSave.mutabilityType < 0 || adamToSave.mutabilityType > MutabilityType.TYPE_RANGE) {
            return false;
        }

        return true;
    }
};

module.exports = GenesisDB;
