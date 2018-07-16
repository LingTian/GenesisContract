# build
eosiocpp -o genesis.wast genesis.cpp
eosiocpp -g genesis.abi genesis.cpp

# deploy
# create an account genesis
cleos set contract genesis contracts/genesis -p genesis

# init
cleos push action genesis init '["eva"]' -p genesis

# new character
cleos push action genesis newcharacter '["eval"]' -p genesis

# check data
cleos get table genesis genesis global
cleos get table genesis genesis character