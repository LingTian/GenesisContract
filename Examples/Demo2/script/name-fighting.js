/*
*js version info
 *for game - name-fighting
*by ajccom
 ---------------------------
compile with NAS
little experiment to apply random seed to ensure fair battle
 */

var NebPay = require("nebpay");
var nebPay = new NebPay();

var nebulas = require("nebulas"),
    Account = nebulas.Account,
    neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));
var dappAddress = "n1x6btgnsv9qzg7uDEGJBvDfodb5mrW19xi";
var dappAddress1= "n1gyd1t2fdm9TiEwW6HX5MMyh5uNzHVyU9H";
//to check if the extension is installed
//if the extension is installed, var "webExtensionWallet" will be injected in to web page
if (typeof(webExtensionWallet) != "undefined") {

} else {

    layer.msg('请安装最新的星云钱包后刷新~ 点击下方钱包下载也可以直接下载～!');

}




var debug = debug || {};
debug = {
    log: function (t) {
        if (window.console) {
            console.log(t);
        }
    }
};
var name0;
var name1;
var NF = NF || {};
NF = {
    data: {
        actor: {
            '0': {
                able: {name: '', att: 0, def: 0, spd: 0, hp: 0, intro: '', face: 'def.gif'},
                status: 'n',
                currentHp: 0
            },
            '1': {
                able: {name: '', att: 0, def: 0, spd: 0, hp: 0, intro: '', face: 'def.gif'},
                status: 'n',
                currentHp: 0
            }
        },
        otherDate: {
            intro: {
                num: 10,
                '0': '名字中仿佛透露着杀气',
                '1': '一个隐匿着气息的名字',
                '2': '仿佛看上去很弱的名字',
                '3': '一脸纠结的名字',
                '4': '这个名字似乎很皮',
                '5': '这个名字真的没问题吗',
                '6': '看上去很像主角',
                '7': '看上去很像配角',
                '8': '不俗的眼神',
                '9': '坚持到底吧少年'
            },
            face: {imgPath: 'img/face/'},
            fightingDesc: {
                num: 10,
                '0': '一顿拳打脚踢, 共造成',
                '1': '狠狠蹂躏了顿, 共造成',
                '2': '扔了一袋三鹿奶粉,他乐呵呵的吃了起来, 造成',
                '3': '施放了炎龙斩, 共造成',
                '4': '放了个屁，共造成',
                '5': '施放了奥义-连牙断空, 共造成',
                '6': '送了一张动车票, 共造成',
                '7': '送了个飞吻, 共造成',
                '8': '邮寄了一个炸弹, 共造成',
                '9': '使用了爆菊战法, 共造成'
            }
        }
    }, common: {
        ua: navigator.userAgent, isWebKit: function () {
            return this.ua.indexOf('webkit') > (-1) ? true : false
        }, getAble: function (id) {
            return NF.data.actor[id].able
        }, getName: function (id) {
            return NF.data.actor[id].able.name
        }, getFightDescOption: function () {
            return NF.data.otherDate.fightingDesc
        }, setName: function (id, str) {
            NF.data.actor[id].able.name = str
        }, getIntroOption: function () {
            return NF.data.otherDate.intro
        }, getFaceOption: function () {
            return NF.data.otherDate.face
        }, getHp: function (id) {
            return NF.data.actor[id].able.hp
        }, setAble: function (id, str, incoming) {
            var s = str || 'a', able = this.getAble(id), intro = this.getIntroOption(), face = this.getFaceOption(),
                ables = ['att', 'def', 'spd', 'hp', 'intro', 'face'], current;
            for (var i = ables.length; i--;) {
                able[ables[i]] = (20) % 100;
                current = able[ables[i]];
                if (current <= 10) {
                    able[ables[i]] = current + 15
                }
            }
            if (able.hp <= 20) {
                able.hp = able.hp * 2
            }
            able.name = str;
            able.intro = intro[able.intro % intro.num];
            able.face = face.imgPath + able.face % 10 + '/face.gif';
            NF.ui.dataReady = true
        }, restart: function (incoming) {
            // var name0 = $('#actor0-name').val(), name1 = $('#actor1-name').val();
            console.log(name0);
            console.log(name1);
            if (NF.ui.nameReady !== true) {
                return
            }
            NF.state.contextBox.text('');
            this.setAble(0, name0, incoming);
            this.setAble(1, name1, incoming);
            NF.ui.setFace(0, 'n');
            NF.ui.setFace(1, 'n');
            NF.ui.setAble(0);
            NF.ui.setAble(1);
            NF.state.ready()
        }, _bind: function (ele) {
            var that = this;
            ele = typeof ele === 'string' ? $(ele) : ele;
            ele.bind('click', function () {
                that.restart()
            })
        }, ini: function () {
        }
    }, state: {
        firstActor: 0, currentActor: 0, round: 0, contextBox: null, actBtn: null, ready: function () {
            var that = this;
            var actor0 = NF.common.getAble(0), actor1 = NF.common.getAble(1),
                current = (actor0.spd >= actor1.spd ? 0 : 1), next = (current === 0 ? 1 : 0);
            that.round = 0;
            that.firstActor = current;
            that.currentActor = current;
            that.fight(current, next)
        }, end: function (current, next) {
            this.showReport('', '', '', '<div>战斗结束</div>');
            NF.ui.setFace(current, 'w');
            NF.ui.setFace(next, 'l');
            this.firstActor = 0;
            this.currentActor = 0;
            this.round = 0
        }, showReport: function (actCurrentName, actNextName, harmNum, txt) {
            var conBox = $('#act-content .content'), otherDesc = parseInt(Math.random() * 2, 10) === 1 ? true : false,
                parent = $('#act-content');
            txt = txt || '';
            this.round++;
            if (actCurrentName === '' && actNextName === '' && harmNum === '') {
                conBox.append(txt)
            } else {
                if (otherDesc) {
                    var fd = NF.common.getFightDescOption();
                    useFd = fd[parseInt(Math.random() * 10, 10) % fd.num];
                    conBox.append('<div>第' + this.round + '回合,<span class="green">' + actCurrentName + '</span>对<span class="red">' + actNextName + '</span>' + useFd + '<span class="red">' + harmNum + '</span>伤害' + (txt === '' ? '' : ',' + txt) + '</div>')
                } else {
                    conBox.append('<div>第' + this.round + '回合,哇塞<span class="green">' + actCurrentName + '</span>对<span class="red">' + actNextName + '</span>造成了<span class="red">' + harmNum + '</span>伤害' + (txt === '' ? '' : ',' + txt) + '</div>')
                }
            }
            debug.log('conBox.height()' + conBox.height() + '//parent.height():' + parent.height())
        }, fight: function (current, next) {
            var that = this;
            var act = setTimeout(function () {
                NF.ui.setFace(current, 'n');
                NF.ui.setFace(next, 'i');
                var ableC = NF.common.getAble(current), ableN = NF.common.getAble(next), bonus2 = false, bonus3 = false;
                var harm = parseInt((ableC.att / ableN.def) * 10, 10) + Math.round(Math.pow(-1, parseInt(Math.random())) * Math.random() * 5);
                if (Math.round(Math.random() * 10) <= 2) {
                    var random = Math.round(Math.random() * 10);
                    if (random >= 6) {
                        harm = harm * 2;
                        bonus2 = 2
                    } else {
                        harm = harm * 3;
                        bonus3 = 3
                    }
                }
                if (harm <= 0) {
                    harm = 0;
                    that.showReport('', '', '', '<div><span class="green">' + ableC.name + '</span><span class="red">攻击失误！！！</span></div>')
                }
                ableN.hp = ableN.hp - harm;
                if (ableN.hp <= 0) {
                    NF.ui.setHp(next, 0);
                    that.showReport(ableC.name, ableN.name, harm, (bonus2 ? '2倍伤害！！！' : (bonus3 ? '3倍伤害！！！' : '')) + '<span class="green">胜利的是' + ableC.name + '</span>');
                    clearTimeout(act);
                    that.end(current, next);
                    return false
                } else {
                    NF.ui.setHp(next, ableN.hp);
                    that.showReport(ableC.name, ableN.name, harm, (bonus2 ? '2倍伤害！！！' : (bonus3 ? '3倍伤害！！！' : '')))
                }
                current = next === 0 ? 0 : 1;
                next = current === 0 ? 1 : 0;
                that.fight(current, next)
            }, 2000)
        }, ini: function () {
            this.contextBox = $('#act-content .content')
        }
    }, ui: {
        dataReady: false, uiReady: function () {
            $('body').addClass('ready');
            return true
        }, nameReady: false, reload: function () {
            $('body').removeClass('ready')
        }, setFace: function (current, status) {
            var common = NF.common;
            currentAble = common.getAble(current), face = currentAble.face, ele = $('#actor' + current + '-able'), faceEle = ele.find('.face');
            faceEle.removeClass('n i l w');
            faceEle.addClass(status)
        }, placeHold: function (ele, t) {
            var that = this;
            ele = typeof ele === 'string' ? $(ele) : ele;
            ele.val(t);
            ele.addClass('def');
            ele.focus(function () {
                var ele = $(this);
                ele.addClass('focus');
                if (ele.val() !== t) {
                    ele.removeClass('def')
                } else {
                    if (ele.hasClass('def')) {
                        ele.val('');
                        ele.removeClass('def')
                    }
                }
            });
            ele.blur(function () {
                var ele = $(this), val = ele.val();
                if (val !== t && val !== '') {
                    ele.removeClass('def');
                    that.nameReady = true
                } else {
                    ele.val(t);
                    ele.addClass('def')
                }
                ele.removeClass('focus')
            })
        }, setClass: function (eles, num, lv1, lv2) {
            var parent = eles.parent();
            if (typeof num !== 'number') {
                return
            }
            if (parent.hasClass('hp') || parent.hasClass('att') || parent.hasClass('def') || parent.hasClass('spd')) {
                if (num >= lv1) {
                    eles.removeClass('yellow').removeClass('red').addClass('green')
                } else {
                    if (num < lv1 && num >= lv2) {
                        eles.removeClass('green').removeClass('red').addClass('yellow')
                    } else {
                        if (num < lv2) {
                            eles.removeClass('yellow').removeClass('green').addClass('red')
                        }
                    }
                }
            }
        }, setHp: function (id, hp) {
            var hpStatus, ele = $('#actor' + id + '-able .hp span'),
                eles = $('#actor' + id + '-able .hp em, #actor' + id + '-able .hp span');
            eles.text(hp);
            this.setClass(eles, hp, 70, 40);
            ele.animate({'width': (hp / 100) * ele.parent().width() + 'px'}, 500)
        }, setAble: function (id) {
            if (this.dataReady === true) {
                var able = NF.common.getAble(id), ele = $('#actor' + id + '-able'),
                    eles = $('#actor' + id + '-able span, #actor' + id + '-able em'),
                    ables = ['att', 'def', 'spd', 'hp', 'intro', 'face'];
                ele.find('.name').text(able.name);
                for (var i = ables.length; i--;) {
                    var parent = ele.find('.' + ables[i]);
                    var current = parent.children();
                    current.text(able[ables[i]]);
                    if (parent.find('span')[0]) {
                        var span = parent.find('span');
                        span.css('width', (able[ables[i]] / 100) * parent.width() + 'px')
                    }
                    this.setClass(current, able[ables[i]], 70, 40)
                }
            }
            this.uiReady()
        }, ini: function () {
            this.placeHold('#actor0-name,#actor1-name', '请输入名字')
        }
    }, ini: function () {
        this.common.ini();
        this.state.ini();
        this.ui.ini()
    }
};
$(function () {
    NF.ini();

    var pack = document.getElementById('pack');
    var start = document.getElementById('start');

    start.onclick = getAdam;
    pack.onclick = packfun;

    function packfun() {
        layer.msg("<img src=\"img/neb.png \" height=\"60\" width=\"60\"><br>" +

            "网页下载地址:<br>" +
            "<a href=\"https:\/\/github.com\/ChengOrangeJu\/WebExtensionWallet\">https://github.com/ChengOrangeJu/WebExtensionWallet\</a>" +
            "<br>苹果钱包下载地址(海外):<br><a href=\"https:\/\/itunes.apple.com\/hk\/app\/nas-nano\/id1281191905\?l=zh\&ls=1\&mt=8\">https://itunes.apple.com/hk/app/nas-nano/id1281191905?l=zh&ls=1&mt=8\</a><br>安卓钱包下载地址:<br><a href=\"https:\/\/nano.nebulas.io\/index_cn.html\">https://nano.nebulas.io/index_cn.html\</a><br><br>原创作者:ajccom ", {
            time: 0 //不自动关闭
            , anim: 0, btnAlign: 'c', shade: 0.3, area: ['50%', '50%'], shadeClose: 1

        });
    }

    function callcontract() {

        var to = dappAddress;
        var value = 0.00001;
        console.log("********* call smart contract \"sendTransaction\" *****************")

        var func = "newbattlelseed";
        //var args = "[\"" + nextid + "\",\"" +1+ "\"]";
        var args = "[\"" + 'random' + "\"]";
        console.log(args);


        nebPay.call(to, value, func, args, {
            qrcode: {
                showQRCode: false
            },
            goods: {
                name: "test",
                desc: "test goods"
            },
            listener: newbattlelseedcallback
        });
//  NF.common.restart();

    }

});

