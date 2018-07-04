"use strict";

class Adam{

    constructor(){
        this.NAME="Adam";
        this.HP=100;
        this.MP=100;
        this.STR=50;
        this.INT=50;
        this.SAN=50;
        this.LUCK=50;
        this.CHARM=50;
        this.MUTABLE=0;
    }
    
    random(){
        
    }
    
}

var GenesisDB = function () {
    LocalContractStorage.defineProperties(this,{
                                          characterNo:null,
                                          callNo:null,
                                          version:null,
                                          number:null,
                                          m:null,
                                          
                                          });
    
    LocalContractStorage.defineMapProperty(this, "GenesisCharacter");
};

GenesisDB.prototype = {
init: function () {
    this.characterNo= 0;
    this.callNo=0;
    this.version = 1;
    
    var Adam0 =new Adam();
    this.genestat.set(0,Adam0);
    
    
},
    
    //view 拿信息
getCharacter: function(id) {
    this.callNo++;
    return this.GenesisCharacter.get(id);
},
    
getAdam0: function() {
    this.callNo++;
    return this.GenesisCharacter.get(0);
},
getCharacterNo:function(){
    return this.characterNo;
},
getCallNo:function(){
    return this.callNo;
}
    
    
    
};
module.exports = GenesisDB;
