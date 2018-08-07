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
//玩家信息
    public static class Adam0
    {

        public static string name = "Adam";
        public static int hp  = 100;
        public static int mp  = 100;
        public static int str  = 50;
        public static int inteligence  = 50;
        public static int san  = 50;
        public static int luck  = 50;
        public static int charm  = 50;

}

}
