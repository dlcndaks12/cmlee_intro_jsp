/**
 * Created by COSCOI_BS01 on 2016-08-11.
 */
$(function () {
    var cWidth=64+'px';
    var cHeight=64+'px';
    var cImageSrc='../../assets/images/common/loading.gif';

    $.fn.block = function(opt){
        if(opt){
            this.addClass("progress-area");
            this.append('<div class="loader-wrapper"><div id="loaderImage"><img src="'+cImageSrc+'" style="width: '+cWidth+'; height: '+cHeight+';"></div></div>');
        }else{
            console.log('stop');
            this.removeClass('progress-area');
            $(".loader-wrapper").remove();
        }
    };

    /* ==================================== 북마크 첨부 ====================================== */
    $.widget("dwp.bookmark_m", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            position: ['center',20],
            resizable: false,
            draggable: false,
            element: null,
            ajaxOpts: {
                success: function (data) {
                    $("#bookmark-m").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="bookmark-m" title="Basic title"></div>');
            this.element = $("#bookmark-m");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog no-overflow");
            case_options = {
                title: "북마크 첨부하기",
                modal: true,
                width: '100%',
                height: 'auto',
                ajaxOpts: {
                    success: function (data) {
                        $("#bookmark-m").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#bookmark-m").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            console.log("create");
            this.beforeCreateLoadContent();
            this._super();
        },
        _init:function(){
            console.log("init");
            this._super();
        },
        close:function(){
            console.log("close");
            this._super();
        },
        open: function () {
            console.log("open");
            this._innerCase();
            this._super();
        }
        /*
        _destroy: function() {
            console.log("_destroy");
            this._super();
        }*/
    });

    /* ==================================== Alert ====================================== */
    $.widget("dwp.alert_m", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            message:null,
            img:null,
            draggable: false,
            width: 280,
            ajaxOpts: {
                success: function (data) {
                    $("#alert-m").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="alert-m" title="Basic title"></div>');
            this.element = $("#alert-m");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-alert");
            case_options = {
                title: "알림",
                modal: true,
                width: 280,
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#alert-m").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);
            $("#alert-m").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $("#alert-m .dwp-msg-area").html(current.options.message);
            });
            $("#alert-m").parent().css("position","fixed");
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 북마크 공유하기 ====================================== */
    $.widget("dwp.bookmark_share_m", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            position: ['center',20],
            resizable: false,
            draggable: false,
            element: null,
            ajaxOpts: {
                success: function (data) {
                    $("#bookmark-share_m").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="bookmark-share-m" title="Basic title"></div>');
            this.element = $("#bookmark-share-m");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog no-overflow");
            case_options = {
                title: "북마크 공유하기",
                modal: true,
                width: '100%',
                height: 'auto',
                ajaxOpts: {
                    success: function (data) {
                        $("#bookmark-share-m").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#bookmark-share-m").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                $(".dwp-tabs-simple").tabs({
                    active: 0
                });

                $('.close-dialog').on('click', function() {
                    current.close();
                });

                $('.ui-widget-overlay').on('click', function() {
                    $('#bookmark-share-m').dialog('close');
                })
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
                $(".dwp-tabs").tabs({
                    active: 0
                });
                $('.society-area .item-wrap').on('click', function(){
                    $(this).closest('.item').toggleClass('active');
                });
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 비즈카드 ====================================== */
    $.widget("dwp.bizcard_m", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#bizcard-m").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="bizcard-m" title="Basic title"></div>');
            this.element = $("#bizcard-m");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog no-padding");
            case_options = {
                title: "Biz Card",
                width: '100%',
                modal: true,
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#bizcard-m").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);
            $("#bizcard-m").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 비즈카드 ====================================== */
    $.widget("dwp.criminate_m", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#criminate-m").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="criminate-m" title="Basic title"></div>');
            this.element = $("#criminate-m");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog no-overflow");
            case_options = {
                title: "신고하기",
                modal: true,
                width: '100%',
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#criminate-m").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);
            $("#criminate-m").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 근태/급여 ====================================== */
    $.widget("dwp.diligence_m", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#diligence-m").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="diligence-m" title="Basic title"></div>');
            this.element = $("#diligence-m");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog");
            case_options = {
                title: "근태·지급 내역",
                modal: true,
                width: '100%',
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#diligence-m").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);
            $("#diligence-m").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                $('.close-dialog').on('click', function() {
                    current.close();
                });

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });
    /* ==================================== 공유대상 ====================================== */
    $.widget("dwp.btargets_check", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#btargets-check").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="btargets-check" title="Basic title"></div>');
            this.element = $("#btargets-check");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog");
            case_options = {
                title: "공유대상",
                modal: true,
                width: '100%',
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#btargets-check").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);
            $("#btargets-check").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 게시대상 ====================================== */
    $.widget("dwp.targets_dialog", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#targets-dialog").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="targets-dialog" title="Basic title"></div>');
            this.element = $("#targets-dialog");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog no-overflow");
            case_options = {
                title: "게시대상",
                modal: true,
                width: '100%',
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#targets-dialog").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);
            $("#targets-dialog").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 통합일정 반복팝업 ====================================== */
    $.widget("dwp.schedule_repeat", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            title: "",
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#schedule-repeat").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="schedule-repeat" title="Basic title"></div>');
            this.element = $("#schedule-repeat");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog no-overflow");
            case_options = {
                title: "",
                modal: true,
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#schedule-repeat").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 앱 상세 팝업 ====================================== */
    $.widget("dwp.app_set_detail", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            title: "APP 이름",
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#app-set-detail").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="app-set-detail" title="Basic title"></div>');
            this.element = $("#app-set-detail");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog no-overflow");
            case_options = {
                modal: true,
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#app-set-detail").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== PIN번호 변경 팝업 ====================================== */
    $.widget("dwp.pin_setting", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            title: "PIN 번호 변경",
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#pin_setting").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="pin_setting" title="Basic title"></div>');
            this.element = $("#pin_setting");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog no-overflow");
            case_options = {
                modal: true,
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#pin_setting").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 알림메시지 수신기간 설정 팝업 ====================================== */
    $.widget("dwp.office_setting", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            title: "알림메시지 수신기간 지정",
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#office-setting").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="office-setting" title="Basic title"></div>');
            this.element = $("#office-setting");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog no-overflow");
            case_options = {
                modal: true,
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#office-setting").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 전자결재 부결전결 팝업 ====================================== */
    $.widget("dwp.approval", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            title: "",
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#approval").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="approval" title="Basic title"></div>');
            this.element = $("#approval");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog no-overflow");
            case_options = {
                modal: true,
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#approval").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 전자결재 합의동의 팝업 ====================================== */
    $.widget("dwp.consent", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            title: "",
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#consent").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="consent" title="Basic title"></div>');
            this.element = $("#consent");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog no-overflow");
            case_options = {
                modal: true,
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#consent").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 건전써클 문의 팝업 ====================================== */
    $.widget("dwp.circle_inquire", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            title: "문의",
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#circle-inquire").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="circle-inquire" title="Basic title"></div>');
            this.element = $("#circle-inquire");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog");
            case_options = {
                modal: true,
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#circle-inquire").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 모바일앱 등록 팝업 ====================================== */
    $.widget("dwp.appset_add", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            title: "모바일앱 등록",
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#app-add").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="app-add" title="Basic title"></div>');
            this.element = $("#app-add");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog");
            case_options = {
                modal: true,
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#app-add").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });


    /* ==================================== 비밀번호 정책/변경 팝업 ====================================== */
    $.widget("dwp.pw_setting", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            title: "Certification",
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#pw-setting").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="pw-setting" title="Basic title"></div>');
            this.element = $("#pw-setting");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog");
            case_options = {
                modal: true,
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#pw-setting").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== MYCOP ====================================== */
    $.widget("dwp.mycop_m", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#mycop_m").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="mycop_m" title="Basic title"></div>');
            this.element = $("#mycop_m");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog");
            case_options = {
                title: "My CoP",
                modal: true,
                width: '100%',
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#mycop_m").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);
            $("#mycop_m").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                $(".dwp-tabs-simple").tabs({
                    active: 0
                });

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== schedule list ====================================== */
    $.widget("dwp.schedule_list_m", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            dialogClass: 'schedule-list no-overflow',
            resizable: false,
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#schedule-list-m").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="schedule-list-m" title="Basic title"></div>');
            this.element = $("#schedule-list-m");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog");
            case_options = {
                title: "",
                modal: true,
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#schedule-list-m").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);
            $("#schedule-list-m").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 근태-소급내역 팝업 ====================================== */
    $.widget("dwp.diligence2_m", $.ui.dialog, {
        options: {
            title: "소급내역",
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#diligence2-m").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="diligence2_m" title="Basic title"></div>');
            this.element = $("#diligence2_m");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog");
            case_options = {
                title: "소급내역",
                modal: true,
                width: '100%',
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#diligence2_m").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);
            $("#diligence2_m").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                $(".dwp-tabs-simple").tabs({
                    active: 0
                });

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 급여명세서 팝업 ====================================== */
    $.widget("dwp.paystub_m", $.ui.dialog, {
        options: {
            title: "급여명세서",
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#paystub-m").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="paystub_m" title="Basic title"></div>');
            this.element = $("#paystub_m");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog");
            case_options = {
                title: "급여명세서",
                modal: true,
                width: '100%',
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#paystub_m").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);
            $("#paystub_m").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                $(".dwp-tabs-simple").tabs({
                    active: 0
                });

                $('.close-dialog').on('click', function() {
                    current.close();
                });

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== GNB 알림 팝업 ====================================== */
    $.widget("dwp.gnb_activity_m", $.ui.dialog, {
        options: {
            title: "Activity Stream",
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#gnb-activity-m").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="gnb_activity_m" title="Basic title"></div>');
            this.element = $("#gnb_activity_m");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog");
            case_options = {
                title: "Activity Stream",
                modal: true,
                width: '100%',
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#gnb_activity_m").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);
            $("#gnb_activity_m").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                $(".dwp-tabs-simple").tabs({
                    active: 0
                });

                $('.close-dialog').on('click', function() {
                    current.close();
                });

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 근태-소급상세 팝업 ====================================== */
    $.widget("dwp.diligence3_m", $.ui.dialog, {
        options: {
            title: "소급내역",
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            draggable: false,
            ajaxOpts: {
                success: function (data) {
                    $("#diligence3-m").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="diligence3_m" title="Basic title"></div>');
            this.element = $("#diligence3_m");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("mobile-dialog");
            case_options = {
                title: "소급내역",
                modal: true,
                width: '100%',
                resizable: false,
                ajaxOpts: {
                    success: function (data) {
                        $("#diligence3_m").html(data);
                    }
                },
                open: function() {
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    })
                }
            };
            $.extend(true, this.options, case_options);
            $("#diligence3_m").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                $(".dwp-tabs-simple").tabs({
                    active: 0
                });

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
        },
        _create: function () {
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            this._innerCase();
            this._super();
        }
    });
});