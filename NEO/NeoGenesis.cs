using System;
using System.ComponentModel;
using System.Numerics;
using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Services.Neo;
using Neo.SmartContract.Framework.Services.System;
using Helper = Neo.SmartContract.Framework.Helper;

namespace NeoGenesis
{
    public class NeoGenesis : SmartContract
    {

        // Project Genesis
        public static string Name() => "Genesis";


        delegate object deleDyncall(string method, object[] arr);

    }

      /**
      * 英雄计数
      */
      private static void _addCharacterNo(BigInteger count)
        {
           var total = Storage.Get(Storage.CurrentContext, "totalCharacter").AsBigInteger();
           total += count;
           Storage.Put(Storage.CurrentContext, "totalCharacter", total);
         }

       public static BigInteger gettotalCharacter()
             {
                 return Storage.Get(Storage.CurrentContext, "totalCharacter").AsBigInteger();
             }



    //Adam0 Example
    public static class Adam0
       {

           public static string name = "Adam0";
           public static int hp  = 100;
           public static int mp  = 100;
           public static int str  = 50;
           public static int inteligence  = 50;
           public static int san  = 50;
           public static int luck  = 50;
           public static int charm  = 50;

       }
               [Serializable]
               public class Character
               {

                 public string name ;
                            public string hp ;
                            public string mp ;
                            public string str;
                            public string inteligence;
                            public string san;
                            public string luck;
                            public string charm;
               }

    // Get Genesis Character
  private static object[] getCharacterInfo(BigInteger id)
        {
            var key = id;
            var bytes = Storage.Get(Storage.CurrentContext, key);
            if (bytes.Length == 0)
                return new object[0];
            return (object[]) bytes.Deserialize();
        }

        // Add Genesis Character
       private static void _putCharacterInfo(BigInteger id, Character info)
             {
                 var key = id
                 byte[] nftInfo = Helper.Serialize(info);

                 Storage.Put(Storage.CurrentContext, key, nftInfo);
             }

        // Insert
       public static BigInteger newCharacter(BigInteger id, string[] data)
            {


                //
                if (Runtime.CheckWitness(MintOwner))
                {
                    Character newCharacter = new Character();
                    newCharacter.name = data[0];
                    newCharacter.hp = data[1];
                    newCharacter.mp = data[2];
                    newCharacter.str = data[3];
                    newCharacter.inteligence = data[4];
                    newCharacter.san = data[5];
                    newCharacter.luck = data[6];
                    newCharacter.charm = data[7];





                    _putCellInfo(id, newCharacter);

                    Runtime.Notify("CharacterGenerated", id);
                    return id;
                }
                else
                {
                    Runtime.Log("Only the contract owner may mint new tokens.");
                    return 0;
                }
            }


        public static Object Main(string operation, params object[] args)
        {
            if (Runtime.Trigger == TriggerType.Verification)
            {
                if (ContractOwner.Length == 20)
                {
                    // if param ContractOwner is script hash
                    //return Runtime.CheckWitness(ContractOwner);
                    return false;
                }

                if (ContractOwner.Length == 33)
                {

                    byte[] signature = operation.AsByteArray();
                    return VerifySignature(signature, ContractOwner);
                }

                return false;
            }

            if (Runtime.Trigger == TriggerType.VerificationR)
            {
                return true;
            }

            if (Runtime.Trigger == TriggerType.Application)
            {

                var callscript = ExecutionEngine.CallingScriptHash;
                if (operation == "name") return Name();
                if (operation == "decimals") return 0; // NFT can't divide, decimals allways zero

                if (operation == "hasExtraData") return false;
                if (operation == "isEnumable") return false;
                if (operation == "hasBroker") return false;



                if (operation == "newCharacter")
                {
                    if (args.Length != 2)
                        return false;

                    var id = (BigInteger) args[0];
                    var data = (string) args[1];

                    return newCharacter( id, data);
                }



            }

            return false;
        }

}