function newbattlelseedcallback(resp) {
    console.log("callback resp: " + JSON.stringify(resp))
    if (resp != 'Error: Transaction rejected by user') {
        setTimeout(applyseeddata, 2000);

        layer.msg('应用链上随机种子到本场战斗..如读取不成功可能是Nas节点不稳定');

    } else {
        layer.msg('放弃获得链上随机种子..');


    }

}
function getAdam(){
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
    
    neb.api.call(from, dappAddress1, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
                                                                                       logAdam(resp)
                                                                                       }).catch(function (err) {
                                                                                                
                                                                                                console.log("error:" + err.message)
                                                                                                })
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

    neb.api.call(from, dappAddress1, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
        logAdam1(resp)
    }).catch(function (err) {

        console.log("error:" + err.message)
    })

}


function applyseeddata() {


    var func = "getseeddetail";

    //    var func = "getworld";
    //        var args = "[\"" + pass + "\"]";
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
        applyintobattle(resp)
    }).catch(function (err) {

        console.log("error:" + err.message)
    })

}

function randomize(lower, upper) {
    return Math.floor((Math.random() * (upper - lower) + lower));
}

function logAdam(resp) {
    console.log(resp);
    var result = resp.result;
    var resultString = JSON.parse(result);

    console.log(resultString);

    name0=resultString.name;
    NF.common.setAble(0, resp.name, resp.str);


}
function logAdam1(resp) {
    console.log(resp);
    var result = resp.result;
    var resultString = JSON.parse(result);


    name1=resultString.name;
    NF.common.setAble(1, resp.name, resp.str);
    NF.common.restart(parseInt(1));


}


function applyintobattle(resp) {
    // var result = resp.result;
    // var resultString = JSON.parse(result);
    // var stringinfo = resultString.toString();
    // var singlein = stringinfo.split(",");
    // adaption = parseInt(singlein[0]);
    // surviveability = parseInt(singlein[1]);
    // division = parseInt(singlein[2]);
    // var q = randomize(1, 3);

    layer.msg("开始战斗!");
    NF.common.restart(parseInt(1));
}


