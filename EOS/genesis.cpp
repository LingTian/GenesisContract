/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <genesis.hpp>

using namespace eosio;

template <class It>
void printItems(It from, It to) {
    for (; from != to; ++from)
        print(*from);
}

void genesis::init() {
    auto char_itr = characters.begin();
    eosio_assert( char_itr == characters.end(), "Please don't init twice.");
    if( char_itr == characters.end() ) {
        // 创建一个Adam0
        characters.emplace(_self, [&](auto& new_character) {
            new_character.id = characters.available_primary_key();
            new_character.name = "Adam0";
            new_character.hp = 100;
            new_character.mp = 100;
            new_character.str = 50;
            new_character.inteli = 50;
            new_character.san = 50;
            new_character.luck = 50;
            new_character.charm = 50;
            new_character.mt = 0;
        });
        //创建一个Adam1
        characters.emplace(_self, [&](auto& new_character) {
            new_character.id = characters.available_primary_key();
            new_character.name = "Adam1";
            new_character.hp = 100;
            new_character.mp = 100;
            new_character.str = 50;
            new_character.inteli = 50;
            new_character.san = 50;
            new_character.luck = 50;
            new_character.charm = 50;
            new_character.mt = 1;
        });
        // 创建一个Adam2
        characters.emplace(_self, [&](auto& new_character) {
            new_character.id = characters.available_primary_key();
            new_character.name = "Adam2";
            new_character.hp = 100;
            new_character.mp = 100;
            new_character.str = 50;
            new_character.inteli = 50;
            new_character.san = 50;
            new_character.luck = 50;
            new_character.charm = 50;
            new_character.mt = 2;
        });
    }

    auto global_itr = globals.begin();
    if(global_itr == globals.end()) {
        globals.emplace(_self, [&](auto& gitr){
            gitr.characterNo = 3;
            gitr.callNo = 0;
        });
    }
}
void genesis::newcharacter(string name) {
    print("newCharacter:", name);
    auto characters_itr = characters.emplace(_self, [ & ](auto & new_character) {
        new_character.id = characters.available_primary_key();
        new_character.name = name;
        new_character.hp = 100;
        new_character.mp = 100;
        new_character.str = 50;
        new_character.inteli = 50;
        new_character.san = 50;
        new_character.luck = 50;
        new_character.charm = 50;
        new_character.mt = 0;
    });
    // 增量引用计数器
    auto global_itr = globals.begin();
    globals.modify(global_itr, 0, [&](auto& gitr){
        gitr.characterNo++;
    });
}

void genesis::getcharnum() {
    auto global_itr = globals.begin();
    print(global_itr->characterNo);
}

void genesis::getcallnum() {
    auto global_itr = globals.begin();
    print(global_itr->callNo);
}

void genesis::getcharacter(uint64_t _characterid) {
    auto characters_itr = characters.find(_characterid);
    eosio_assert(characters_itr != characters.end(), "character not found");
    
    print(*characters_itr);
}

void genesis::setattr(uint64_t _characterid, string name,uint32_t hp,uint32_t mp, uint32_t str,uint32_t inteli, uint32_t san, uint32_t luck, uint32_t charm) {
    auto characters_itr = characters.find(_characterid);
    eosio_assert(characters_itr != characters.end(), "character not found");

    //遍历角色数据
    characters.modify( characters_itr, 0, [&](auto& gitr) {
        gitr.hp=hp;
        gitr.mp=mp;
        gitr.str=str;
        gitr.inteli=inteli;
        gitr.san=san;
        gitr.luck=luck;
        gitr.charm=charm;  
        gitr.createtime = now();
    });
    print(*characters_itr);
}


void genesis::sayhi(account_name receiver) {
    print("Hi~ genesis!");
}

void genesis::printrand(uint64_t _characterid) {
    print("printrand::%d", _getrandnum(_characterid));
}

uint32_t genesis::_getrandnum(uint64_t _characterid) {
    auto characters_itr = characters.find(_characterid);
    eosio_assert(characters_itr != characters.end(), "game id not found in characters");

    return (((uint32_t)(characters_itr->createtime))%2) + 1;
}

EOSIO_ABI( genesis, (init)(newcharacter)(getcharnum)(getcallnum)(getcharacter)(setattr)(sayhi)(printrand))
