"use strict";

// Util method
function randomize(lower, upper) {
    return Math.floor((Math.random() * (upper - lower) + lower));
}

class Adam {

    constructor(name, isMutable) {
        this.name = name;
        this.hp = 100;
        this.mp = 100;
        this.str = 50;
        this.int = 50;
        this.san = 50;
        this.luck = 50;
        this.charm = 50;
        this.isMutable = isMutable;
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
        this.isMutable = false;
    }

    readData(inAdam) {
        this.san = inAdam.san;
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
        const Adam0 = new Adam("Adam0", false);
        this.GenesisCharacter.set(0, Adam0);

        //Create a mutable adam1
        const Adam1 = new Adam("Adam1", true);
        this.GenesisCharacter.set(1, Adam1);

        //Create a mutable adam2
        const Adam2 = new Adam("Adam2", true);
        this.GenesisCharacter.set(2, Adam2);
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

    //随机一个Adam，所有属性在0-100之间随机
    getAdamRandom: function () {
        const AdamRandom = new Adam();
        AdamRandom.initialRandomize();
        return AdamRandom;
    },

    randomize(lower, upper) {
        return Math.floor((Math.random() * (upper - lower) + lower));
    },

    /**
     * Do a positive or negative effect to the adam with given Id
     * @param id: adam id
     * @param isPositiveEffect: if the effect is positive or negative
     * @returns {*}
     */
    affectAdam: function (id, isPositiveEffect) {
        const adam = this.GenesisCharacter.get(id);
        if (!adam.isMutable) {
            throw new Error("Adam " + id + " is immutable.");
        }
        if (isPositiveEffect) {
            adam.hp = adam.hp + randomize(0, 10);
            adam.mp = adam.mp + randomize(0, 10);
            adam.str = adam.str + randomize(0, 10);
            adam.int = adam.int + randomize(0, 10);
            adam.san = adam.san + randomize(0, 10);
            adam.luck = adam.luck + randomize(0, 10);
            adam.charm = adam.charm + randomize(0, 10);
        } else {
            adam.hp = adam.hp + randomize(0, 10);
            adam.mp = adam.mp + randomize(0, 10);
            adam.str = adam.str + randomize(0, 10);
            adam.int = adam.int + randomize(0, 10);
            adam.san = adam.san + randomize(0, 10);
            adam.luck = adam.luck + randomize(0, 10);
            adam.charm = adam.charm + randomize(0, 10);
        }

        if (adam.hp < 0) {
            adam.hp = 0;
        }
        if (adam.hp > 100) {
            adam.hp = 100;
        }
        if (adam.mp < 0) {
            adam.mp = 0;
        }
        if (adam.mp > 100) {
            adam.mp = 100;
        }
        if (adam.str < 0) {
            adam.str = 0;
        }
        if (adam.str > 100) {
            adam.str = 100;
        }
        if (adam.int < 0) {
            adam.int = 0;
        }
        if (adam.int > 100) {
            adam.int = 100;
        }
        if (adam.san < 0) {
            adam.san = 0;
        }
        if (adam.san > 100) {
            adam.san = 100;
        }
        if (adam.luck < 0) {
            adam.luck = 0;
        }
        if (adam.charm > 100) {
            adam.charm = 100;
        }

        this.GenesisCharacter.set(id, adam);
        return this.GenesisCharacter.get(id);
    },

    setAdamAttributes: function (id, hp, mp, str, int, san, luck, charm) {
        const adam = this.GenesisCharacter.get(id);
        if (!adam.isMutable) {
            throw new Error("Adam " + id + " is immutable.");
        }
        adam.hp = hp;
        adam.mp = mp;
        adam.str = str;
        adam.int = int;
        adam.san = san;
        adam.luck = luck;
        adam.charm = charm;

        if (adam.hp < 0) {
            adam.hp = 0;
        }
        if (adam.hp > 100) {
            adam.hp = 100;
        }
        if (adam.mp < 0) {
            adam.mp = 0;
        }
        if (adam.mp > 100) {
            adam.mp = 100;
        }
        if (adam.str < 0) {
            adam.str = 0;
        }
        if (adam.str > 100) {
            adam.str = 100;
        }
        if (adam.int < 0) {
            adam.int = 0;
        }
        if (adam.int > 100) {
            adam.int = 100;
        }
        if (adam.san < 0) {
            adam.san = 0;
        }
        if (adam.san > 100) {
            adam.san = 100;
        }
        if (adam.luck < 0) {
            adam.luck = 0;
        }
        if (adam.charm > 100) {
            adam.charm = 100;
        }

        this.GenesisCharacter.set(id, adam);
        return this.GenesisCharacter.get(id);
    },

    saveAdam: function (saveAdam) {
        const AdamInsert = new Adam();

        if (this.checkLegal(saveAdam)) {
            AdamInsert.name = saveAdam.name;
            AdamInsert.hp = saveAdam.hp;
            AdamInsert.mp = saveAdam.mp;
            AdamInsert.str = saveAdam.str;
            AdamInsert.int = saveAdam.int;
            AdamInsert.san = saveAdam.san;
            AdamInsert.luck = saveAdam.luck;
            AdamInsert.charm = saveAdam.charm;
            AdamInsert.isMutable = saveAdam.isMutable;

            this.GenesisCharacter.set(this.characterNo, AdamInsert);
            this.characterNo++;
        } else {
            throw new Error("Data Error,Adam can only have stats between 0 - 100");
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
        } else if (typeof(adamToSave.isMutable) === "boolean") {
            return false;
        }

        return 1;
    }
};

module.exports = GenesisDB;
