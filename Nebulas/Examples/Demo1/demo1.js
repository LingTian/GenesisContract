/*
*Demo1
 *a small example to read Adam0 Adam1 & Adam2 data
 */

var NebPay = require("nebpay");
var nebPay = new NebPay();

var nebulas = require("nebulas"),
    Account = nebulas.Account,
    neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));
var dappAddress = "n1r59HEWHF3bLudBZnpdhhxrdkKNGz1nBKb";

var readAdam0 = document.getElementById("readAdam0");
var readAdam1 = document.getElementById("readAdam1");
var readAdam2 = document.getElementById("readAdam2");
var readAdamRand = document.getElementById("readAdamRand");
var giveAdam1Pos = document.getElementById("giveAdam1Pos");
var giveAdam1Neg = document.getElementById("giveAdam1Neg");
var giveAdam2Value = document.getElementById("giveAdam2Value");
var newRandomAdamX = document.getElementById("newRandomAdamX");
var getCharacterNo = document.getElementById("getCharacterNo");
var getCharacterById = document.getElementById("getCharacterById");
var download= document.getElementById("download");
readAdam0.onclick=safeCallgetAdam0;
readAdam1.onclick=safeCallgetAdam1;
readAdam2.onclick=safeCallgetAdam2;
readAdamRand.onclick=safeCallgetAdamRand;
giveAdam1Pos.onclick=posAffectAdam1;
giveAdam1Neg.onclick=negAffectAdam1;
giveAdam2Value.onclick=safeCallSetAdam2;
newRandomAdamX.onclick=safeCallnewRandomAdamX;
getCharacterNo.onclick=safeGetCharacterNo;
getCharacterById.onclick=getCharacterByIdfun;
download.onclick=downloadlink;
//to check if the extension is installed
//if the extension is installed, var "webExtensionWallet" will be injected in to web page
if (typeof(webExtensionWallet) != "undefined") {

} else {

    layer.msg('请安装最新的星云钱包后刷新~ 点击下方钱包下载也可以直接下载～!');

}


function getAdam0(){
    var func = "getAdam0";
    var from = Account.NewAccount().getAddressString();
    var args = 0;
    var callArgs = JSON.stringify([args]);
    var value = "0";
    var nonce = "0"
    var gas_price = "1000000"
    var gas_limit = "2000000"
    var contract = {
        "function": func,
        "args": callArgs
    }

    neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
        layer.closeAll('loading');
        logAdam(resp)
    }).catch(function (err) {
        console.log("net work unstable, rereading..." );
        safeCallgetAdam0();
    })


}
function getAdam1(){

    var func = "getAdam1";
    var from = Account.NewAccount().getAddressString();
    var args = 0;
    var callArgs = JSON.stringify([args]);
    var value = "0";
    var nonce = "0"
    var gas_price = "1000000"
    var gas_limit = "2000000"
    var contract = {
        "function": func,
        "args": callArgs
    }

    neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
        layer.closeAll('loading');
        logAdam(resp)
    }).catch(function (err) {
        console.log("net work unstable, rereading..." );
        safeCallgetAdam1();

    })
    
}
function getAdamRand(){

    var func = "getCharacterRandom";
    var from = Account.NewAccount().getAddressString();
    var args = 0;
    var callArgs = JSON.stringify([args]);
    var value = "0";
    var nonce = "0";
    var gas_price = "1000000";
    var gas_limit = "2000000";
    var contract = {
        "function": func,
        "args": callArgs
    }

    neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
        layer.closeAll('loading');
        logAdam(resp)
    }).catch(function (err) {
        console.log("net work unstable, rereading..." );
        safeCallgetAdamRand();
    })

}

function getAdam2(){

    var func = "getAdam2";
    var from = Account.NewAccount().getAddressString();
    var args = 0;
    var callArgs = JSON.stringify([args]);
    var value = "0";
    var nonce = "0";
    var gas_price = "1000000";
    var gas_limit = "2000000";
    var contract = {
        "function": func,
        "args": callArgs
    }

    neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
        layer.closeAll('loading');
        logAdam(resp)
    }).catch(function (err) {
        console.log("net work unstable, rereading..." );
        safeCallgetAdam2();
    })

}


function posAffectAdam1(){



    var to = dappAddress;
    var value = 0;
    console.log("********* call smart contract \"sendTransaction\" *****************")

    var func = "affectCharacter";
    var affectflag="true";
    var args = "[\"" + 1 + "\",\"" +affectflag + "\"]";
    console.log(args);


    nebPay.call(to, value, func, args, {
        qrcode: {
            showQRCode: false
        },
        goods: {
            name: "test",
            desc: "test goods"
        },
        listener: cbCallDapp
    });



}


