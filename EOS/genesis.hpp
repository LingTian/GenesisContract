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
using namespace std;

class genesis: public eosio::contract {
    public:
        using contract::contract;
        genesis(account_name self): contract(self),
            globals(_self, _self),
            characters(_self, _self)
        {


        }

    public:
        // void opencard(uint64_t _gameid, const uint32_t _player);
        /// @abi action
        void init();
        /// @abi action
        void newcharacter(std::string name);
        /// @abi action
        void getcharacter(uint64_t _characterid);
        /// @abi action
        void getcharnum();
        /// @abi action
        void getcallnum();
        /// @abi action
        void setattr(uint64_t _characterid, string name, uint32_t hp, uint32_t mp,
                    uint32_t str, uint32_t inteli, uint32_t san, uint32_t luck,
                    uint32_t charm);

        // 测试函数
        /// @abi action
        void sayhi(account_name receiver);
        /// @abi action
        void printrand(uint64_t _gameid);

    private:
        void _checkgame(uint64_t _gameid);
        void _finishgame(uint64_t _gameid);
        uint32_t _getrandnum(uint64_t _gameid);

    private:

        //@abi table global i64 全局引用计数表
        struct global_struct {
            uint64_t id = 0;
            uint64_t characterNo = 0;
            uint64_t callNo = 0;

            uint64_t primary_key()const { return id; }

            EOSLIB_SERIALIZE( global_struct, (id)(characterNo)(callNo) )
        };

        // 创建一个多索引容器的游戏引用计数，用于为新角色生成id
        typedef eosio::multi_index< N(global), global_struct> global_index;
        global_index globals;

        //@abi table character 属性表
        struct character_struct {
            uint64_t id = 0; // 游戏ID
            string name;
            uint32_t hp; //hp
            uint32_t mp; // mp
            uint32_t str; // str
            uint32_t inteli; //inteli
            uint32_t san; // san
            uint32_t luck; //luck
            uint32_t charm; //charm
            uint32_t mt; //mt
            time createtime;

            uint64_t primary_key()const { return id; }  // 设置数据主键
            void print()const { eosio::print(id,":",name); } 

            EOSLIB_SERIALIZE( character_struct, (id)(name)(hp)(mp)(str)(inteli)(san)(luck)(charm)(mt)(createtime) )
        };

        // 创建一个多索引容器的游戏列表
        typedef eosio::multi_index< N(character), character_struct> character_index;
        character_index characters;
};
