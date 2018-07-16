# Project: Genesis
### About
Project Genesis is a project which get innovations from blockchains. In blockchain we enjoy to design consensus, anonymous & decentralized projects. Base on this idea I start this project Genesis. It first start from a transparent smartcontract base on Nebulas. In the contract, every developer can use Adam (maybe the first man into Oasis XD) freely, Different developer may use Adam innovatively in any posistion. Such as in one game Adam is a RPG main character, while in the other Adam is the final Boss. It is much more easier for DApp developers to have consensus on 1 character than design a brand new game base on others smart contract. This is also meaningful beacause if 1 game contain Adam is hot, the fans may want to checkout other game contain Adam. Adam doesn't belong to anyone or any organization, I do not have any owner/priority in Genesis Contract. So, it is a real "blockchain" style project and we can make Adam present in millions games. It is really an excited project and I you enjoy it. If you are interested, please use Adam in your games and let the world see what we can do in blockchain!
### How to use it
**Contract Address: n1r59HEWHF3bLudBZnpdhhxrdkKNGz1nBKb**

The first contract is base on Nebulas. 
Everyone can use Adam easily.

If you want to use an original Adam, you can just call getAdam0 on the Contract.

It is immutable and you can apply Adam into any positions in your game.

So what if I want to do more things with Adam? Check Adam info in details!
### Adam

* Original Adam

```javascript
getAdam0();
```

* Randomize Adam

```javascript
getCharacterRandom();
```

Adam have name,hp,mp,str,int,san,luck,charm and isMutable. getAdam0 will return Adam with initial stat and get AdamRandom will return Adam with 0-100 random stat on each attribute.

* Adam1

```javascript
getAdam1();
affectCharacter(id,isPositiveEffect);
```

Adam1 is a mutable Adam. Each developer can give positive/negative effect on Adam1. It is designed becasue in some non-RPG game developers may want to use it easily. They can use Adam in such a way if Adam died, it will have negative effect and if Adam wins, it will have positive effect. If Adam1 is a main character in the running game and he always dies, then it may decrease the stats of another Adam in an RPG game as a BOSS. So, to balance the game each developer can use scale on Adam1. It will provide more random and interesting effects hiddenly in different games.

* Adam2

```javascript
getAdam2();
affectCharacter(id,isPositiveEffect);
setCharacterAttributes(id, hp, mp, str, int, san, luck, charm);
```

You can set direct data on Adam2 and I think you are much more familiar with Adam now.

* AdamX
```javascript
insertCharacter(jsonStr);
```

You can also customize new Adams with new stats, new consensus mechanism. Let's start Genesis! 

### Collaborator

My name is Ling, I am a DApp developer. My friend Shuyi and I first implement this idea and build the first Genesis contract. It is an open source project and anyone can use it freely!

If you would like to be a collaborator, please send me a email to danjinxiangsi@gmail.com