function negAffectAdam1(){



    var to = dappAddress;
    var value = 0;
    console.log("********* call smart contract \"sendTransaction\" *****************")

    var func = "affectCharacter";
    var affectflag="false";
    var args = "[\"" + 1 + "\",\"" +affectflag + "\"]";
    console.log(args);


    nebPay.call(to, value, func, args, {
        qrcode: {
            showQRCode: false
        },
        goods: {
            name: "test",
            desc: "test goods"
        },
        listener: cbCallDapp
    });



}

function cbCallDapp(resp) {
    console.log("callback resp: " + JSON.stringify(resp))
    if (resp != 'Error: Transaction rejected by user') {
        layer.msg('已经成功提交数据..');

    } else {
        layer.msg('放弃提交数据..');


    }

}


function setAdam2Value () {
    var func = "getCharacterRandom";
    var from = Account.NewAccount().getAddressString();
    var args = 0;
    var callArgs = JSON.stringify([args]);
    var value = "0";
    var nonce = "0";
    var gas_price = "1000000";
    var gas_limit = "2000000";
    var contract = {
        "function": func,
        "args": callArgs
    }

    neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
        layer.closeAll('loading');
        saveToAdam2(resp);
    }).catch(function (err) {
        console.log("net work unstable, rereading..." );
        safeCallSetAdam2();
    })
    
    
}


function getNewRandomAdamX () {
    var func = "getCharacterRandomStrFormat";
    var from = Account.NewAccount().getAddressString();
    var args = 0;
    var callArgs = JSON.stringify([args]);
    var value = "0";
    var nonce = "0";
    var gas_price = "1000000";
    var gas_limit = "2000000";
    var contract = {
        "function": func,
        "args": callArgs
    }

    neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
        layer.closeAll('loading');
        insertIntoCharacter(resp);
    }).catch(function (err) {
        console.log("net work unstable, rereading..." );
        safeCallnewRandomAdamX();
    })


}

function logAdam(resp) {
    console.log(resp);
    var result = resp.result;
    var resultString = JSON.parse(result);
    console.log(resultString);

    layer.msg('<img src="1.png" height="60" width="60"></img><div>信息列表</div><br><div>name: '+resultString.name+'</div><br><div>HP: '+resultString.hp+'<br>MP: '+resultString.mp+'<br>str: '+resultString.str+' int: '+resultString.int+' san: '+resultString.san+' <br>charm: '+resultString.charm+' luck: '+resultString.luck+'</div>', {
        time: 0 //不自动关闭
        ,
        anim: 0,
        btnAlign: 'c',
        shade: 0.2,
        closeBtn: 0,
        area: ['480px', '300px'],
        offset: 'c',shadeClose:1
        });

}

function logCharacterNo(resp) {
    console.log(resp);
    var result = resp.result;
    var resultString = JSON.parse(result);
    console.log(resultString);

    layer.msg('<img src="1.png" height="60" width="60"></img><div>人物人数</div><br><div>NO: '+resultString+'</div>', {
        time: 0 //不自动关闭
        ,
        anim: 0,
        btnAlign: 'c',
        shade: 0.2,
        closeBtn: 0,
        area: ['480px', '300px'],
        offset: 'c',shadeClose:1
    });

}

function saveToAdam2(resp) {
    var result = resp.result;
    var resultString = JSON.parse(result);
    console.log(resultString);

    layer.msg('<img src="1.png" height="60" width="60"></img><div>信息列表</div><br><div>HP: '+resultString.hp+'<br>MP: '+resultString.mp+'<br>str: '+resultString.str+' int: '+resultString.int+' san: '+resultString.san+' <br>charm: '+resultString.charm+' luck: '+resultString.luck+'</div>', {
        time: 0 //不自动关闭
        ,
        anim: 0,
        btnAlign: 'c',
        shade: 0.2,
        closeBtn: 0,
        area: ['480px', '300px'],
        offset: 'c',shadeClose:1,btn:['Save'],yes:function(){


            var to = dappAddress;
            var value = 0;
            console.log("********* call smart contract \"sendTransaction\" *****************")

            var func = "setCharacterAttributes";
            var args = "[" + 2 + ",\"" + resultString.hp + "\",\"" + resultString.mp + "\",\"" + resultString.str + "\",\"" + resultString.int + "\",\"" + resultString.san + "\",\"" + resultString.luck + "\",\"" +resultString.charm + "\"]";
            console.log(args);


            nebPay.call(to, value, func, args, {
                qrcode: {
                    showQRCode: false
                },
                goods: {
                    name: "test",
                    desc: "test goods"
                },
                listener: cbCallDapp
            });


        }
    });

}

