/**
 *  @file
 *  @copyright guojh 2018.5.16
 */
#include <utility>
#include <vector>
#include <string>
#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>

using eosio::asset;

class Genesis : public eosio::contract {
  public:
    Genesis(account_name self)
    :eosio::contract(self),
      globals(_self, _self),
      characters(_self, _self)
    {}

  public:
    void createGenesis(const account_name _owner);
    void opencard(uint64_t _gameid, const uint32_t _player);

    // 测试函数
    void sayhi(account_name receiver);
    void printrand(uint64_t _gameid);

  private:
    void _checkgame(uint64_t _gameid);
    void _finishgame(uint64_t _gameid);
    uint32_t _getrandnum(uint64_t _gameid);

  private:

    //@abi table global i64 全局引用计数表
    struct global {
      uint64_t id = 0;
      uint64_t characterNo = 0;

      uint64_t primary_key()const { return id; }

      EOSLIB_SERIALIZE( global, (id)(characterNo) )
    };

    // 创建一个多索引容器的游戏引用计数，用于为新角色生成id
    typedef eosio::multi_index< N(global), global> global_index;
    global_index globals;

    //@abi table character 属性表
    struct character {
      uint64_t      id;           // 游戏ID
        string      name;
      uint32_t      hp;       //hp
      uint32_t      mp;      // mp
      uint32_t      str;      // str
     uint32_t      inteli;      //inteli
         uint32_t      san;     // san
         uint32_t      luck;   //luck
         uint32_t      charm; //charm
         uint32_t      mt;    //mt
        
      uint64_t primary_key()const { return id; }  // 设置数据主键

      EOSLIB_SERIALIZE( character, (id)(hp)(mp)(str)(inteli)(san)(luck)(charm)(mt) )
    };

    // 创建一个多索引容器的游戏列表
    typedef eosio::multi_index< N(character), character> character_index;
    character_index characters;
};
