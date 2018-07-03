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
    
    randomize(lower,upper) {
        return Math.floor((Math.random() * (upper - lower) + lower));
    }
    
    initialRandomize(){
        this.NAME="Adam";
        this.HP=this.randomize(0,100);
        this.MP=this.randomize(0,100);
        this.STR=this.randomize(0,100);
        this.INT=this.randomize(0,100);
        this.SAN=this.randomize(0,100);
        this.LUCK=this.randomize(0,100);
        this.CHARM=this.randomize(0,100);
        this.MUTABLE=0;
    }
    
    readData(inAdam){
        this.SAN=inAdam.SAN;
        
    }
    
    setMutable(mutable){
        if(mutable==0 || mutable==1){
            this.MUTABLE=mutable;
        }else{
            mutable=1;
        }
    }
    
}

var GenesisDB = function () {
    LocalContractStorage.defineProperties(this,{
                                          characterNo:null,
                                          callNo:null,
                                          version:null,
                                          number:null
                                          
                                          
                                          });
    
    LocalContractStorage.defineMapProperty(this, "GenesisCharacter");
};

GenesisDB.prototype = {
init: function () {
    this.characterNo= 3;
    this.callNo=0;
    this.version = 1;
    
    var Adam0 =new Adam();
    this.GenesisCharacter.set(0,Adam0);
    
    var Adam1 = new Adam();
    Adam1.setMutable(1);
    this.GenesisCharacter.set(1,Adam1);
    
    var Adam2 = new Adam();
    Adam1.setMutable(1);
    this.GenesisCharacter.set(2,Adam1);
    
    
    
    
},
    
    //拿General信息
getCharacter: function(id) {
    this.callNo++;
    return this.GenesisCharacter.get(id);
},
    
    
getCharacterNo:function(){
    return this.characterNo;
},
getCallNo:function(){
    return this.callNo;
},
    
    
    
    //拿Adam0不可改变，固定属性，故事的开始～
getAdam0: function() {
    this.callNo++;
    return this.GenesisCharacter.get(0);
},
getAdam1: function() {
    this.callNo++;
    return this.GenesisCharacter.get(1);
},
getAdam2: function() {
    this.callNo++;
    return this.GenesisCharacter.get(2);
},
    
    //随机一个Adam，所有属性在0-100之间随机
getAdamRandom:function(){
    var AdamRandom= new Adam();
    AdamRandom.initialRandomize();
    return AdamRandom;
},
    randomize(lower,upper) {
        return Math.floor((Math.random() * (upper - lower) + lower));
    },
    
Adam1Affected:function(flag){
    var AdamChanged= this.GenesisCharacter.get(1);
    if(flag==0){
        
        AdamChanged.HP=AdamChanged.HP-this.randomize(0,10);
        AdamChanged.MP=AdamChanged.MP-this.randomize(0,10);
        AdamChanged.STR=AdamChanged.STR-this.randomize(0,10);
        AdamChanged.INT=AdamChanged.INT-this.randomize(0,10);
        AdamChanged.SAN=AdamChanged.SAN-this.randomize(0,10);
        AdamChanged.LUCK=AdamChanged.LUCK-this.randomize(0,10);
        AdamChanged.CHARM=AdamChanged.CHARM-this.randomize(0,10);
        
    }else if(flag==1){
        AdamChanged.HP=AdamChanged.HP+this.randomize(0,10);
        AdamChanged.MP=AdamChanged.MP+this.randomize(0,10);
        AdamChanged.STR=AdamChanged.STR+this.randomize(0,10);
        AdamChanged.INT=AdamChanged.INT+this.randomize(0,10);
        AdamChanged.SAN=AdamChanged.SAN+this.randomize(0,10);
        AdamChanged.LUCK=AdamChanged.LUCK+this.randomize(0,10);
        AdamChanged.CHARM=AdamChanged.CHARM+this.randomize(0,10);
        
    }
    
    if(AdamChanged.HP<0){
        AdamChanged.HP=0;
    }
    if(AdamChanged.HP>100){
        AdamChanged.HP=100;
    }
    if(AdamChanged.MP<0){
        AdamChanged.MP=0;
    }
    if(AdamChanged.MP>100){
        AdamChanged.MP=100;
    }
    if(AdamChanged.STR<0){
        AdamChanged.STR=0;
    }
    if(AdamChanged.STR>100){
        AdamChanged.STR=100;
    }
    if(AdamChanged.INT<0){
        AdamChanged.INT=0;
    }
    if(AdamChanged.INT>100){
        AdamChanged.INT=100;
    }
    if(AdamChanged.SAN<0){
        AdamChanged.SAN=0;
    }
    if(AdamChanged.SAN>100){
        AdamChanged.SAN=100;
    }
    if(AdamChanged.LUCK<0){
        AdamChanged.LUCK=0;
    }
    if(AdamChanged.CHARM>100){
        AdamChanged.CHARM=100;
    }
    
    this.GenesisCharacter.set(1,AdamChanged);
    return this.GenesisCharacter.get(1);
},
    
Adam2Affected:function(HP,MP,STR,INT,SAN,LUCK,CHARM){
    var AdamChanged= this.GenesisCharacter.get(2);
    AdamChanged.HP=HP;
    AdamChanged.MP=MP;
    AdamChanged.STR=STR;
    AdamChanged.INT=INT;
    AdamChanged.SAN=SAN;
    AdamChanged.LUCK=LUCK;
    AdamChanged.CHARM=CHARM;
    
    if(AdamChanged.HP<0){
        AdamChanged.HP=0;
    }
    if(AdamChanged.HP>100){
        AdamChanged.HP=100;
    }
    if(AdamChanged.MP<0){
        AdamChanged.MP=0;
    }
    if(AdamChanged.MP>100){
        AdamChanged.MP=100;
    }
    if(AdamChanged.STR<0){
        AdamChanged.STR=0;
    }
    if(AdamChanged.STR>100){
        AdamChanged.STR=100;
    }
    if(AdamChanged.INT<0){
        AdamChanged.INT=0;
    }
    if(AdamChanged.INT>100){
        AdamChanged.INT=100;
    }
    if(AdamChanged.SAN<0){
        AdamChanged.SAN=0;
    }
    if(AdamChanged.SAN>100){
        AdamChanged.SAN=100;
    }
    if(AdamChanged.LUCK<0){
        AdamChanged.LUCK=0;
    }
    if(AdamChanged.CHARM>100){
        AdamChanged.CHARM=100;
    }
    
    this.GenesisCharacter.set(2,AdamChanged);
    return this.GenesisCharacter.get(2);
    
},
saveAdam:function(saveAdam){
    var AdamInsert= new Adam();
    
    if(this.checkLegal(saveAdam)){
        
        AdamInsert.Name=saveAdam.NAME;
        AdamInsert.HP=saveAdam.HP;
        AdamInsert.MP=saveAdam.MP;
        AdamInsert.STR=saveAdam.STR;
        AdamInsert.INT=saveAdam.INT;
        AdamInsert.SAN=saveAdam.SAN;
        AdamInsert.LUCK=saveAdam.LUCK;
        AdamInsert.CHARM=saveAdam.CHARM;
        AdamInsert.MUTABLE=saveAdam.MUTABLE;
        
        this.GenesisCharacter.set(this.characterNo,AdamInsert);
        this.characterNo++;
    }else{
        throw new Error("Data Error,Adam can only have stats between 0 - 100");
    }
    
    
    
},
    
checkLegal:function(saveAdam){
    
    if(saveAdam.HP<0 ||saveAdam.HP>100){
        return 0;
    }else if (saveAdam.MP<0 ||saveAdam.MP>100){
        return 0;
    }else if (saveAdam.STR<0 ||saveAdam.STR>100){
        return 0;
    }else if (saveAdam.INT<0 ||saveAdam.INT>100){
        return 0;
    }else if (saveAdam.SAN<0 ||saveAdam.SAN>100){
        return 0;
    }else if (saveAdam.LUCK<0 ||saveAdam.LUCK>100){
        return 0;
    }else if (saveAdam.CHARM<0 ||saveAdam.CHARM>100){
        return 0;
    }else if (saveAdam.MUTABLE!=0 ||saveAdam.MUTABLE !=1){
        return 0;
    }
    
    return 1;
}
    
};
module.exports = GenesisDB;
