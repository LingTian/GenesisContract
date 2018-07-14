/**
 *  @file
 *  @copyright defined in eos/LICENSE.txt
 */
#include <Genesis.hpp>

void Genesis::createGenesis(const account_name _owner) {
  // 创建一个全局引用计数器
  auto global_itr = globals.begin();
  if( global_itr == globals.end() ) {
     global_itr = globals.emplace(_self, [&](auto& gitr){
         gitr.characterNo=3;
         gitr.callNo=0;
         
     });
  }
    _initialization();
  // 增量引用计数器
  globals.modify(global_itr, 0, [&](auto& gitr){
     gitr.characterNo++;
  });

 
}
void Genesis::_initialization() {
    // 创建一个Adam
    auto characters_itr = characters.emplace(_self, [&](auto& new_character){
        new_character.id          = global_itr->characterNo;
        new_character.name = "Adam0";
        new_character.hp      = 100;
        new_character.mp      = 100;
        new_character.str      = 50;
        new_character.inteli      = 50;
        new_character.san      = 50;
        new_character.luck      = 50;
        new_character.chram      = 50;
        new_character.mt      = 0;
        
    });
    // 创建一个Adam
    auto characters_itr = characters.emplace(_self, [&](auto& new_character){
        new_character.id          = global_itr->characterNo;
        new_character.name = "Adam1";
        new_character.hp      = 100;
        new_character.mp      = 100;
        new_character.str      = 50;
        new_character.inteli      = 50;
        new_character.san      = 50;
        new_character.luck      = 50;
        new_character.chram      = 50;
        new_character.mt      = 1;
        
    });
    // 创建一个Adam
    auto characters_itr = characters.emplace(_self, [&](auto& new_character){
        new_character.id          = global_itr->characterNo;
        new_character.name = "Adam2";
        new_character.hp      = 100;
        new_character.mp      = 100;
        new_character.str      = 50;
        new_character.inteli      = 50;
        new_character.san      = 50;
        new_character.luck      = 50;
        new_character.chram      = 50;
        new_character.mt      = 2;
        
    });
    
}


void Genesis::getCharacterNo() {
    return gitr.characterNo;
}

void Genesis::getcallNo() {
    return gitr.callNo;
}

void Genesis::getAdam0(uint64_t _characterid) {
 
  auto characters_itr = characters.find(_characterid);
  eosio_assert(characters_itr != characters.end(), "game not found");

    return characters_itr;
}

void Genesis::getcharacter(uint64_t _characterid) {
    
    auto characters_itr = characters.find(_characterid);
    eosio_assert(characters_itr != characters.end(), "game not found");
    
    return characters_itr;
    // 遍历角色数据
//    characters.modify( characters_itr, 0, [&](auto& gitr) {
//        if(_player == 1){
//            gitr.player1 = 1;
//        }else if(_player == 2){
//            gitr.player2 = 1;
//        }
//        _checkgame(_gameid);
//    });
}

void Genesis::setCharacterAttributes(uint64_t _characterid,string name,uint32_t hp,uint32_t mp, uint32_t str,uint32_t inteli, uint32_t san, uint32_t luck, uint32_t charm) {
    
    auto characters_itr = characters.find(_characterid);
    eosio_assert(characters_itr != characters.end(), "game not found");
    
 
     遍历角色数据
        characters.modify( characters_itr, 0, [&](auto& gitr) {
            gitr.hp=hp;
            gitr.mp=mp;
            gitr.str=str;
            gitr.inteli=inteli;
            gitr.san=san;
            gitr.luck=luck;
            gitr.charm=charm;
            
    });
       return characters_itr;
}


void Genesis::sayhi(account_name receiver) {
  eosio::print("Hi~ Genesis!");
}

void Genesis::printrand(uint64_t _characterid) {
  eosio::print("printrand::%d", _getrandnum(_characterid));
}
//
//void Genesis::checkend(uint64_t _gameid) {
//  auto characters_itr = characters.find(_gameid);
//  eosio_assert(characters_itr != characters.end(), "game not found");
//
//  if(characters_itr->player1 != 0 && characters_itr->player2 != 0){
//    characters.modify( characters_itr, 0, [&](auto& gitr) {
//      gitr.winner = _getrandnum(_gameid);
//    });
//  }
//}

uint32_t Genesis::_getrandnum(uint64_t _characterid) {
  auto characters_itr = characters.find(_characterid);
  eosio_assert(characters_itr != characters.end(), "game id not found in characters");

  return (((uint32_t)(characters_itr->createtime))%2) + 1;
}

EOSIO_ABI( Genesis, (creategame)(opencard)(sayhi)(printrand))
