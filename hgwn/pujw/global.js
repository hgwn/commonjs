var isDebug = false;
var isDebug = true;
var version = ~(-new Date() / 36e5);
var cookieDomain = 'pjw.com';
var cookieDomain = 'pujinwang.com';
var rootDomain = 'http://pjw.com:8399/';
var rootDomain = 'http://pujinwang.com/';
var cartCount;
var favoritesCount;
var msgCount;
$.postJSON = function(url, data, callback) {
    return jQuery.ajax({
        'type': 'POST',
        'url': url,
        'contentType': 'application/json;charset=utf-8',
        'data': JSON.stringify(data),
        'dataType': 'json',
        'success': callback,
        beforeSend: function(xhr) {
            var user = getCookie('user');
            if (user != null  && user != 'null' && user != '') {
                user = $.parseJSON(user);
                xhr.setRequestHeader("token", user.token);
            }
            xhr.setRequestHeader("language", 'zh-cn');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            switch (jqXHR.status) {
            case (500):
                $error("服务器系统内部错误");
                break;
            case (401):
                $error("未登录");
                break;
            case (403):
                $error("无权限执行此操作");
                break;
            case (404):
                $error("请求路径错误");
                break;
            case (408):
                $error("请求超时");
                break;
            }
        }
    });
}
;
function checkMyNotify() {
    if (!getCookie('user'))
        return;
    $.postJSON(dataSourceApi + "webapi/checkMyNotify", {}, function(json) {
        if (json.Code == "200") {}
    });
}
function setCurrMenu(id) {
    $('#' + id).addClass('current_index');
    $('#' + id).attr('target', '_self');
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null )
        return ( r[2]) ;
    return null ;
}
function getRandomNum(Min, Max) 
{
    var Range = Max - Min;
    var Rand = Math.random();
    return ( Min + Math.round(Rand * Range)) ;
}
function SetCookie(name, value) 
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;domain=" + cookieDomain;
}
function SetSessionCookie(name, value) 
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;domain=" + cookieDomain;
}
function removeCookie(key) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1 * 24 * 60 * 60 * 1000);
    document.cookie = key + "='';expires=" + exp.toGMTString() + ";path=/;domain=" + cookieDomain;
    document.cookie = key + "='';expires=" + exp.toGMTString() + ";path=/";
}
function getCookie(c_name) 
{
    if (document.cookie.length > 0) 
    {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) 
        {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1)
                c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return ""
}
function getCookieToObj(c_name) 
{
    var c = getCookie(c_name);
    if (c == '')
        return null ;
    else {
        return $.parseJSON(c);
    }
}
function getLastAreaId(region) {
    if (!region)
        return "";
    if (region.currentAreaId)
        return region.currentAreaId;
    if (region.currentCityId)
        return region.currentCityId;
    if (region.currentProvinceId)
        return region.currentProvinceId;
    return "";
}
function getAreaText(region) {
    if (!region)
        return "";
    var ret = '';
    if (region.currentProvinceId)
        ret += region.currentProvinceName;
    if (region.currentCityId)
        ret += region.currentCityName;
    if (region.currentAreaId)
        ret += region.currentAreaName;
    return ret;
}
function getRegion() {
    var region = getCookie('region');
    if (region) {
        return jQuery.parseJSON(region);
    }
    return undefined;
}
function saveRegion(region) {
    SetCookie('region', region);
}
function removeRegion() {
    removeCookie('region');
}
function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}
function getUser() {
    var _u = getCookie('user');
    if (_u) {
        _u = $.parseJSON(_u);
        return _u;
    }
    return null ;
}
function loadJS(fileUrl) 
{
    var oHead = document.getElementsByTagName('head')[0];
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = fileUrl;
    oHead.appendChild(oScript);
}
function showShareAtAdvertlist(obj) {
    var objTop = $(obj).offset().top + 310;
    var objLeft = $(obj).offset().left + 1;
    bdText = $(obj).attr('bdtext');
    bdDesc = $(obj).attr('bddesc');
    bdPic = $(obj).attr('bdpic');
    bdUrl = $(obj).attr('bdurl');
    advertId = $(obj).attr('advertId');
    $("#share_opr").css({
        "top": objTop + "px",
        "left": objLeft + "px"
    });
    $('#share_opr').show();
}
function hideShareAtAdvertlist(obj) {}
function hideShareAtAdvertlist2(obj) {
    $('#share_opr').hide();
}
function getDomain() {
    return location.origin + '/';
}
var getParentInputGroup = function(elem) {
    return elem.parents('.input-group');
}
;
function showError($elem, msg) {
    var $inputgroup = getParentInputGroup($elem);
    $elem.addClass('error').removeClass('succ');
    if (!$inputgroup || $inputgroup.length == 0) {
        if ($elem.next(".tip-con").length >= 0) {
            $elem.next(".tip-con").remove();
        }
        if ($elem.next(".error-con").length <= 0) {
            $elem.after('<div class="error-con"><span class="error-tip" style="">' + msg + '</span></div>');
        }
    } else {
        if ($inputgroup.find(".tip-con").length >= 0) {
            $inputgroup.find(".tip-con").remove();
        }
        if ($inputgroup.find(".error-con").length <= 0) {
            $inputgroup.append('<div class="error-con"><span class="error-tip" style="">' + msg + '</span></div>');
        }
    }
}
function showSuc($elem) {
    $elem.removeClass('error').addClass('succ');
}
function showTip($elem) {
    var msg = $elem.attr('tip');
    $elem.removeClass('error');
    var $inputgroup = getParentInputGroup($elem);
    if (!$inputgroup || $inputgroup.length == 0) {
        if ($elem.next(".tip-con,.error-con").length >= 0) {
            $elem.next(".tip-con,.error-con").remove();
        }
        if ($elem.next(".error-con").length <= 0) {
            $elem.after('<div class="error-con tip-con"><span class="error-tip" style="">' + msg + '</span></div>');
        }
    } else {
        if ($inputgroup.find(".tip-con,.error-con").length >= 0) {
            $inputgroup.find(".tip-con,.error-con").remove();
        }
        if ($inputgroup.find(".error-con").length <= 0) {
            $inputgroup.append('<div class="error-con tip-con"><span class="error-tip" style="">' + msg + '</span></div>');
        }
    }
}
function hideTip($elem) {
    var $inputgroup = getParentInputGroup($elem);
    if (!$inputgroup || $inputgroup.length == 0) {
        if ($elem.next(".tip-con").length >= 0) {
            $elem.next(".tip-con").remove();
        }
    } else {
        if ($inputgroup.find(".tip-con").length >= 0) {
            $inputgroup.find(".tip-con").remove();
        }
    }
}
function validateMobile($elem) {
    console.log($elem.val());
    var mobile = $elem.val();
    if (mobile.length == 0 || mobile == "" || mobile.length != 11) 
    {
        showError($('#txtMobile'), '请输入11位手机号码');
        return false;
    }
    if (!(/^1[3|5|4|7|8|2|1][0-9]\d{4,8}$/.test(mobile))) {
        showError($('#txtMobile'), '手机号格式验证错误');
        return false;
    }
    return true;
}
function initValidate(group) {
    $(group).find('.valid').focus(function() {
        showTip($(this));
    }).blur(function() {
        if ($(this).val() == '') {
            hideTip($(this));
        } else {
            var pattern = eval($(this).attr('pattern'));
            if (!pattern.test($(this).val())) {
                showError($(this), $(this).attr('patternerror'));
            } else {
                var repeat = $(this).attr('repeat');
                if (repeat) {
                    if ($('#' + repeat).val() != $(this).val()) {
                        showError($(this), $(this).attr('repeaterror'));
                        return;
                    }
                }
                hideTip($(this));
                showSuc($(this));
            }
        }
    });
}
function checkInput(group) {
    var ret = true;
    $(group).find('.valid').each(function(i) {
        var pattern = eval($(this).attr('pattern'));
        if (!pattern.test($(this).val())) {
            showError($(this), $(this).attr('patternerror'));
            ret = false;
        } else {
            var repeat = $(this).attr('repeat');
            if (repeat) {
                if ($('#' + repeat).val() != $(this).val()) {
                    showError($(this), $(this).attr('repeaterror'));
                    ret = false;
                }
            }
        }
        if ($(this).hasClass('error')) {
            ret = false;
        }
    });
    return ret;
}
function checkInputItem(item) {
    var ret = true;
    var pattern = eval($(item).attr('pattern'));
    if (!pattern.test($(item).val())) {
        showError($(item), $(item).attr('patternerror'));
        ret = false;
    }
    return ret;
}
function updateHeader(isLogin) {
    reloadAbleJSFn("headerjs", $('#headerjs').attr('src'));
}
function reloadAbleJSFn(id, newJS) 
{
    $('#' + id).append("<script id=\"" + id + "\" language=\"javascript\" src=\"" + newJS + "\"></script>");
}
var loginPanel = "";
function showLogin() {
    removeCookie('user');
    updateHeader(false);
    loginPanel = layer.open({
        type: 1,
        title: '账户登录',
        skin: 'layui-layer-rim',
        area: ['420px', '360px'],
        content: '<div id="logingroup"><div class="account-login" style="float:none!important; margin:0 32px!important"><form action="" method="post" novalidate="" onsubmit="{login();return false;}"><ul class="form-list" id="validlogingruop"> <li class="login-username"><label for="username" class="required">登录名</label><div class="input-box" style="height:67px;"> <input type="text" value="" class="valid input-text ng-pristine ng-valid" placeholder="登录名/手机号" id="uname" tip="请输入登录名/手机号" pattern="/^[a-zA-Z]\\w{3,19}$|^1[3|4|5|7|8]\\d{9}$/" patternsuc="" patternerror="登录名4-20位，手机11位">  </div>  </li> <li class="login-password" style="margin-bottom:0px">  <label for="pass" class="required">密码</label><div class="input-box" style="height:67px;"> <input type="password" id="password2" class="" placeholder="密码" style="display:none;"/><input type="password" id="password" class="valid input-text ng-pristine ng-valid" placeholder="密码" ng-model="fdata.password" tip="请输入登录密码" pattern="/^\\w{6,20}$/" patternsuc="" patternerror="密码为6-20个字符">  </div>  </li>    </ul>    <div class="forgot-password"> <a href="/web/findPassword.html" target="_blank" class="f-right">忘记登录密码？</a>    </div>    <div class="buttons-set" style="padding:10px 0px!important">    <button type="submit" class="button"><span><span>登 录</span></span></button></div>  </form>  <div class="new-here">    <p>还没有账号？<a href="/web/registerphone.html" target="_blank">免费注册</a></p>  </div></div></div>'
    });
    initValidate($('#logingroup'));
}
function login() {
    if (!checkInput($('#logingroup'))) {
        return false;
    }
    jQuery.ajax({
        'type': 'POST',
        'url': dataSourceApi + '/users/login',
        'contentType': 'application/json;charset=utf-8',
        'data': JSON.stringify({
            userName: $('#uname').val(),
            password: $('#password').val()
        }),
        'dataType': 'json',
        'success': function(data, status, xhr) {
            var token = (xhr.getResponseHeader("token"));
            if (data) {
                if (data.Code == '200') {
                    var _u = data.Content;
                    _u.token = token;
                    SetSessionCookie('user', JSON.stringify(_u));
                    updateHeader();
                    layer.close(loginPanel);
                    if (loginCallBack) {
                        loginCallBack(true);
                    }
                } else {
                    $error(data.Message);
                }
            } else {
                $error('登录发生错误');
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            switch (jqXHR.status) {
            case (500):
                $error("服务器系统内部错误");
                break;
            case (401):
                $error("未登录");
                break;
            case (403):
                $error("无权限执行此操作");
                break;
            case (404):
                $error("请求路径错误");
                break;
            case (408):
                $error("请求超时");
                break;
            default:
                $error("未知错误");
            }
        }
    });
    return false;
}
var loginCallBack;
function loginSucc(callback) {
    loginCallBack = callback;
    $.postJSON(dataSourceApi + "users/isLogin", {
        noUserType: 1
    }, function(json) {
        if (json.Code == '200') {
            loginCallBack(true);
            loginCallBack = undefined;
        } else if (json.Code == '202') {
            showLogin();
        }
    }, function() {
        loginCallBack = undefined;
    });
}
function setCopy(_sTxt) {
    try {
        if (window.clipboardData) {
            window.clipboardData.setData("Text", _sTxt);
        } else if (window.netscape) {
            netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
            var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
            if (!clip)
                return;
            var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
            if (!trans)
                return;
            trans.addDataFlavor('text/unicode');
            var str = new Object();
            var len = new Object();
            var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            var copytext = _sTxt;
            str.data = copytext;
            trans.setTransferData("text/unicode", str, copytext.length * 2);
            var clipid = Components.interfaces.nsIClipboard;
            if (!clip)
                return false;
            clip.setData(trans, null , clipid.kGlobalClipboard);
        }
    } catch (e) {
        $error("您使用的浏览器不支持此复制功能，请使用Ctrl+C或鼠标右键");
        console.log(e);
    }
}
function naviController(url) {
    loginSucc(function(ret) {
        if (ret) {
            window.location.href = rootDomain + url;
        }
    });
}
function cut(rawStr, len) {
    if (!rawStr)
        return "";
    if (rawStr.length <= len) {
        return rawStr;
    }
    return rawStr.substr(0, len) + '...';
}
function percent(n1, n2) {
    if (!n2 || n2 == 0) {
        return '0%';
    }
    return Math.round(n1 / n2 * 100) + '%';
}
function percent2(n1, n2) {
    if (!n2 || n2 == 0) {
        return 0;
    }
    return Math.round(n1 / n2 * 100);
}
function buildScore(score) {
    var ret = "";
    var c = 0;
    for (i = 0; i < score; i++) {
        ret += '<img src="/img/1xing.png">';
        c++;
    }
    for (i = c + 1; i <= 5; i++) {
        ret += '<img src="/img/hui-xing.png">';
    }
    return ret;
}
function delHtmlTag(str) {
    if (!str) {
        return "";
    }
    return str.replace(/<[^>]+>/g, "");
}
function textAreaToHtml(str) {
    return str.replace(/(\r)*\n/g, "<br/>").replace(/\s/g, "&nbsp;");
}
var areaDlg;
function closeArea() {
    layer.close(areaDlg);
}
function showArea(url) {
    areaDlg = layer.open({
        type: 1,
        title: '选择服务地区',
        skin: 'layui-layer-rim',
        area: ['410px', '380px'],
        content: '<iframe src="' + url + '" id="ifrm" frameborder="0" width="100%" height="300" marginheight="0" marginwidth="0" scrolling="yes"></iframe>'
    });
}
function getTimeLong(input) {
    var now = new Date();
    var t = new Date(input);
    var l = now.getTime() - t.getTime();
    var h = Math.floor(l / (1000 * 60 * 60));
    if (h < 1) {
        l = Math.floor(l / (1000 * 60));
        if (l == 0) {
            return "1分钟前";
        }
        return (l) + "分前";
    } 
    else if (h < 24) {
        return h + '小时前'
    }
    return input ? input.substr(5, 5) : "";
}
