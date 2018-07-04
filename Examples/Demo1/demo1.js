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
var dappAddress = "n1gyd1t2fdm9TiEwW6HX5MMyh5uNzHVyU9H";

var readAdam0 = document.getElementById("readAdam0");
var readAdam1 = document.getElementById("readAdam1");
var readAdam2 = document.getElementById("readAdam2");
var readAdamRand = document.getElementById("readAdamRand");
var giveAdam1Pos = document.getElementById("giveAdam1Pos");
var giveAdam1Neg = document.getElementById("readAdam1Neg");


readAdam0.onclick=getAdam0;
readAdam1.onclick=getAdam1;
readAdam2.onclick=getAdam2;
readAdamRand.onclick=getAdamRand;

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
        logAdam(resp)
    }).catch(function (err) {

        console.log("error:" + err.message)
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
                                                                                        logAdam(resp)
                                                                                        }).catch(function (err) {
                                                                                                 
                                                                                                 console.log("error:" + err.message)
                                                                                                 })
    
}
function getAdamRand(){

    var func = "getAdamRandom";
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
        logAdam(resp)
    }).catch(function (err) {

        console.log("error:" + err.message)
    })

}

function getAdam2(){

    var func = "getAdam2";
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
        logAdam(resp)
    }).catch(function (err) {

        console.log("error:" + err.message)
    })

}


function logAdam(resp) {
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



function applyintobattle(resp) {
 
}

//
// getAdam0();
//
// getAdam1();
