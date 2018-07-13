pragma solidity ^0.4.19;
/*
Name: Genesis
Dev: White Matrix co,. Ltd
*/

library SafeMath {

/**
* @dev Multiplies two numbers, throws on overflow.
*/
function mul(uint256 a, uint256 b) internal pure returns (uint256) {
if (a == 0) {
return 0;
}
uint256 c = a * b;
assert(c / a == b);
return c;
}

/**
* @dev Integer division of two numbers, truncating the quotient.
*/
function div(uint256 a, uint256 b) internal pure returns (uint256) {
// assert(b > 0); // Solidity automatically throws when dividing by 0
uint256 c = a / b;
// assert(a == b * c + a % b); // There is no case in which this doesn't hold
return c;
}

/**
* @dev Substracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
*/
function sub(uint256 a, uint256 b) internal pure returns (uint256) {
assert(b <= a);
return a - b;
}

/**
* @dev Adds two numbers, throws on overflow.
*/
function add(uint256 a, uint256 b) internal pure returns (uint256) {
uint256 c = a + b;
assert(c >= a);
return c;
}
}


contract Genesis {
using SafeMath for uint256;
//mutabilityType


//Genesis parameter
uint public characterNo=3;
uint public callno=0;
uint public version=1;


struct Character{
string name;
uint hp;
uint mp;
uint str;
uint inteli;
uint san;
uint luck;
uint charm;
uint mt;


}
Character[] characters;

function Genesis() public{


characters.push(Character("Adam0",100,100,50,50,50,50,50,0));
characters.push(Character("Adam1",100,100,50,50,50,50,50,1));
characters.push(Character("Adam2",100,100,50,50,50,50,50,2));


}

function getCharacterNo() view returns(uint _characterNo){
return characterNo;
}

function getCallNo() view returns(uint _callno){
return callno;
}

function setCharacterAttributes(uint _id, uint _hp, uint _mp, uint _str, uint _inteli, uint _san, uint _luck, uint _charm){
string name = characters[_id].name;
uint unChangedmt=characters[_id].mt;

characters[_id]=Character(name, _hp, _mp, _str, _inteli, _san, _luck, _charm, unChangedmt);

}

function insertCharacter(string _name, uint _hp, uint _mp, uint _str, uint _inteli, uint _san, uint _luck, uint _charm, uint _mt) returns (uint _id){

//需要check合法性
characterNo++;
characters.push(Character(_name, _hp, _mp, _str, _inteli, _san, _luck, _charm, _mt));

return characterNo;

}

// This function will return all of the details of the pokemons
function getCharacterDetails(uint _characterId) public view returns (
string _name,
uint _hp,
uint _mp,
uint _str,
uint _int,
uint _san,
uint _luck,
uint _charm,
uint _mt
) {
callno++;
Character storage _characterinfo = characters[_characterId];

_name = _characterinfo.name;
_hp = _characterinfo.hp;
_mp = _characterinfo.mp;
_str = _characterinfo.str;
_int = _characterinfo.inteli;
_san = _characterinfo.san;
_luck = _characterinfo.luck;
_charm = _characterinfo.charm;
_mt = _characterinfo.mt;

}

}