function insertIntoCharacter(resp) {
    var result = resp.result;
    // var resultString = JSON.parse(result);
    console.log("raw:"+result);

    layer.msg('<img src="1.png" height="60" width="60"></img><div>信息列表</div><br><div>随机Json: '+result+'</div>', {
        time: 0 //不自动关闭
        ,
        anim: 0,
        btnAlign: 'c',
        shade: 0.2,
        closeBtn: 0,
        area: ['480px', '300px'],
        offset: 'c',shadeClose:1,btn:['Save'],yes:function(){


            var to = dappAddress;
            var value = 0;
            console.log("********* call smart contract \"sendTransaction\" *****************")

            var func = "insertCharacter";
            var args = "[" + result + "]";
            console.log(args);


            nebPay.call(to, value, func, args, {
                qrcode: {
                    showQRCode: false
                },
                goods: {
                    name: "test",
                    desc: "test goods"
                },
                listener: cbCallDapp
            });


        }
    });

}

function getCharacterByIdfun(){
    layer.prompt({title: '输入想要读取的人物的id', formType: 3}, function (pass, index) {
        layer.msg('读取人物编号<' + pass + '>资料中');

        var func = "getCharacter";
//        var args = "[\"" + pass + "\"]";
        var from = Account.NewAccount().getAddressString();

        var args = pass;
        var callArgs = JSON.stringify([args]);
        var value = "0";
        var nonce = "0"
        var gas_price = "1000000"
        var gas_limit = "2000000"
        var contract = {
            "function": func,
            "args": callArgs
        }

        neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
            logAdam(resp)
        }).catch(function (err) {

            console.log("error:" + err.message)
        })
    });

}

function tryGetCharacterNo(){
    var func = "getCharacterNo";
    var from = Account.NewAccount().getAddressString();
    var args = 0;
    var callArgs = JSON.stringify([args]);
    var value = "0";
    var nonce = "0"
    var gas_price = "1000000"
    var gas_limit = "2000000"
    var contract = {
        "function": func,
        "args": callArgs
    }

    neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
        layer.closeAll('loading');
        logCharacterNo(resp)
    }).catch(function (err) {
        console.log("net work unstable, rereading..." );
        safeGetCharacterNo();
    })


}
function downloadlink(){
    layer.msg("<img src=\"1.png \" height=\"60\" width=\"60\"><br>" +

        "网页下载地址:<br>" +
        "<a href=\"https:\/\/github.com\/ChengOrangeJu\/WebExtensionWallet\">https://github.com/ChengOrangeJu/WebExtensionWallet\</a>" +
        "<br>苹果钱包下载地址(海外):<br><a href=\"https:\/\/itunes.apple.com\/hk\/app\/nas-nano\/id1281191905\?l=zh\&ls=1\&mt=8\">https://itunes.apple.com/hk/app/nas-nano/id1281191905?l=zh&ls=1&mt=8\</a><br>安卓钱包下载地址:<br><a href=\"https:\/\/nano.nebulas.io\/index_cn.html\">https://nano.nebulas.io/index_cn.html\</a><br><br>", {
        time: 0 //不自动关闭
        , anim: 0, btnAlign: 'c', shade: 0.3, area: ['50%', '50%'], shadeClose:1

    });
}

function safeCallSetAdam2(){
    layer.load(1);
    setTimeout(setAdam2Value, 100);
}
function safeCallgetAdam0(){
    layer.load(1);
    setTimeout(getAdam0, 100);
}

function safeCallgetAdam1(){
    layer.load(1);
    setTimeout(getAdam1, 100);
}

function safeCallgetAdam2(){
    layer.load(1);
    setTimeout(getAdam2, 100);
}

function safeCallgetAdamRand(){
    layer.load(1);
    setTimeout(getAdamRand, 100);
}

function safeCallnewRandomAdamX(){
    layer.load(1);
    setTimeout(getNewRandomAdamX, 100);
}
function safeGetCharacterNo(){
    layer.load(1);
    setTimeout(tryGetCharacterNo, 100);
}





