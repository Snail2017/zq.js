"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//常用方法封装
;(function (window) {
    var data = {
        timer: null,
        count: ''
    };
    var zq = function zq() {
        return new zq.fn.init();
    };

    // jQuery的初始方法
    zq.fn = zq.prototype = {
        init: function init() {}
    }, zq.prototype.init.prototype = zq.fn;
    // 修正构造器指向
    zq.prototype.constructor = zq;
    zq.extend = zq.fn.extend = function () {

        var options,
            name,
            src,
            copy,
            copyIsArray,
            clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // 第一个参数是bool值，第二个参数是目标值，索引从第三个参数开始
        // 第一个参数bool为true表示深拷贝
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[1] || {};
            i = 2;
        }

        // target不是object，不是array，不是正则，不是日期，不是function，则目标值是一个空对象。
        // typeof object,array,正则，日期 == "object"
        // typeof这个判断方法让人很揪心呐
        // 确定被拷贝对象是个{}类型
        if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }

        // 确定被拷贝对象是个{}类型，自己写的
        //    var targetType = jQuery.type(target);
        //    var targetType_arr = ["object","function","array","date","regexp"];
        //    if(targetType_arr.indexOf(targetType) == -1){
        //        target = {};
        //    }

        // 只有一个参数传入，目标值是jQuery函数自己，或者jQuery对象。看谁调用了。
        if (length === i) {
            target = this;
            --i;
        }

        // 开始遍历复制
        for (; i < length; i++) {
            // 不是null或undefined的参数才可以，要知道null == undefined是true
            if ((options = arguments[i]) != null) {

                for (name in options) {
                    // 拿到老，新同个key对应的value值
                    src = target[name];
                    copy = options[name];

                    // 防止循环引用
                    // 当拷贝值是被拷贝的对象，跳出循环
                    if (target === copy) {
                        continue;
                    }

                    // 深拷贝，拷贝值非undefined，是普通对象或者是数组
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            // 确定一下 被拷贝值也是个数组
                            clone = src && jQuery.isArray(src) ? src : [];
                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // 递归调用
                        target[name] = jQuery.extend(deep, clone, copy);

                        // 只要不是undefined，就可以赋值
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // 返回被拷贝的对象
        return target;
    };
    zq.extend({
        // 获取域名后缀
        getDomainSuffix: function getDomainSuffix(callback) {
            var url = window.location.href;
            url = url.substring(url.lastIndexOf('/'));
            typeof callback === 'function' && callback(url);
        },
        // 获取对应查询字符串参数值
        getUrlParams: function getUrlParams(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        // 获取查询字符串参数
        getQueryString: function getQueryString() {
            var url = window.location.toString();
            var arrUrl = url.split("?");
            // 获取？号后面的查询字符串
            var para = arrUrl[1];
            // 如果没有查询字符串，返回空，否则返回参数
            para = typeof para == 'undefined' ? '' : '?' + para;
            return para;
        },
        //写cookies
        setCookie: function setCookie(cookieName, cookieValue, seconds, path, domain, secure) {
            var cookiepre = '';
            var cookiedomain = '';
            var cookiepath = '';
            var expires = new Date();
            cookieName = cookiepre + cookieName;
            expires.setTime(expires.getTime() + seconds * 1000);
            domain = !domain ? cookiedomain : domain;
            path = !path ? cookiepath : path;
            document.cookie = escape(cookieName) + '=' + escape(cookieValue) + (expires ? '; expires=' + expires.toGMTString() : '') + (path ? '; path=' + path : '/') + (domain ? '; domain=' + domain : '') + (secure ? '; secure' : '');
        },
        //读取cookies
        getCookie: function getCookie(name) {
            var cookiepre = '';
            name = cookiepre + name;
            var cookie_start = document.cookie.indexOf(name);
            var cookie_end = document.cookie.indexOf(';', cookie_start);
            return cookie_start == -1 ? '' : unescape(decodeURIComponent(document.cookie.substring(cookie_start + name.length + 1, cookie_end > cookie_start ? cookie_end : document.cookie.length)));
        },
        //删除cookies
        delCookie: function delCookie(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(name);
            if (cval != null) {
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        },
        // 设置localStorage
        setLocalStorage: function setLocalStorage(key, value) {
            if (!window.localStorage) {
                console.log("浏览器不支持localstorage");
            } else {
                var storage = window.localStorage;
                if ((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object") {
                    var value = JSON.stringify(value);
                }
                storage.setItem(key, value);
            }
        },
        // 读取localStorage
        getLocalStorage: function getLocalStorage(key) {
            if (!window.localStorage) {
                console.log("浏览器不支持localstorage");
            } else {
                var storage = window.localStorage;
                //将JSON字符串转换成为JSON对象输出
                var value = storage.getItem(key);
                var data = JSON.parse(value);
                if (data) {
                    return data;
                } else {
                    return value;
                }
            }
        },
        // 删除localStorage
        delLocalStorage: function delLocalStorage(key) {
            if (!window.localStorage) {
                console.log("浏览器不支持localstorage");
            } else {
                var storage = window.localStorage;
                if (key == "all") {
                    storage.clear();
                } else {
                    storage.removeItem(key);
                }
            }
        },
        /**
         * regex_check
         * @param str 验证字符串
         * @param reg 正则类型
         * @returns {boolean}
         */
        regexCheck: function regexCheck(str, reg) {
            var regexEnum = {
                mobile: "^1[34578]\\d{9}$", //手机
                letter: "^[A-Za-z]+$", //字母
                letter_u: "^[A-Z]+$", //大写字母
                letter_l: "^[a-z]+$", //小写字母
                email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
                date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", //日期
                idcard: "^(\\d{15}$|^\\d{18}$|^\\d{17}(\\d|X|x))$" //身份证
            };
            var strings = str.replace(/(^\s*)|(\s*$)/g, ""),
                strings = strings.replace(/(\s*$)/g, "");
            var r = eval("regexEnum." + reg);
            var result = new RegExp(r).test(strings);
            return result;
        },
        // 倒计时
        countdown: function countdown(time, tip) {
            var TIME_COUNT = time;
            if (!data.timer) {
                data.count = TIME_COUNT;
                data.timer = setInterval(function () {
                    if (data.count > 0 && data.count <= TIME_COUNT) {
                        data.count--;
                        tip.path[0].innerHTML = data.count + 's';
                    } else {
                        clearInterval(data.timer);
                        tip.path[0].innerHTML = '获取手机验证码';
                        data.timer = null;
                    }
                }, 1000);
            }
        },
        bindKeyEvent: function bindKeyEvent(obj,settings) {
            var defaultSetting = {
               reg:/[1-9]+\.?\d{0,2}/,   //只能输入两位小数
               value:0
            };
            $.extend(defaultSetting, settings);
            obj.keyup(function () {
                var reg = obj.val().match(defaultSetting.reg);
                var txt = '';
                if (reg != null) {
                    txt = reg[0];
                }else{
                    txt=defaultSetting.value;
                }
                obj.val(txt);
            })
        },
        //鼠标移上去显示提示，调用方式
        // $(document).ready(function(){
        //       zq.tipsbox($(".st_buy_double"))
        //    });

        tipsbox: function tipsbox(settings) {
            var defaultSetting = {
                obj: $(".st_tipsbox"),
                position: 'right',
                width: 'more-line',
                align: 'center'
            };
            $.extend(defaultSetting, settings);
            defaultSetting.obj.mouseover(function () {
                var tips = $(this).attr('tips');
                if (!tips) return;
                var top = $(this).offset().top,
                    left = $(this).offset().left,
                    width = $(this).outerWidth(),
                    height = $(this).outerHeight();
                $('<div class="tipsBox ' + defaultSetting.position + '" style="width: ' + defaultSetting.width + ';text-align: ' + defaultSetting.align + '">' + tips + '</div>').appendTo("body");
                var tipsBox = $(".tipsBox");
                if (defaultSetting.width == 'more-line') {
                    if (tipsBox.outerWidth() > 300) {
                        tipsBox.css('width', "300px");
                    } else {
                        tipsBox.css("width", "inherit");
                    }
                }
                var h = tipsBox.outerHeight(),
                    w = tipsBox.outerWidth(),
                    w1 = $(this).outerWidth() / 2;

                if (defaultSetting.position == 'top') {
                    tipsBox.css({
                        top: top - h - 15,
                        left: left - w / 2 + width / 2
                    });
                } else if (defaultSetting.position == 'left') {
                    tipsBox.css({
                        top: top - h / 2 + height / 2,
                        left: left - w - 15
                    });
                } else if (defaultSetting.position == 'right') {
                    tipsBox.css({
                        top: top - h / 2 + height / 2,
                        left: left + w1 * 2 + 20
                    });
                }
            }).mouseleave(function () {
                $(".tipsBox").remove();
            });
        },
        //加减
        addreduce: function addreduce(settings) {
            var defaultSetting = {
                obj: $(".st_addreduce"),
                maxnum: 99999,
                minnum: 0,
                reg:/^[0-9]\d*/,
            };
            $.extend(defaultSetting, settings);
            var length = defaultSetting.maxnum.toString().length;
            var aa = '<div class="i-press-btn clearfix" data-max="'+defaultSetting.maxnum+'" data-min="'+defaultSetting.minnum+'">\n' + '    <span class="i-reduce">-</span>\n' + '    <input class="i-itxt" type="text" maxlength="' + length + '" value="' + defaultSetting.minnum + '"/>\n' + '    <span class="i-increase">+</span>\n' + '</div>';
            defaultSetting.obj.html(aa);
            zq.bindKeyEvent($(".i-itxt"),{     //监听input输入时是否符合格式
                reg:defaultSetting.reg,   //正则正整数
                val:0,
            });
            $(".i-increase").on("click", function () {
                var _val = parseInt($(this).parent().find(".i-itxt").val()) + 1;
                $(this).parent().find(".i-itxt").val(_val);
                if(!ls_reg.test(_val)){
                    $(this).parent().find(".i-itxt").val(0);
                    return;
                };
                if (_val >= defaultSetting.maxnum) {
                    $(this).parent().find(".i-itxt").val(defaultSetting.maxnum);
                    return;
                };
            });

            $(".i-reduce").on("click", function () {
                var _val = parseInt($(this).parent().find(".i-itxt").val()) - 1;
                $(this).parent().find(".i-itxt").val(_val);
                if(!ls_reg.test(_val)){
                    $(this).parent().find(".i-itxt").val(0);
                    return;
                };
                if (_val <= defaultSetting.minnum) {
                    $(this).parent().find(".i-itxt").val(defaultSetting.minnum);
                    return;
                };
            });
            $(".i-itxt").keyup(function () {
                var _val = $(this).val();
                if (_val > defaultSetting.maxnum) {
                    $(this).val(defaultSetting.maxnum);
                }
            });
        },
        // 动态加载js
        loadScript: function loadScript(url, callback) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (typeof callback != "undefined") {
                if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            callback();
                        }
                    };
                } else {
                    script.onload = function () {
                        callback();
                    };
                }
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        }
    });
    // 模块化和挂载
    ~function () {
        // CMD
        if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module && _typeof(module.exports) === "object") {
            module.exports = zq;
        } else {
            // AMD
            if (typeof define === "function" && define.amd) {
                define("zq", [], function () {
                    return zq;
                });
            }
        }

        // 挂载全局变量
        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && _typeof(window.document) === "object") {
            window.zq = zq;
        }
    }();
})(window);