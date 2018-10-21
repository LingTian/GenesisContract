pragma solidity ^0.4.23;

/*
Name: Genesis
Dev: White Matrix co,. Ltd
*/

contract GenesisLite {
    //mutabilityType
    //Genesis parameter
    uint public characterNo = 3;
    uint public version = 1;

    struct Character {
        string name;
        uint hp;
        uint mp;
        uint str;
        uint intelli;
        uint san;
        uint luck;
        uint mt;
        string optionalAttrs;
    }

    Character[] characters;

    constructor() public {
        characters.push(Character("Adam0", 100, 100, 50, 50, 50, 50, 0, ""));
        characters.push(Character("Adam1", 100, 100, 50, 50, 50, 50, 1, ""));
        characters.push(Character("Adam2", 100, 100, 50, 50, 50, 50, 2, ""));
    }

    function getCharacterNo() public view returns (uint _characterNo){
        return characterNo;
    }

    function insertCharacter(string _name, uint _hp, uint _mp, uint _str, uint _intelli, uint _san, uint _luck, uint _mt, string _optionalAttrs) public returns (uint){
        require(checkLegal(_hp, _mp, _str, _intelli, _san, _luck, _mt) == 1);
        //需要check合法性
        characterNo++;
        characters.push(Character(_name, _hp, _mp, _str, _intelli, _san, _luck, _mt, _optionalAttrs));

        return characterNo;
    }

    function setCharacterAttributes(uint _id, uint _hp, uint _mp, uint _str, uint _intelli, uint _san, uint _luck, string _optionalAttrs) public {
        //require check
        require(characters[_id].mt == 2);
        require(checkLegal(_hp, _mp, _str, _intelli, _san, _luck, 2) == 1);

        //read directly from mem
        Character storage affectedCharacter = characters[_id];

        affectedCharacter.hp = _hp;
        affectedCharacter.mp = _mp;
        affectedCharacter.str = _str;
        affectedCharacter.intelli = _intelli;
        affectedCharacter.san = _san;
        affectedCharacter.luck = _luck;
        affectedCharacter.optionalAttrs = _optionalAttrs;

        characters[_id] = affectedCharacter;
    }

    function checkLegal(uint _hp, uint _mp, uint _str, uint _intelli, uint _san, uint _luck, uint _mt) internal pure returns (uint _checkresult){
        if ((_hp < 0) || (_hp > 9999)) {
            return 0;
        } else if ((_mp < 0) || (_mp > 9999)) {
            return 0;
        } else if ((_str < 0) || (_str > 9999)) {
            return 0;
        } else if ((_intelli < 0) || (_intelli > 9999)) {
            return 0;
        } else if ((_san < 0) || (_san > 9999)) {
            return 0;
        } else if ((_luck < 0) || (_luck > 9999)) {
            return 0;
        } else if ((_mt < 0) || (_mt > 2)) {
            return 0;
        }
        return 1;
    }

    // This function will return all of the details of the characters
    function getCharacterDetails(uint _characterId) public view returns (
        string _name,
        uint _hp,
        uint _mp,
        uint _str,
        uint _int,
        uint _san,
        uint _luck,
        uint _mt,
        string _optionalAttrs
    ) {

        Character storage _characterInfo = characters[_characterId];

        _name = _characterInfo.name;
        _hp = _characterInfo.hp;
        _mp = _characterInfo.mp;
        _str = _characterInfo.str;
        _int = _characterInfo.intelli;
        _san = _characterInfo.san;
        _luck = _characterInfo.luck;
        _mt = _characterInfo.mt;
        _optionalAttrs = _characterInfo.optionalAttrs;
    }
}