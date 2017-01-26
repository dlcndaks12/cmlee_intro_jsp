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

    $.reposition = function (element) {
        var element_w = element.offset().left;
        var element_h = element.offset().top;

        var limit_w = $(window).width() / 2;
        var limit_h = $(window).height() / 2;

        var position = {};
        var at = "";
        var my = "";

        if (element_w < limit_w && element_h < limit_h) {
            at = "left bottom";
            my = "left top";
        } else if (element_w <= limit_w && element_h >= limit_h) {
            at = "left top";
            my = "left bottom";
        } else if (element_w > limit_w && element_h > limit_h) {
            at = "right top";
            my = "right bottom";
        } else if (element_w >= limit_w && element_h <= limit_h) {
            at = "right bottom";
            my = "right top";
        }
        position = {
            at: at,
            my: my,
            of: element
        };

        return position;
    };

    $.numericToCurrency  = function(currency){
        var parts = currency.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    $.currencyToNumeric= function(currency){
        var parts = currency.toString().split(".");
        parts[0] = parts[0].replace(/[^\d]+/g, '');
        return parts.join(".");
    }

    /*iniput validation*/
    $.fn.inputValidation = function(){
        $(this).find("input[type='text']").each(function(){
            if($(this).hasClass("num-type")){
                $(this).css("text-align","right");
                var regExp = /^[0-9\-]+$/;
                $(this).keyup(function(){
                    if(!regExp.test($(this).val())){
                        $(this).val($(this).val().slice(0,-1));
                    }
                });
            }else if($(this).hasClass("en-type")){

                var regExp = /^[a-zA-Z]+$/;
                $(this).keyup(function(){
                    if(!regExp.test($(this).val())){
                        $(this).val($(this).val().slice(0,-1));
                    }
                });
            }else if($(this).hasClass("email-type")){
                var regExp = /^[0-9a-zA-Z]([\-.\w]*[0-9a-zA-Z\-_+])*@([0-9a-zA-Z][\-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}$/;
                $(this).focusout(function(){
                    if(!regExp.test($(this).val())){
                        $(this).val("");
                    }
                });
            }else if($(this).hasClass("numeric-type")){
                $(this).css("text-align","right");
                var regExp = /^[0-9\,]+\b[\.]?[0-9]*$/;
                $(this).keyup(function(){
                    if(!regExp.test($(this).val())){
                        $(this).val($(this).val().slice(0,-1));
                    }else{
                        var currency = $.currencyToNumeric($(this).val());
                        currency = $.numericToCurrency(currency);
                        $(this).val(currency);
                    }
                });
            }else if($(this).hasClass("date-type")){
                var regExp = /^[0-9\-]+$/;
                $(this).keyup(function(){
                    if(!regExp.test($(this).val())){
                        $(this).val($(this).val().slice(0,-1));
                    }
                });
            }
        });
    };

    /* ==================================== 비즈카드 ====================================== */
    $.widget("dwp.mail_drag", $.ui.draggable, {
        _create: function () {
            console.log("create");
            this._super();
        },
        _init:function(){
            console.log("init");
            this._super();
        }
    });

    /* ==================================== 비즈카드 ====================================== */
    $.widget("dwp.bizcard", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            ajaxOpts: {
                success: function (data) {
                    $("#bizcard").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="bizcard" title="Basic title"></div>');
            this.element = $("#bizcard");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("titleless");
            case_options = {
                title: "Biz card",
                modal: false,
                width: 418,
                ajaxOpts: {
                    success: function (data) {
                        $("#bizcard").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                $(current.element).inputValidation();

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

    /* ==================================== 메세지 토스트 ====================================== */
    $.widget("dwp.msg_toast", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },

            message:null,
            img:null,
            clearTime:null,
            draggable: false,
            resizable: false,
            position:{
              at:"right bottom",
              my:"right bottom",
              of:window
            },
            width: 420,
            ajaxOpts: {
                success: function (data) {
                    $("#msg-toast").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="msg-toast" title="Basic title"></div>');
            this.element = $("#msg-toast");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("titleless");
            this.element.parent().addClass("btnless");
            case_options = {
                modal: false,
                width: 420,
                height: 156,
                ajaxOpts: {
                    success: function (data) {
                        $("#msg-toast").html(data);

                        if(current.options.clearTime!=null){
                            clearTimeout(current.options.clearTime);
                        }

                        current.options.clearTime = setTimeout( function() {
                            current.close();
                        }, 5000);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                $(current.element).inputValidation();

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
                $(".msg-toast-btn").click(function(){
                    current.close();
                });

                $("#msg-toast .dwp-photo-area > .photo > img").attr("src",current.options.img);
                $("#msg-toast .dwp-msg-area").html(current.options.message);

            });

            $("#msg-toast").parent().css("position","fixed");
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

    /* ==================================== 알림 토스트 ====================================== */
    $.widget("dwp.alert_toast", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            resizable: false,
            message:null,
            dialogClass: 'small',
            img:null,
            draggable: false,
            position:{
                at:"center",
                my:"center",
                of:window
            },
            width: 300,
            ajaxOpts: {
                success: function (data) {
                    $("#alert-toast").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="alert-toast" title="Basic title"></div>');
            this.element = $("#alert-toast");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("titleless");
            this.element.parent().addClass("btnless");
            case_options = {
                modal: false,
                width: 300,
                ajaxOpts: {
                    success: function (data) {
                        $("#alert-toast").html(data);
                        setTimeout( function() {
                            current.close();
                        }, 2500);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                $(current.element).inputValidation();

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }
            });
            $("#alert-toast").parent().css("position","fixed");
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

    /* ==================================== 나의 북마크 첨부하기 ====================================== */
    $.widget( "dwp.bookmark", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#bookmark").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="bookmark" title="Basic title"></div>');
            this.element = $("#bookmark");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal: true,
                draggable: false,
                title: "나의 북마크 첨부하기",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },

                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#bookmark").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#bookmark").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                $(document).on("click", "#bookmark .dwp-btn.cancel", function() {
                    current.close();
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 신고하기 ====================================== */
    $.widget( "dwp.criminate", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#criminate").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="criminate" title="Basic title"></div>');
            this.element = $("#criminate");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal: true,
                draggable: false,
                title: "신고하기",
                width: 420,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },

                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#criminate").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#criminate").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                $(document).on("click", "#criminate .dwp-btn.cancel", function() {
                    current.close();
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 북마크 공유하기 ====================================== */
    $.widget( "dwp.bookmark_share", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#bookmark-share").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="bookmark-share" title="Basic title"></div>');
            this.element = $("#bookmark-share");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal: true,
                draggable: false,
                title: "북마크 공유하기",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },

                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });

                    $(document).on("click", "#bookmark-share .dwp-btn.cancel", function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#bookmark-share").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#bookmark-share").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 포틀릿 설정 팝업 ====================================== */
    $.widget( "dwp.portlet_setting", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#portlet-setting").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="portlet-setting" title="Basic title"></div>');
            this.element = $("#portlet-setting");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal: true,
                draggable: false,
                title: "환경설정",
                width: 736,
                height: 505,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },

                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });

                    $(document).on("click", "#portlet-setting .dwp-btn.cancel", function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#portlet-setting").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#portlet-setting").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });


    /* ==================================== 전자결재 문서첨부완료함 팝업 ====================================== */
    $.widget( "dwp.add_doc", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#add-doc").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="add-doc" title="Basic title"></div>');
            this.element = $("#add-doc");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal: true,
                draggable: false,
                title: "문서첨부",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },

                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });

                    $(document).on("click", "#add-doc .dwp-btn.cancel", function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#add-doc").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#add-doc").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();
                $(".dwp-tabs").tabs({
                    active: 0
                });
                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 전자결재 문서첨부 북마크 팝업 ====================================== */
    $.widget( "dwp.add_doc_bookmark", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#add-doc-bookmark").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="add-doc-bookmark" title="Basic title"></div>');
            this.element = $("#add-doc-bookmark");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal: true,
                draggable: false,
                title: "문서첨부",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },

                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });

                    $(document).on("click", "#add-doc-bookmark .dwp-btn.cancel", function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#add-doc-bookmark").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#add-doc-bookmark").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();
                $(".dwp-tabs").tabs({
                    active: 0
                });
                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });


    /* ==================================== 앱정보 상세 팝업 ====================================== */
    $.widget( "dwp.app_detail", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#app-detail").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="app-detail" title="Basic title"></div>');
            this.element = $("#app-detail");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal: true,
                draggable: false,
                title: "메신저",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },

                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#app-detail").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#app-detail").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                /* 미리보기 클릭시 */
                $('.prev button').on("click", function () {
                    $(this).closest(".prev").toggleClass("active");
                });

                /* 여닫기 클릭시 */
                $(".btn-toggle").off().on("click", function() {
                    $(this).closest(".detail-desc-area, .auth-area").toggleClass("open").siblings().removeClass("open");
                });

                if(!$('.auth-area .dwp-card-wrap').hasClass("mCustomScrollbar")) {
                    $('.auth-area .dwp-card-wrap').mCustomScrollbar({
                        theme: 'dark-3'
                    });
                }

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 간략 일정등록 팝업 ====================================== */
    $.widget( "dwp.schedule_simple_write", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#schedule-simple-write").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="schedule-simple-write" title="Basic title"></div>');
            this.element = $("#schedule-simple-write");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal: true,
                draggable: false,
                title: "간략 일정 등록",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },

                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });


                },
                ajaxOpts: {
                    success: function (data) {
                        $("#schedule-simple-write").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#schedule-simple-write").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                /* 알람체크시 숨겨진 셀렉트박스 나오는 기능*/
                $(".alert-chk input").on("click", function() {
                    if($(".alert-chk input:checked").length > 0) {
                        $(this).closest(".alert-chk").addClass("active");
                    }else {
                        $(".alert-chk").removeClass("active");
                    }
                });

                /* selectbox 직접입력시 등록캘린더 나오는 기능 */
                $(".time-select").on("change", function () {
                    var opt = $(this).val();

                    if(opt == "direct") {
                        $(".sel-time").addClass('active');
                    } else  {
                        $(".sel-time").removeClass('active');
                    }
                });

                $(document).on("click", "#schedule-simple-write .dwp-btn.lg.cancel", function() {
                    current.close();
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });



    /* ==================================== workflow 네임피커 사용자 지정, 부서 지정 ====================================== */
    $.widget( "dwp.workflow", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#workflow").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="workflow" title="Basic title"></div>');
            this.element = $("#workflow");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal: true,
                draggable: false,
                title: "Workflow",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },

                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                    $(document).on("click", "#workflow .dwp-btn.cancel", function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#workflow").html(data);

                        if($(".tree .dynatree-container").length < 1) {
                            $(".tree").dynatree({
                                checkbox:true,
                                initAjax: {
                                    url: current.options.treeAjax.url
                                },
                                helper: "clone",
                                dnd: {
                                    /* 폴더는 드래그 안되게 */
                                    onDragStart: function(node) {
                                        if(node.data.isFolder){
                                         return false;
                                         }
                                        return true;
                                    }
                                }
                            });
                        }

                        /* 드래그 앤 드랍 */
                        if(!$(".dwp-list-body").hasClass(".ui-droppable")) {
                            $(".dwp-list-body").droppable({
                                hoverClass: "drophover",
                                addClasses: true,
                                over: function(event, ui) {
                                    logMsg("droppable.over, %o, %o", event, ui);
                                },
                                drop: function(event, ui) {
                                    current.addMember();
                                    current.deselect();
                                }
                            });
                        }
                        $(".dwp-tabs").tabs({
                            active: 0
                        });

                        /* 추가 버튼 클릭시 */
                        $(document).on("click", ".btn-add", function() {
                            current.addMember();
                        });

                        /* 삭제 버튼 클릭시 */
                        $(document).on("click", ".btn-del", function() {
                            $(".dwp-list-body .dwp-item.active").remove();
                        });

                        /* 취소 버튼 클릭시 */
                        $(document).on("click", ".workflow-cancel-btn", function() {
                            current.close();
                        });

                        /* X 버튼 클릭시 */
                        $(document).on("click", ".dwp-list-body .dwp-item .btn-cancel", function() {
                            $(this).closest(".dwp-item").remove();
                        });

                        /* 전체삭제 버튼 클릭시 */
                        $(document).on("click", ".btn-all-del", function() {
                            $(".dwp-list-body .dwp-item").remove();
                        });

                        /* 오른쪽 영역의 아이템 클릭시 표시 */
                        $(document).on("click", ".dwp-list-body .dwp-item", function() {
                            $(this).toggleClass("active");
                        });

                        if(typeof current.options.doSomething == 'function'){
                            current._trigger("doSomething");
                        }
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#workflow").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }


            });
        },
        deselect:function(){
            $(".tree").dynatree("getRoot").visit(function(dtnode){
                dtnode.select(false);
            });
            return false;
        },
        addMember:function(){
            var current = this;
            var target = $(".dwp-list-body");
            var selected = $(".tree").dynatree("getSelectedNodes");

            for(var i = 0; i < selected.length; i++) {
                var key = selected[i].data.key;
                var title = selected[i].data.title;
                var folder = (selected[i].data.isFolder)?"is-folder":"";
                var item =  "<div class='dwp-item "+ folder + "' data-key='"+key+"'>";
                item += title;
                item += "<button type='button' class='btn-cancel'>삭제</button>";
                item += "</div>";

                if(!selected[i].data.isFolder) {
                    var flag = false;

                    /* 중복검사 */
                    $(".dwp-list-body .dwp-item").each(function() {
                        var selKey = $(this).attr("data-key");
                        if(selKey == key) {
                            flag = true;
                        }
                    });

                    if(!flag) {
                        target.append(item);
                    }
                }
            }
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 네임피커 메일 ====================================== */
    $.widget( "dwp.mail_namepicker", $.ui.dialog, {
        options: {
            modal: true,
            draggable: false,

            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            treeData:null,
            jsonData:{
                receive:[],
                refer:[],
                blind:[]
            },
            treeAjax:{
                url:null
            },
            ajaxOpts:{
                success:function(data){
                    $("#mail-namepicker").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="mail-namepicker" title="Basic title"></div>');
            this.element = $("#mail-namepicker");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        deselect:function(){
            $("#tree").dynatree("getRoot").visit(function(dtnode){
                dtnode.select(false);
            });
            return false;
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;


            this.element.parent().addClass("dwp-modal");
            case_options = {
                title: "수신",
                width: 736,
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#mail-namepicker").html(data);
                    }
                },
                open: function () {
                    $('.ui-widget-overlay').on('click', function () {
                        current.close();
                    });
                }
            };

            $.extend(true,this.options,case_options);

            $("#mail-namepicker").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;

            $.ajax(current.options.ajaxOpts).done(function(){

                if($("#tree .dynatree-container").length < 1) {
                    $("#tree").dynatree({
                        checkbox:true,
                        initAjax: {
                            url: current.options.treeAjax.url
                        },
                        helper: "clone",
                        dnd: {
                            /* 폴더는 드래그 안되게 */
                            onDragStart: function(node) {
                                if(node.data.isFolder){
                                    return false;
                                }
                                return true;
                            }
                        }
                    });
                }

                /* 드래그 앤 드랍 */
                if(!$(".dwp-list-body").hasClass(".ui-droppable")) {

                    $(".dwp-item").draggable({
                        cursor:"move",
                        helper: function(){
                            return '<span id="dragIcon"></span>';
                        },
                        containment:".dwp-form-scroll",
                        start: function (e, ui) {
                            ui.helper.animate({
                                width: 80,
                                height: 50
                            });
                        },
                        cursorAt: {left:10, top:10}
                    });

                    $(".dwp-list-body").droppable({
                        hoverClass: "drophover",
                        addClasses: true,
                        over: function (event, ui) {
                            logMsg("droppable.over, %o, %o", event, ui);
                        },
                        drop: function (event, ui) {
                            var list = [];
                            if (ui.draggable[0].id != 'tree') {
                                current.addMember($(event.target), current.options.jsonData, $(ui.draggable[0]).parent().children());
                            } else {
                                current.addMember($(event.target), current.options.jsonData);
                                current.deselect();
                            }
                            $(".dwp-item").draggable({
                                cursor: "move",
                                helper: function(){
                                    return '<span id="dragIcon"></span>';
                                },
                                containment: ".dwp-form-scroll",
                                start: function (e, ui) {
                                    ui.helper.animate({
                                        width: 80,
                                        height: 50
                                    });
                                },
                                cursorAt: {left: 10, top: 10}
                            });
                        }
                    });
                }
                $(".dwp-tabs").tabs({
                    active: 0
                });

                /* 수신 버튼 클릭시 */
                $(document).on("click", ".btn-add.receive", function() {
                    current.addMember($(".form-receive .dwp-list-body"),treeData);
                    if(!$(".dwp-list-body").hasClass(".ui-droppable")) {

                        $(".dwp-item").draggable({
                            cursor:"move",
                            helper: function(){
                                return '<span id="dragIcon"></span>';
                            },
                            containment:".dwp-form-scroll",
                            start: function (e, ui) {
                                ui.helper.animate({
                                    width: 80,
                                    height: 50
                                });
                            },
                            cursorAt: {left:10, top:10}
                        });

                        $(".dwp-list-body").droppable({
                            hoverClass: "drophover",
                            addClasses: true,
                            over: function (event, ui) {
                                logMsg("droppable.over, %o, %o", event, ui);
                            },
                            drop: function (event, ui) {
                                var list = [];
                                if (ui.draggable[0].id != 'tree') {
                                    current.addMember($(event.target), current.options.jsonData, $(ui.draggable[0]).parent().children());
                                } else {
                                    current.addMember($(event.target), current.options.jsonData);
                                    current.deselect();
                                }
                                $(".dwp-item").draggable({
                                    cursor: "move",
                                    helper: function(){
                                        return '<span id="dragIcon"></span>';
                                    },
                                    containment: ".dwp-form-scroll",
                                    start: function (e, ui) {
                                        ui.helper.animate({
                                            width: 80,
                                            height: 50
                                        });
                                    },
                                    cursorAt: {left: 10, top: 10}
                                });
                            }
                        });
                    }
                });

                /* 참조 버튼 클릭시 */
                $(document).on("click", ".btn-add.refer", function() {
                    current.addMember($(".form-refer .dwp-list-body"),treeData);
                    if(!$(".dwp-list-body").hasClass(".ui-droppable")) {

                        $(".dwp-item").draggable({
                            cursor:"move",
                            helper: function(){
                                return '<span id="dragIcon"></span>';
                            },
                            containment:".dwp-form-scroll",
                            start: function (e, ui) {
                                ui.helper.animate({
                                    width: 80,
                                    height: 50
                                });
                            },
                            cursorAt: {left:10, top:10}
                        });

                        $(".dwp-list-body").droppable({
                            hoverClass: "drophover",
                            addClasses: true,
                            over: function (event, ui) {
                                logMsg("droppable.over, %o, %o", event, ui);
                            },
                            drop: function (event, ui) {
                                var list = [];
                                if (ui.draggable[0].id != 'tree') {
                                    current.addMember($(event.target), current.options.jsonData, $(ui.draggable[0]).parent().children());
                                } else {
                                    current.addMember($(event.target), current.options.jsonData);
                                    current.deselect();
                                }
                                $(".dwp-item").draggable({
                                    cursor: "move",
                                    helper: function(){
                                        return '<span id="dragIcon"></span>';
                                    },
                                    containment: ".dwp-form-scroll",
                                    start: function (e, ui) {
                                        ui.helper.animate({
                                            width: 80,
                                            height: 50
                                        });
                                    },
                                    cursorAt: {left: 10, top: 10}
                                });
                            }
                        });
                    }
                });

                /* 비밀참조 버튼 클릭시 */
                $(document).on("click", ".btn-add.blind", function() {
                    current.addMember($(".form-blind-refer .dwp-list-body"),treeData);
                    if(!$(".dwp-list-body").hasClass(".ui-droppable")) {

                        $(".dwp-item").draggable({
                            cursor:"move",
                            helper: function(){
                                return '<span id="dragIcon"></span>';
                            },
                            containment:".dwp-form-scroll",
                            start: function (e, ui) {
                                ui.helper.animate({
                                    width: 80,
                                    height: 50
                                });
                            },
                            cursorAt: {left:10, top:10}
                        });

                        $(".dwp-list-body").droppable({
                            hoverClass: "drophover",
                            addClasses: true,
                            over: function (event, ui) {
                                logMsg("droppable.over, %o, %o", event, ui);
                            },
                            drop: function (event, ui) {
                                var list = [];
                                if (ui.draggable[0].id != 'tree') {
                                    current.addMember($(event.target), current.options.jsonData, $(ui.draggable[0]).parent().children());
                                } else {
                                    current.addMember($(event.target), current.options.jsonData);
                                    current.deselect();
                                }
                                $(".dwp-item").draggable({
                                    cursor: "move",
                                    helper: function(){
                                        return '<span id="dragIcon"></span>';
                                    },
                                    containment: ".dwp-form-scroll",
                                    start: function (e, ui) {
                                        ui.helper.animate({
                                            width: 80,
                                            height: 50
                                        });
                                    },
                                    cursorAt: {left: 10, top: 10}
                                });
                            }
                        });
                    }
                });

                /* 삭제 버튼 클릭시 */
                $(document).on("click", ".btn-del", function() {
                    $(".dwp-list-body .dwp-item.active").remove();
                });

                /* X 버튼 클릭시 */
                $(document).on("click", ".dwp-list-body .dwp-item .btn-cancel", function() {
                    $(this).closest(".dwp-item").remove();
                });

                /* 전체삭제 버튼 클릭시 */
                $(document).on("click", ".btn-all-del", function() {
                    $(".dwp-list-body .dwp-item").remove();
                });

                /* 오른쪽 영역의 아이템 클릭시 표시 */
                $(document).on("click", ".dwp-list-body .dwp-item", function() {
                    $(this).toggleClass("active");
                });

                $(document).on("click","#mail-namepicker .dwp-btn.cancel",function(){
                   current.close();
                });

                $(document).on("click","#mail-namepicker .dwp-btn.confirm",function(){
                    console.log(current.options.jsonData);
                });

                $(current.element).inputValidation();


            });
        },
        addMember:function(element,treeData,sideItem){
            var current = this;
            /* 오른쪽 영역으로 멤버 추가 함수 */
            var target = element;/*$(".dwp-list-body");*/
            var selected = [];
            if(typeof sideItem == 'undefined'){
                selected = $("#tree").dynatree("getSelectedNodes");

                for(var i = 0; i < selected.length; i++) {
                    var key = selected[i].data.key;
                    var title = selected[i].data.title;

                    var item = "<div class='dwp-item' data-key='" + key + "'>";
                    item += "<span>"+title+"</span>";
                    item += "<button type='button' class='btn-cancel'>삭제</button>";
                    item += "</div>";

                    if (!selected[i].data.isFolder) {
                        var flag = false;

                        /* 중복검사 */
                        $(".dwp-list-body .dwp-item").each(function () {
                            var selKey = $(this).attr("data-key");
                            if (selKey == key) {
                                flag = true;
                            }
                        });
                        if (!flag) {
                            target.append(item);
                            if (target.parent().hasClass("form-receive")) {
                                treeData.receive.push({"title": title, "key": key});
                            } else if (target.parent().hasClass("form-refer")) {
                                treeData.refer.push({"title": title, "key": key});
                            } else {
                                treeData.blind.push({"title": title, "key": key});
                            }
                        }
                    }
                }
            }else{

                var selected = [];

                for(i=0;i<sideItem.length;i++){
                    if($(sideItem[i]).hasClass("active")){
                        selected.push({"data":{
                            "title":$(sideItem[i]).children("span").text(),
                            "key":$(sideItem[i]).attr("data-key"),
                            "isFolder":false
                        }});
                    };
                }

                for(var i = 0; i < selected.length; i++) {
                    var key = selected[i].data.key;
                    var title = selected[i].data.title;

                    var item = "<div class='dwp-item' data-key='" + key + "'>";
                    item += "<span>"+title+"</span>";
                    item += "<button type='button' class='btn-cancel'>삭제</button>";
                    item += "</div>";

                    if (!selected[i].data.isFolder) {
                        var flag = false;

                        /* 중복검사 */
                        $(".dwp-list-body .dwp-item").each(function () {
                            var selKey = $(this).attr("data-key");
                            if (selKey == key) {
                                $(this).remove();
                            }
                        });
                        target.append(item);
                        $(".dwp-list-body .dwp-item").droppable(current.options.dropOts);
                        if (target.parent().hasClass("form-receive")) {
                            treeData.receive.push({"title": title, "key": key});
                        } else if (target.parent().hasClass("form-refer")) {
                            treeData.refer.push({"title": title, "key": key});
                        } else {
                            treeData.refer.push({"title": title, "key": key});
                        }
                    }
                }
            }
            return treeData;

        },
        _create:function(){
            this.options.treeData = {
                receive: [],
                refer:[],
                blind:[]
            };
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 보기설정 ====================================== */
    $.widget( "dwp.setting", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#setting").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="setting" title="Basic title"></div>');
            this.element = $("#setting");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal:false,
                draggable: false,
                title: "보기설정",
                width: 324,

                ajaxOpts: {
                    success: function (data) {
                        $("#setting").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#setting").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                $(document).on("click", "#setting .dwp-btn.cancel", function() {
                    current.close();
                });
                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 엑셀 다운로드 ====================================== */
    $.widget( "dwp.excel_datepicker", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#excel-datepicker").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="excel-datepicker" title="Basic title"></div>');
            this.element = $("#excel-datepicker");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal:false,
                draggable: false,
                title: "기간지정",
                width: 398,

                ajaxOpts: {
                    success: function (data) {
                        $("#excel-datepicker").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#excel-datepicker").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){
                $( ".dwp-calendar-form input[type='text']" ).datepicker({
                    showOn: "button",
                    dateFormat: "yy-mm-dd",
                    buttonImage: "../../assets/images/common/empty.png",
                    buttonImageOnly: true,
                    buttonText: "Select date"
                });
                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    } );

    /* ==================================== 조회자 목록보기 ====================================== */
    $.widget( "dwp.viewers", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#viewers").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="viewers" title="Basic title"></div>');
            this.element = $("#viewers");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal:false,
                draggable: false,
                title: "조회현황",
                width: 420,

                ajaxOpts: {
                    success: function (data) {
                        $("#viewers").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#viewers").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    } );

    /* ==================================== 첨부파일목록 ====================================== */
    $.widget( "dwp.files", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            resizable: false,
            ajaxOpts:{
                success:function(data){
                    $("#files").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="files" title="Basic title"></div>');
            this.element = $("#files");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal:false,
                draggable: false,
                title: "첨부파일",
                width: 324,

                ajaxOpts: {
                    success: function (data) {
                        $("#files").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#files").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){
                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        _init:function(){
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        },
        close:function(){
            /*this._size();*/
            this._position();
            this._super();
        },
        _size:function(){
            console.log("_size");
            this._super();
        }
    } );

    /* ==================================== GNB 메일/결재/통합알리미 ====================================== */
    $.widget("dwp.gnb_form", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            ajaxOpts: {
                success: function (data) {
                    $("#gnb-form").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="gnb-form" title="Basic title"></div>');
            this.element = $("#gnb-form");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "신규메일",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#gnb-form").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                $(".gnb-form-area").mCustomScrollbar({
                    theme:"dark-3"
                });
                $("#gnb-form").prev().children(".ui-dialog-title").html(current.options.title+"(<div class='num'>"+$("#gnb-form .item").length+"</div>)");
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create: function () {
            console.log("create");
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            console.log("open");
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 사용자 profile ====================================== */
    $.widget("dwp.profile", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            ajaxOpts: {
                success: function (data) {
                    $("#profile").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="profile" title=""></div>');
            this.element = $("#profile");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("orange-head no-overflow");
            case_options = {
                title: "",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#profile").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(".modify-area .btn-modify").on("click", function() {
                    $(this).closest(".value").addClass("active");
                });
                $(".modify-area .input-area .btn-modify-cancel").on("click", function() {
                    $(this).closest(".value").removeClass("active");
                });

                $(current.element).inputValidation();
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

    /* ==================================== App icon ====================================== */
    $.widget("dwp.app_icon", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            ajaxOpts: {
                success: function (data) {
                    $("#app-icon").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="app-icon" title="Basic title"></div>');
            this.element = $("#app-icon");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "App",
                modal: false,
                width: 418,
                ajaxOpts: {
                    success: function (data) {
                        $("#app-icon").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#app-icon").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(".app-icon-area").mCustomScrollbar({
                    theme:"dark-3",
                    scrollbarPosition: "outside"
                });

                $(current.element).inputValidation();
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

    /* ==================================== 전자결재 양식 가이드 ====================================== */
    $.widget("dwp.form_guide", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            ajaxOpts: {
                success: function (data) {
                    $("#form-guide").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="form-guide" title="Basic title"></div>');
            this.element = $("#form-guide");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "해외출장 품의서",
                modal: false,
                width: 736,
                ajaxOpts: {
                    success: function (data) {
                        $("#form-guide").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#form-guide").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                $(".gnb-form-area").mCustomScrollbar({
                    theme:"dark-3"
                });
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create: function () {
            console.log("create");
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            console.log("open");
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 전자결재 권한위임 ====================================== */
    $.widget("dwp.entrust", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            ajaxOpts: {
                success: function (data) {
                    $("#form-guide").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="entrust" title="Basic title"></div>');
            this.element = $("#entrust");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "권한위임",
                modal: true,
                width: 736,
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#entrust").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#entrust").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create: function () {
            console.log("create");
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            console.log("open");
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 전자결재 변경이력 ====================================== */
    $.widget("dwp.change_log", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            ajaxOpts: {
                success: function (data) {
                    $("#form-guide").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="entrust" title="Basic title"></div>');
            this.element = $("#entrust");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "변경이력",
                modal: true,
                width: 420,
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#entrust").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#entrust").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create: function () {
            console.log("create");
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            console.log("open");
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 전자결재 결재선 불러오기 ====================================== */
    $.widget("dwp.approval_open", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            ajaxOpts: {
                success: function (data) {
                    $("#approval-open").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="approval-open" title="Basic title"></div>');
            this.element = $("#approval-open");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "결재선 불러오기",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#approval-open").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#approval-open").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                $(".gnb-form-area").mCustomScrollbar({
                    theme:"dark-3"
                });
                /* 취소 버튼 클릭시 */
                $(document).on("click", "#approval-open .dwp-btn.cancel", function() {
                    current.close();
                });
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create: function () {
            console.log("create");
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            console.log("open");
            this._innerCase();
            this._super();
        },
        close:function(){
            this._super();
        }
    });

    /* ==================================== 전자결재 결재선 저장 ====================================== */
    $.widget("dwp.approval_save", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            ajaxOpts: {
                success: function (data) {
                    $("#approval-save").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="approval-save" title="Basic title"></div>');
            this.element = $("#approval-save");
            var copyOpts = this.options.ajaxOpts;
            console.log(copyOpts);
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "결재선 저장",
                modal: false,
                width: 324,
                ajaxOpts: {
                    success: function (data) {
                        $("#approval-save").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#approval-save").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                /* 취소 버튼 클릭시 */
                $(document).on("click", "#approval-save .dwp-btn.cancel", function() {
                    current.close();
                });
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create: function () {
            console.log("create");
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            console.log("open");
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 전자결재 결재 ====================================== */
    $.widget("dwp.approval_consent", $.ui.dialog, {
        options: {
            resizable: false,
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            dialogClass: 'approval-type-dialog',
            ajaxOpts: {
                success: function (data) {
                    $("#approval_consent").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="approval-consent" title="Basic title"></div>');
            this.element = $("#approval-consent");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "결재",
                modal: true,
                width: 1080,
                ajaxOpts: {
                    success: function (data) {
                        $("#approval-consent").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#approval-consent").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                /* 취소 버튼 클릭시 */
                $(document).on("click", "#approval-consent .dwp-btn.cancel", function() {
                    current.close();
                });
                $(".dwp-tabs").tabs({
                    active: 0
                });
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create: function () {
            console.log("create");
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            console.log("open");
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 전자결재 합의 요청/부결 ====================================== */
    $.widget("dwp.approval_consent_offer", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            ajaxOpts: {
                success: function (data) {
                    $("#approval-save-offer").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="approval-consent-offer" title="Basic title"></div>');
            this.element = $("#approval-consent-offer");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "합의요청/부결",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#approval-consent-offer").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#approval-consent-offer").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {
                /* 취소 버튼 클릭시 */
                $(document).on("click", "#approval-consent-offer .dwp-btn.cancel", function() {
                    current.close();
                });

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create: function () {
            console.log("create");
            this.beforeCreateLoadContent();
            this._super();
        },
        open: function () {
            console.log("open");
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 전자결재 결재정보 ====================================== */
    $.widget( "dwp.approval_info", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#approval-info").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="approval-info" title="Basic title"></div>');
            this.element = $("#approval-info");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal: true,
                draggable: false,
                title: "결재정보",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },

                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#approval-info").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#approval-info").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                $(document).on("click", "#approval-info .dwp-btn.cancel", function() {
                    current.close();
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 메일 이동 ====================================== */
    $.widget("dwp.mail_move", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            draggable: false,

            ajaxOpts: {
                success: function (data) {
                    $("#approval_consent").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="mail-move" title="Basic title"></div>');
            this.element = $("#mail-move");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "메일이동",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#mail-move").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#mail-move").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                /* 취소 버튼 클릭시 */
                $(document).on("click", "#mail-move .dwp-btn.cancel", function() {
                    current.close();
                });
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
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



    /* ==================================== GNB 결재대기 팝업 ====================================== */
    $.widget("dwp.gnb_approval_wait", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            dialogClass: 'no-overflow',
            element: null,
            draggable: false,

            ajaxOpts: {
                success: function (data) {
                    $("#gnb-approval-wait").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="gnb-approval-wait" title="Basic title"></div>');
            this.element = $("#gnb-approval-wait");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "결재대기",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#gnb-approval-wait").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                /* 취소 버튼 클릭시 */
                $(document).on("click", "#gnb-approval-wait .dwp-btn.cancel", function() {
                    current.close();
                });

                $(".gnb-form-area").mCustomScrollbar({
                    theme:"dark-3"
                });
                $("#gnb-approval-wait").prev().children(".ui-dialog-title").html(current.options.title+"(<div class='num'>"+$("#gnb-approval-wait .item").length+"</div>)");
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
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

    /* ==================================== GNB 결재미결 ====================================== */
    $.widget("dwp.gnb_approval_yet", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            dialogClass: 'no-overflow',
            element: null,
            draggable: false,

            ajaxOpts: {
                success: function (data) {
                    $("#gnb-approval-yet").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="gnb-approval-yet" title="Basic title"></div>');
            this.element = $("#gnb-approval-yet");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "결재미결",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#gnb-approval-yet").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#gnb-approval-yet").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                /* 취소 버튼 클릭시 */
                $(document).on("click", "#gnb-approval-yet .dwp-btn.cancel", function() {
                    current.close();
                });
                $("#gnb-approval-yet").prev().children(".ui-dialog-title").html(current.options.title+"(<div class='num'>"+$("#gnb-approval-yet .item").length+"</div>)");
                $(".gnb-form-area").mCustomScrollbar({
                    theme:"dark-3"
                });

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
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

    /* ==================================== GNB 신규메일 ====================================== */
    $.widget("dwp.gnb_mail", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            dialogClass: 'no-overflow',
            element: null,
            draggable: false,

            ajaxOpts: {
                success: function (data) {
                    $("#gnb-mail").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="gnb-mail" title="Basic title"></div>');
            this.element = $("#gnb-mail");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "신규메일",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#gnb-mail").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                /* 취소 버튼 클릭시 */
                $(document).on("click", "#gnb-mail .dwp-btn.cancel", function() {
                    current.close();
                });

                $(".gnb-form-area").mCustomScrollbar({
                    theme:"dark-3"
                });
                $("#gnb-mail").prev().children(".ui-dialog-title").html(current.options.title+"(<div class='num'>"+$("#gnb-mail .item").length+"</div>)");

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
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

    /* ==================================== GNB 통합알리미 ====================================== */
    $.widget("dwp.gnb_activity_stream", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            dialogClass: 'no-overflow',
            draggable: false,

            element: null,
            ajaxOpts: {
                success: function (data) {
                    $("#gnb-activity-stream").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="gnb-activity-stream" title="Basic title"></div>');
            this.element = $("#gnb-activity-stream");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "Activity Stream",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#gnb-activity-stream").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                /* 취소 버튼 클릭시 */
                $(document).on("click", "#gnb-activity-stream .dwp-btn.cancel", function() {
                    current.close();
                });

                $(".gnb-form-area").mCustomScrollbar({
                    theme:"dark-3"
                });
                $("#gnb-activity-stream").prev().children(".ui-dialog-title").html(current.options.title+"(<div class='num'>"+$("#gnb-activity-stream .item").length+"</div>)");
                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
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


    /* ==================================== 전자결재 분류관리 ====================================== */
    $.widget("dwp.approval_classify_manage", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            draggable: false,

            ajaxOpts: {
                success: function (data) {
                    $("#approval-classify-manage").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="approval-classify-manage" title="Basic title"></div>');
            this.element = $("#approval-classify-manage");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "분류관리",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#approval-classify-manage").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#approval-classify-manage").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                /* 취소 버튼 클릭시 */
                $(document).on("click", "#approval-classify-manage .dwp-btn.cancel", function() {
                    current.close();
                });

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
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

    /* ==================================== 전자결재 분류추가 ====================================== */
    $.widget("dwp.approval_classify_add", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            draggable: false,

            ajaxOpts: {
                success: function (data) {
                    $("#approval-classify-add").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="approval-classify-add" title="Basic title"></div>');
            this.element = $("#approval-classify-add");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "분류추가",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#approval-classify-add").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#approval-classify-add").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                /* 취소 버튼 클릭시 */
                $(document).on("click", "#approval-classify-add .dwp-btn.cancel", function() {
                    current.close();
                });

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
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

    /* ==================================== 일정 반복 팝업 ====================================== */
    $.widget("dwp.schedule_repeat", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
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
            case_options = {
                title: "분류추가",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#schedule-repeat").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#schedule-repeat").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                /* 취소 버튼 클릭시 */
                $(document).on("click", "#schedule-repeat .dwp-btn.cancel", function() {
                    current.close();
                });

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $( ".dwp-calendar-form input[type='text']" ).datepicker({
                    showOn: "button",
                    dateFormat: "yy-mm-dd",
                    buttonImage: "../../assets/images/common/empty.png",
                    buttonImageOnly: true,
                    buttonText: "Select date"
                });

                $(current.element).inputValidation();
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

    /* ==================================== 회의실 월간 예약현황 팝업 ====================================== */
    $.widget("dwp.conference_detail", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            draggable: false,

            ajaxOpts: {
                success: function (data) {
                    $("#conference-detail").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="conference-detail" title="Basic title"></div>');
            this.element = $("#conference-detail");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#conference-detail").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
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


    /* ==================================== 결제합의 네임피커 ====================================== */
    $.widget( "dwp.apag_namepicker", $.ui.dialog, {
        options: {
            modal: true,
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            dialogClass: "approval-dialog-type",
            treeData:null,
            jsonData:{
                receive:null,
                refer:null,
                blind:null
            },
            ajaxOpts:{
                success:function(data){
                    $("#apag-namepicker").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="apag-namepicker" title="Basic title"></div>');
            this.element = $("#apag-namepicker");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var approval_consent_list = this.options.approval_consent_list;
            var current = this;
            var case_options = {};

            this.element.parent().addClass("dwp-modal");
            case_options = {
                modal:true,
                title: "결재선",
                width: 1228,
                height: 600,
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#apag-namepicker").html(data);
                        /* 왼쪽 트리 */

                        console.log("tree open");
                        $(".tree").dynatree({
                            checkbox:true,
                            skinClass: "className",
                            initAjax: {
                                url: current.options.treeAjax.url
                            },
                            helper: "clone",
                            dnd: {
                                /* 폴더는 드래그 안되게 */
                                onDragStart: function(node) {
                                    if(node.data.isFolder){
                                        return false;
                                    }
                                    return true;
                                }
                            }
                        });
                        /* 드래그 앤 드랍 */
                        if(!$(".dwp-list-body").hasClass(".ui-droppable")) {

                            $(".approval-body").droppable({
                                hoverClass: "tree-hover",
                                addClasses: true,
                                drop: function(event, ui) {
                                    current.makeTree($(this));
                                    current.addMember($(this));
                                    current.deselect();
                                }
                            });
                        }
                    }
                },
                open: function () {
                    /* 검은막 클릭시 dialog 닫힘 */
                    $('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });

                    $(document).on("click", "#apag-namepicker .dwp-btn.cancel", function() {
                        current.close();
                    });
                }
            };

            $.extend(true,this.options,case_options);

            $("#apag-namepicker").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;

            $.ajax(current.options.ajaxOpts).done(function(){
                /* 결재 추가 버튼 클릭시 */
                $(document).on("click", ".btn-add.approval", function() {
                    current.makeTree($(".approval-body"));
                    current.addMember();
                });

                /* 합의 추가 버튼 클릭시 */
                $(document).on("click", ".btn-add.consent", function() {
                    var data_key="";
                    if($(".approval-body .dwp-item.active").length!=0){
                        data_key = $(".approval-body .dwp-item.active").attr("data-key");
                    }else{
                        return;
                    }
                    var index = $(".approval-body .dwp-item.active").children("span").text() -1;
                    var selected = $(".tree").dynatree("getSelectedNodes");
                    for(var i =0; i<selected.length;i++){
                        if(index != -1){
                            if(index ==0){
                                return;
                            }
                            if(!current.overlapCheck(selected[i])) {
                                var approval_consent = {};
                                approval_consent.title = selected[i].data.title;
                                approval_consent.key = selected[i].data.key;
                                approval_consent.isFolder = false;
                                approval_consent.division = "ag";
                                approval_consent.approval = approval_consent_list[index].key;
                                approval_consent_list[index].children.push(approval_consent);
                            }
                        }
                    }

                    current.addMember($(".approval-body"),data_key);
                });

                /*올리기 버튼 누를시*/
                $(document).on("click", ".dwp-btn.icon.up-style", function() {
                    var $this = $(".dwp-form-area .dwp-item.active");
                    var data_key = $this.attr("data-key");

                    if($this.length==0){
                        return;
                    }

                    if($this.parent().parent().hasClass("approval-body")){
                        var parent = $this.children("span").text() -1;
                        if(parent!=0 && parent!=1){
                            var clone = $.extend(true,{}, approval_consent_list);
                            approval_consent_list.splice(parent,1);
                            approval_consent_list.splice(parent-1,0,clone[parent]);
                        }
                        current.addMember("approval-body",data_key);
                    }else{
                        var parent = $this.parent().attr("data-parent");
                        var child = $this.children("button").attr("data-child");
                        if(parent!=0 && parent !=1){
                            var clone = $.extend(true,{}, approval_consent_list);
                            approval_consent_list[parent].children.splice(child,1);
                            clone[parent].children[child].approval = approval_consent_list[parent-1].key;
                            approval_consent_list[parent-1].children.push(clone[parent].children[child]);
                        }
                        current.addMember("approval-body",data_key);
                    }
                });

                /*내리기 버튼 누를시*/
                $(document).on("click", ".dwp-btn.icon.down-style", function() {
                    var $this = $(".dwp-form-area .dwp-item.active");
                    var data_key = $this.attr("data-key");

                    if($this.length==0){
                        return;
                    }

                    if($this.parent().parent().hasClass("approval-body")){
                        var parent = Number($this.children("span").text()) -1;
                        if((approval_consent_list.length-1) != parent && parent !=0){
                            var clone = $.extend(true,{}, approval_consent_list);
                            approval_consent_list.splice(parent,1);
                            approval_consent_list.splice(parent+1,0,clone[parent]);
                        }
                        current.addMember("approval-body",data_key);
                    }else{
                        var parent = Number($this.parent().attr("data-parent"));
                        var child = Number($this.children("button").attr("data-child"));
                        if((approval_consent_list.length-1) != parent && parent !=0){
                            var clone = $.extend(true,{}, approval_consent_list);
                            approval_consent_list[parent].children.splice(child,1);
                            clone[parent].children[child].approval = approval_consent_list[parent+1].key;
                            approval_consent_list[parent+1].children.push(clone[parent].children[child]);
                        }
                        current.addMember("approval-body",data_key);
                    }
                });

                /* X 버튼 클릭시 */
                $(document).on("click", "#apag-namepicker .dwp-list-body .approval-body .dwp-item .btn-cancel", function() {
                    var index = ($(this).prev("span").text()-1);
                    approval_consent_list.splice(index , 1);
                    current.addMember($(".approval-body"));
                });

                $(document).on("click", "#apag-namepicker .dwp-list-body .consent-body .dwp-item .btn-cancel", function() {
                    var parent = $(this).parent().parent().attr("data-parent");
                    var child = $(this).attr("data-child");
                    approval_consent_list[parent].children.splice(child,1);
                    current.addMember();
                });

                /* 전체삭제 버튼 클릭시 */
                $(document).on("click", "#apag-namepicker .btn-all-del", function() {
                    var clone = $.extend(true,{},approval_consent_list);
                    approval_consent_list = [];
                    approval_consent_list.push(clone[0]);
                    current.options.approval_consent_list = approval_consent_list;
                    current.addMember($(".approval-body"));
                });


                /* 확인 버튼 클릭시 */
                $(document).on("click", "#apag-namepicker .dwp-btn.confirm", function() {
                    var data = [];
                    data.push(approval_consent_list[0]);
                    for(var i=1; i<approval_consent_list.length;i++){
                        /*if(approval_consent_list[i].children.length!=0){*/
                            for(var j=0; j<approval_consent_list[i].children.length;j++){
                                data.push(approval_consent_list[i].children[j]);
                            }
                            data.push(approval_consent_list[i]);
                        /*}*/
                    }
                    console.log(data);
                });

                /* 오른쪽 영역의 아이템 클릭시 표시 */
                $(document).on("click", ".dwp-list-body .dwp-item", function() {
                    $(this).toggleClass("active");
                    $(".dwp-form-area .dwp-item").not($(this)).removeClass("active");
                });

                $(".approval-area input").keyup(function(e){
                    var json = {division:"ap",isFolder:false,key:"test",title:"테스트",children:[]};
                    current.approvalAdd(json);
                });

                $(".consent-area input").keyup(function(e){
                    var json = {division:"ag",isFolder:false, key:"test2",title:"테스트2"};
                    current.consentAdd(json);
                });

                if(typeof current.options.saveApproval == 'function'){
                    current._trigger("saveApproval");
                }

                if(typeof current.options.loadApproval == 'function'){
                    current._trigger("loadApproval");
                }

                if(current.options.approval_consent_list.length != 0){
                    current.addMember();
                }

                $(".dwp-tabs").tabs({
                    active: 0
                });

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        deselect:function(){
            $(".tree").dynatree("getRoot").visit(function(dtnode){
                dtnode.select(false);
            });
            return false;
        },
        overlapCheck:function(selectedItem){
            if(!selectedItem.data.isFolder) {
                var flag = false;
                var key = selectedItem.data.key;
                $(".dwp-list-body .dwp-item").each(function() {
                    var selKey = $(this).attr("data-key");
                    if(selKey == key) {
                        flag = true;
                    }
                });
                return flag;
            }else{
                return true;
            }
        },
        addCheck:function(json){
            var flag = false;
            var key = json.key;
            $(".dwp-list-body .dwp-item").each(function() {
                var selKey = $(this).attr("data-key");
                if(selKey == key) {
                    flag = true;
                }
            });
            return flag;
        },
        approvalAdd:function(json){
            if(!this.addCheck(json)){
                var approval_consent_list = this.options.approval_consent_list;
                approval_consent_list.push(json);
                this.addMember();
            }
        },
        consentAdd:function(json){
            if(!this.addCheck(json)) {
                var approval_consent_list = this.options.approval_consent_list;
                if (approval_consent_list.length != 1) {
                    if ($(".approval-body .dwp-item.active .num").text() == "") {
                        approval_consent_list[approval_consent_list.length - 1].children.push(json);
                    } else {
                        var index = Number($(".approval-body .dwp-item.active .num").text()) - 1;
                        approval_consent_list[index].children.push(json);
                    }
                }
                this.addMember();
            }

        },
        makeTree:function(element,dropIndex){

            console.log(dropIndex);
            var target = element;/*$(".dwp-list-body")*/
            var selected = $(".tree").dynatree("getSelectedNodes");
            var approval_consent_list = this.options.approval_consent_list;

            for(var i = 0; i < selected.length; i++) {
                if(!selected[i].data.isFolder) {
                    var flag = false;
                    var key = selected[i].data.key;
                    /* 중복검사 */
                    $(".dwp-list-body .dwp-item").each(function() {
                        var selKey = $(this).attr("data-key");
                        if(selKey == key) {
                            flag = true;
                        }
                    });
                    if(!flag) {
                        var approval_consent = {};
                        if(target.hasClass("approval-body")){
                            approval_consent.title = selected[i].data.title;
                            approval_consent.key = selected[i].data.key;
                            approval_consent.isFolder = false;
                            approval_consent.division = "ap";
                            approval_consent.children = [];
                            if(typeof dropIndex != 'undefined'){
                                approval_consent_list.splice(dropIndex,0,approval_consent);
                            }else{
                                approval_consent_list.push(approval_consent);
                            }
                        }else if(target.parent().parent().hasClass("consent-body")){
                            approval_consent.title = selected[i].data.title;
                            approval_consent.key = selected[i].data.key;
                            approval_consent.isFolder = false;
                            approval_consent.division = "ag";
                            approval_consent.approval = approval_consent_list[target.parent().attr("data-parent")].key;
                            if(typeof approval_consent_list[target.parent().attr("data-parent")].children=='undefined'){
                                approval_consent_list[target.parent().attr("data-parent")].children = [];
                            }
                            approval_consent_list[target.parent().attr("data-parent")].children.push(approval_consent);
                        }
                    }
                }
            }
        },
        addMember:function(element,data_key) {
            var approval_consent_list = this.options.approval_consent_list;
            var current = this;
            var target = element;

            $(".item-wrap").each(function(){
                $(this).remove();
            });

            for(var i = 0; i < approval_consent_list.length; i++) {
                var key = approval_consent_list[i].key;
                var title = approval_consent_list[i].title;
                var children = approval_consent_list[i].children;
                console.log("child");
                console.log(approval_consent_list);

                var approvalItem =  "<div class='item-wrap'>";
                if(typeof approval_consent_list[i].children != 'undefined' && approval_consent_list[i].children.length!=0){
                    var height = Number(approval_consent_list[i].children.length * 46) + "px";
                    approvalItem += "<div class='dwp-item' data-key='"+key+"' style='height:"+height+"'>";
                }else{
                    approvalItem += "<div class='dwp-item' data-key='"+key+"' style='height:'''>";
                }
                approvalItem += '<span class="num">'+(i+1)+'</span>';
                approvalItem += title;
                approvalItem += "<button type='button' class='btn-cancel'>삭제</button>";
                approvalItem += "</div>";
                /*if(typeof approval_consent_list[i].children != 'undefined' && approval_consent_list[i].children.length!=0){
                    for(var j=1;j<children.length;j++){
                        approvalItem += "<div class='empty-item no-border'></div>"
                    }
                }*/
                approvalItem += "</div>";

                $(".approval-body").append(approvalItem);


                var consentItem = "<div class='item-wrap' data-parent='"+i+"'>";
                if(typeof approval_consent_list[i].children != 'undefined' && approval_consent_list[i].children.length!=0){
                    for(var j=0;j<children.length;j++){
                        consentItem += "<div class='dwp-item' data-key='"+children[j].key+"'>";
                        consentItem += children[j].title;
                        consentItem += "<button type='button' data-child='"+j+"' class='btn-cancel'>삭제</button>";
                        consentItem += "</div>";
                    }
                }else{
                    consentItem +="<div class='empty-item'></div>";
                }
                consentItem += "</div>";

                $(".consent-body").append(consentItem);
            }

            if(typeof data_key !='undefined'){
                $(".dwp-item").each(function(){
                    if($(this).attr("data-key")==data_key){
                        $(this).addClass("active");
                    }
                })
            }


            $(".approval-body .dwp-item").draggable({
                cursor:"move",
                helper: 'clone',
                containment:".approval-body",
                start:function(){
                    if(!$(this).hasClass("active")){
                        return false;
                    }
                }
            });

            $(".consent-body .dwp-item").draggable({
                cursor:"move",
                helper: 'clone',
                containment:".consent-body",
                start:function(){
                    if(!$(this).hasClass("active")){
                        return false;
                    }
                }
            });

            $(".approval-body .dwp-item").droppable({
                hoverClass: "dwp-item-drophover",
                addClasses: true,
                drop: function(event, ui) {
                    if(!$(ui.draggable).hasClass("active")){
                        return;
                    }

                    var dropIndex = Number($(event.target).children("span").text())-1;

                    if(dropIndex  == 0) {
                        return;
                    }

                    if($(ui.draggable).closest(".tree").length==1){
                        current.makeTree($(event.target),dropIndex);
                        current.addMember($(event.target));
                        current.deselect();
                    }else{
                        var dragIndex = Number($(ui.draggable).children("span").text())-1;
                        var clone = $.extend(true,{}, approval_consent_list);
                        approval_consent_list.splice(dragIndex,1);
                        approval_consent_list.splice(dropIndex,0,clone[dragIndex]);
                        current.addMember("approval-body",$(ui.draggable).attr("data-key"));
                    }

                }
            });

            $(".consent-body .dwp-item").droppable({
                addClasses: true,
                over:function(){
                  $(this).parent().addClass("consent-hover");
                },
                drop: function(event, ui) {
                    $(this).parent().removeClass("consent-hover");
                    current.consentDrop(event,ui);
                }
            });

            $(".consent-body .empty-item").droppable({
                addClasses: true,
                drop: function(event, ui) {
                    current.consentDrop(event,ui);
                }
            });
        },
        consentDrop:function(event,ui){
            var current = this;
            var approval_consent_list = this.options.approval_consent_list;
            var dropParent = Number($(event.target).parent().attr("data-parent"));

            if(dropParent == 0) {
                return;
            }
            if($(ui.draggable).closest(".tree").length==1){
                current.makeTree($(event.target));
                current.addMember($(event.target));
                current.deselect();
            }else{
                var dragParent = Number($(ui.draggable).parent().attr("data-parent"));
                var dragChild = Number($(ui.draggable).children("button").attr("data-child"));

                if(dragParent == dropParent){
                    return;
                }

                var clone = $.extend(true,{}, approval_consent_list);

                approval_consent_list[dragParent].children.splice(dragChild,1);
                clone[dragParent].children[dragChild].approval = approval_consent_list[dropParent].key;
                approval_consent_list[dropParent].children.push(clone[dragParent].children[dragChild]);
                current.addMember("approval-body",$(ui.draggable).attr("data-key"));
            }
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        },
        close:function(){
            this._super();
            $("body").approval_open("close");
            $("body").approval_save("close");
        }
    });



    /* ==================================== VPR/CoP 팝업 ====================================== */
    $.widget("dwp.schedule_vpr_cop", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            draggable: false,

            ajaxOpts: {
                success: function (data) {
                    $("#schedule-vpr-cop").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="schedule-vpr-cop" title="Basic title"></div>');
            this.element = $("#schedule-vpr-cop");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "내캘린더 관리",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#schedule-vpr-cop").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#schedule-vpr-cop").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {


                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(".dwp-tabs").tabs({
                    active: 0
                });

                $(".dwp-btn.confirm").on("click",function(){
                   current.close();
                });

                $(current.element).inputValidation();
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



    /* ==================================== 라이브폴  팝업 ====================================== */
    $.widget( "dwp.vpr_livepoll_answer", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#vpr-livepoll-answer").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="vpr-livepoll-answer" title="Basic title"></div>');
            this.element = $("#vpr-livepoll-answer");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal: true,
                draggable: false,

                title: "라이브폴 답변",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#vpr-livepoll-answer").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#vpr-livepoll-answer").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 문서이동 팝업 ====================================== */
    $.widget("dwp.work_docmove", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            draggable: false,

            ajaxOpts: {
                success: function (data) {
                    $("#work-docmove").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="work-docmove" title="Basic title"></div>');
            this.element = $("#work-docmove");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "문서이동",
                modal: false,
                width: 324,
                ajaxOpts: {
                    success: function (data) {
                        $("#work-docmove").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#work-docmove").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {


                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(".dwp-tabs").tabs({
                    active: 0
                });

                $(".dwp-btn.confirm").on("click",function(){
                    current.close();
                });

                $(".dwp-btn.cancel").on("click",function(){
                    current.close();
                });

                $(current.element).inputValidation();
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

    /* ==================================== 썸네일 선택 팝업 ====================================== */
    $.widget("dwp.thumb_select", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            draggable: false,

            ajaxOpts: {
                success: function (data) {
                    $("#thumb-select").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="thumb-select" title="Basic title"></div>');
            this.element = $("#thumb-select");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "썸네일 선택",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#thumb-select").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#thumb-select").prev().children(".ui-dialog-title").text(this.options.title);
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

    /* ==================================== 앱담당자 조회 팝업 ====================================== */
    $.widget( "dwp.app_manager", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#app-manager").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="app-manager" title="Basic title"></div>');
            this.element = $("#app-manager");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal: true,
                draggable: false,

                title: "App 담당자",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#app-manager").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#app-manager").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();


                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 메모 팝업 ====================================== */
    $.widget( "dwp.memopad", $.ui.dialog, {
        options: {
            autoOpen:true,
            draggable: false,
            dialogClass: 'memo-type',

            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#memopad").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="memopad" title="Basic title"></div>');
            this.element = $("#memopad");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("bg-gray");
            case_options = {
                modal: true,
                draggable: false,

                title: "메모장",
                width: 736,
                height: 680,
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#memopad").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#memopad").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                $('.memo-contents').mCustomScrollbar({
                    theme: 'dark-3',
                    scrollbarPosition: "outside"
                });

                /* drag n drop 관련 */
                $(".memo-container").sortable({
                    connectWith: ".memo-container",
                    placeholder: "portlet-placeholder",
                    scroll: true,
                    start: function(e, ui) {
                        ui.placeholder.height(ui.item.outerHeight() - 9);
                    },
                    change: function(e, ui) {
                    },
                    stop: function(e, ui) {
                        ui.item.removeClass('hover');
                    }
                });

                /* 수정시 */
                $(document).on("click", ".memo-item .article", function() {

                    var $this = $(this).closest('.memo-item');
                    var title = current.lineAlignmentForTextArea($this.find(".title").html());
                    var article = current.lineAlignmentForTextArea($this.find(".article").html());

                    $(".modify-area .input-title textarea").val(title);
                    $(".modify-area .input-article textarea").val(article);
                    $(".modify-area").addClass("active");

                    current.autoSize();
                    $('.dwp-textarea').find( 'textarea' ).keyup();

                    $('.modify-form .dwp-btn').off().on("click",function(){
                        var title = current.lineAlignmentForHtml($(this).closest('.aligner').siblings('.input-title').find('textarea').val());
                        var article = current.lineAlignmentForHtml($(this).closest('.aligner').siblings('.input-article').find('textarea').val());
                        $this.find('.title').html(title);
                        $this.find('.article').html(article);
                        $(".modify-area").removeClass("active");
                    });
                });

                /* 메모작성 영역에 포커스 in 됐을때 입력폼 확장 */
                $(".input-form .input-title textarea").off().on("focusin", function() {
                    $(this).closest(".input-form").addClass("active");
                });

                /* 메모작성 영역에 포커스 out 됐을때 입력폼 축소 */
                $("body").on("click", function() {
                    $(".memo-contents .input-form").removeClass("active");
                });
                $(".memo-contents .input-form").on("click", function(e) {
                    e.stopPropagation();
                });

                $(document).on("click", ".modify-area", function() {
                    $(this).removeClass("active");
                });

                $(document).on("click", ".modify-form", function(e) {
                    e.stopPropagation();
                });

                $(document).on("click",'.btn-wrap .btn-delete',function(e){
                    $(this).closest('.memo-item').remove();
                    e.stopPropagation();
                });

                /* 영역 확장 축소 */
                $(".btn-wrap .btn-expand").off().on("click",function() {
                    $(this).closest(".memo-item").toggleClass("long-type");
                });

                /* 컬러 선택 */
                $('.btn-wrap .btn-modify input').colorPicker({
                    colors: [
                        "ea5504", "ed6c00", "f49c00", "a68900","ccaf00", "eddd59", /* 컬러 A */
                        "338d27", "6fba2c", "cfe188", "006dbb","009ce1", "7ecef4", /* 컬러 B */
                        "727171", "929494", "c9caca", "683900","8f5400", "c49a69", /* 컬러 C */
                        "ac725e", "d06b64", "f83a22", "fa573c","ff7537", "ffad46", /* 컬러 D */
                        "42d692", "16a765", "7bd148", "b3dc6c","fbe983", "fad165", /* 컬러 E */
                        "92e1c0", "9fe1e7", "9fc6e7", "4986e7","9a9cff", "b99aff", /* 컬러 F */
                        "c2c2c2", "cabdbf", "cca6ac", "f691b2","cd74e6", "a47ae2" /* 컬러 G */
                    ],
                    onColorChange : function(id, newValue) {
                        $("#"+id).closest(".memo-item").css("background-color",newValue);
                    }
                });

                $(".article-save").off().on("click",function(){
                    var title = current.lineAlignmentForHtml($(".input-form .input-title textarea").val());
                    var article = current.lineAlignmentForHtml($(".input-form .input-article textarea").val());
                    current.setMemo(title,article);

                    $(".input-form .input-title textarea").val("");
                    $(".input-form .input-article textarea").val("");
                    $(".input-form").removeClass("active");
                });

                current.autoSize();

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }

                /* 더미 데이터 추가 */
                for(var i=1; i<=5; i++) {
                    current.setMemo(i,i);
                }
            });
        },
        autoSize: function(){
            $('.dwp-textarea').on( 'keyup', 'textarea', function (e){
                $(this).css('height', 'auto' );
                $(this).height( this.scrollHeight );

                console.log('asdfasdf');
            });
            /*$('.dwp-textarea').find( 'textarea' ).keyup();*/
        },

        lineAlignmentForHtml: function(str){
            return str.split('\n').join('<br>');
        },
        lineAlignmentForTextArea: function(str){
            return str.split('<br>').join('\n');
        },
        setMemo: function(title,article){
            var compare = 99999;
            var $position = $(".memo-container").eq(0);

            /* 한칸씩 뒤로 미는 로직 */
            var contIdx = 0;
            var itemLength = $(".memo-item").length;

            for(var i = 0; i < itemLength; i++) {
                var $cut = $(".memo-container").eq(contIdx).children().eq(0).detach();

                contIdx++;
                if(contIdx > 2) {
                    contIdx = 0;
                }

                $(".memo-container").eq(contIdx).append($cut);
            }

            var html = '<div class="memo-item ui-sortable-handle">'
            html+= '<div class="title">'+title+'</div>';
            html+= '<div class="article">'+article+'</div>';
            html+= '<div class="modi-date">수정된 시간 : <span class="date">2016.09.08</span></div>';
            html+= '<div class="btn-wrap">';
            html+= '<a class="btn-expand"><img src="../../assets/images/common/icon-expand.svg" alt="" class="mCS_img_loaded"></a>';
            html+= '<a class="btn-modify"><input type="text" id="test3" value="#333333" /></a>';
            html+= '<a class="btn-delete"><img src="../../assets/images/common/icon-close-md.svg" alt="" class="mCS_img_loaded"></a>';
            html+= '</div>';
            html+= '</div>';

            $position.prepend(html);

            /* 컬러 선택 */
            $('.btn-wrap .btn-modify input[type="text"]').colorPicker({
                colors: [
                    "ea5504", "ed6c00", "f49c00", "a68900","ccaf00", "eddd59", /* 컬러 A */
                    "338d27", "6fba2c", "cfe188", "006dbb","009ce1", "7ecef4", /* 컬러 B */
                    "727171", "929494", "c9caca", "683900","8f5400", "c49a69", /* 컬러 C */
                    "ac725e", "d06b64", "f83a22", "fa573c","ff7537", "ffad46", /* 컬러 D */
                    "42d692", "16a765", "7bd148", "b3dc6c","fbe983", "fad165", /* 컬러 E */
                    "92e1c0", "9fe1e7", "9fc6e7", "4986e7","9a9cff", "b99aff", /* 컬러 F */
                    "c2c2c2", "cabdbf", "cca6ac", "f691b2","cd74e6", "a47ae2" /* 컬러 G */
                ],
                onColorChange : function(id, newValue) {
                    $("#"+id).closest(".memo-item").css("background-color",newValue);
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 파일 미리보기 팝업 ====================================== */
    $.widget( "dwp.file_preview", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,
            resizable: false,

            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#file-preview").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="file-preview" title="Basic title"></div>');
            this.element = $("#file-preview");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,
                resizable: false,

                title: "미리보기",
                width: 736,
                height: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#file-preview").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#file-preview").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                $("img").load(function(){
                    $('.preview-area .img-list').slick({
                        arrows: true,
                        slideToShow: 1,
                        infinite: true,
                        adaptiveHeight: true
                    });
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 환경설정 팝업 ====================================== */
    $.widget( "dwp.gnb_setting", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#gnb-setting").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="gnb-setting" title="Basic title"></div>');
            this.element = $("#gnb-setting");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "환경설정",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#gnb-setting").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#gnb-setting").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();
                $(".dwp-tabs-simple").tabs({
                    active: 0
                });
                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 설문조사 팝업 ====================================== */
    $.widget( "dwp.research_question", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,
            resizable: false,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#research-question").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="research-question" title="Basic title"></div>');
            this.element = $("#research-question");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "질문추가",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#research-question").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#research-question").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                $(document).on("click",".dwp-btn.cancel",function(){
                   current.close();
                });

                $(".q-option-list").sortable({
                    stop:function(e,ui){
                        var $this = $(ui.item[0]);
                        if($this.closest(".row-area").length == 1){
                            current.numChange($this.parent(".q-option-list"),"행");
                        }else if($(this).closest(".col-area").length == 1){
                            current.numChange($this.parent(".q-option-list"),"열");
                        }
                    }
                });

                $(document).on("change","#main-sel",function(){
                    current.defaultSet();
                    $(".row.question."+ $(this).val()).find('.textless').removeClass("active");
                    if($(this).val() == 'radio_type'){
                        $(".row.question."+ $(this).val()).find('.dwp-radio').addClass("active");

                        /* 2016.10.24 추가된 부분 */
                        $(".q-option.etc").removeClass("none");
                        if($(".q-option.etc").length < 1) {
                            $(".dwp-add-btn.btn-etc").removeClass("none");
                        }

                    }else if($(this).val() == 'checkbox_type'){
                        $(".row.question."+ $(this).val()).find('.dwp-checkbox').addClass("active");

                        /* 2016.10.24 추가된 부분 */
                        $(".q-option.etc").removeClass("none");
                        if($(".q-option.etc").length < 1) {
                            $(".dwp-add-btn.btn-etc").removeClass("none");
                        }

                    /* 2016.10.24 추가된 부분 */
                    }
                    if($(this).val() == 'dropdown_type'){
                        $(".dwp-add-btn.btn-etc").addClass("none");
                        $(".q-option.etc").addClass("none");
                    }

                    $(".row.question."+ $(this).val()).addClass("active");
                });

                $(document).on("change","#range-min",function(){
                    $(".range-min").html($(this).val());
                });
                $(document).on("change","#range-max",function(){
                    $(".range-max").html($(this).val());
                });

                $(".dwp-add-btn").off().on("click",function(){
                    var $clone = $(this).siblings(".q-option-list").find(".q-option").first().clone();
                    $clone.find("input").val("");

                    /* 2016.10.24 추가된 부분 */
                    if($(this).hasClass("btn-etc")) {
                        $clone.addClass("etc").find("input").attr({
                            readonly: "readonly",
                            placeholder: "기타"
                        });
                        $clone.find(".q-add-img").remove();
                        $(".dwp-add-btn.btn-etc").addClass("none");
                    }
 
                    /* 2016.10.24 수정된 부분 */
                    $(this).siblings(".q-option-list").children(".q-option").not(".etc").last().after($clone);

                    if($(this).closest(".row-area").length == 1){
                        current.numChange($(this).prev(".q-option-list"),"행");
                    }else if($(this).closest(".col-area").length == 1){
                        current.numChange($(this).prev(".q-option-list"),"열");
                    }
                });

                $(document).on("click", ".del-btn",function(){
                    /* 2016.10.24 수정된 부분 */
                    var length = $(this).closest(".q-option-list").children(".q-option").not(".etc").length;

                    /* 2016.10.24 추가된 부분 */
                    if($(this).closest(".q-option").hasClass("etc")) {
                        $(".dwp-add-btn.btn-etc").removeClass("none");
                        $(this).closest(".q-option").remove();
                    }

                    if(length == 1){
                        return;
                    }
                    $(this).closest(".q-option").remove();
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        defaultSet: function (){
            $(".row").not(".except").removeClass("active");
        },
        numChange: function (doc,str){
            var array = doc.find(".q-option");
            for(var i=0;i<array.length;i++){
                console.log(str + Number(i+1));
                $(array.find(".q-title")[i]).html(str + Number(i+1));
            }
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 기존 설문지 불러오기 팝업 ====================================== */
    $.widget( "dwp.research_load", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            ajaxOpts:{
                success:function(data){
                    $("#research-load").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="research-load" title="Basic title"></div>');
            this.element = $("#research-load");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "기존 설문지 불러오기",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#research-load").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#research-load").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                $(document).on("click",".dwp-btn .cancel",function(){
                    current.close();
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 라이브폴 결과 팝업 ====================================== */
    $.widget( "dwp.vpr_livepoll_result", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            ajaxOpts:{
                success:function(data){
                    $("#vpr-livepoll-result").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="vpr-livepoll-result" title="Basic title"></div>');
            this.element = $("#vpr-livepoll-result");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "라이브폴 답변",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#vpr-livepoll-result").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#vpr-livepoll-result").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 포스트(Post) 팝업 ====================================== */
    $.widget( "dwp.vpr_post", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            ajaxOpts:{
                success:function(data){
                    $("#vpr-post").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="vpr-post" title="Basic title"></div>');
            this.element = $("#vpr-post");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "Post",
                width: 570,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#vpr-post").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#vpr-post").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 메일 발신취소/수신확인 팝업 ====================================== */
    $.widget( "dwp.mail_reception", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            ajaxOpts:{
                success:function(data){
                    $("#mail-reception").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="mail-reception" title="Basic title"></div>');
            this.element = $("#mail-reception");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "Post",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#mail-reception").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#mail-reception").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 메일 발송 팝업 ====================================== */
    $.widget( "dwp.mail_test", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,
            dialogClass: "dwp-dialog-mail",
            ajaxOpts:{
                success:function(data){
                    $("#mail-test").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="mail-test" title="Basic title"></div>');
            this.element = $("#mail-test");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "Post",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                open: function() {
                    var upbtn = '<button type="button" class="ui-button ui-corner-all ui-widget ui-button-icon-only"><span class="ui-button-icon ui-icon dialog-up"></span></button>';
                    var downbtn = '<button type="button" class="ui-button ui-corner-all ui-widget ui-button-icon-only"><span class="ui-button-icon ui-icon dialog-down"></span></button>';

                    $(".ui-dialog-titlebar-close").before(upbtn);
                    $(".ui-dialog-titlebar-close").before(downbtn);

                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#mail-test").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#mail-test").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 메일 규칙설정 팝업 ====================================== */
    $.widget( "dwp.mail_rule", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            ajaxOpts:{
                success:function(data){
                    $("#mail-rule").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="mail-rule" title="Basic title"></div>');
            this.element = $("#mail-rule");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "규칙 설정",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#mail-rule").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#mail-rule").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 부서원 팝업 ====================================== */
    $.widget( "dwp.emp_list", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            ajaxOpts:{
                success:function(data){
                    $("#emp-list").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="emp-list" title="Basic title"></div>');
            this.element = $("#emp-list");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "부서",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#emp-list").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#emp-list").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(current.element).inputValidation();

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 권한공유자/일정관리 팝업 ====================================== */
    $.widget( "dwp.schedule_other_add", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#schedule-other-add").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="schedule-other-add" title="Basic title"></div>');
            this.element = $("#schedule-other-add");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                modal:false,
                draggable: false,
                title: "환경설정",
                width: 420,

                ajaxOpts: {
                    success: function (data) {
                        $("#schedule-other-add").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#schedule-other-add").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(".dwp-tabs").tabs({
                    active: 0
                });

                $(document).on("click",".dwp-btn.confirm",function(){
                   current.close();
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 키메세지 미리보기 팝업 ====================================== */
    $.widget( "dwp.keymessage_preview", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            ajaxOpts:{
                success:function(data){
                    $("#keymessage-preview").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="keymessage-preview" title="Basic title"></div>');
            this.element = $("#keymessage-preview");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "key message 미리보기",
                width: 1240,
                height: 660,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#keymessage-preview").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#keymessage-preview").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                /* key message 변환 */
                $('.dwp-main-visual .slider').on('init reInit beforeChange', function(event, slick, currentSlide, nextSlide){
                    var color = $(slick.$slides.get(nextSlide)).find("img").attr("class");
                    var cate = $(slick.$slides.get(nextSlide)).attr("data-cate");
                    var msg = $(slick.$slides.get(nextSlide)).attr("data-msg");


                    $(".dwp-main-visual .txt-area .category").html(cate);
                    $(".dwp-main-visual .txt-area .subject").html(msg);
                    $(".dwp-main-visual .txt-area").removeClass("light dark");
                    $(".dwp-main-visual .txt-area").addClass(color);
                });

                /* visual 영역 */
                $('.dwp-main-visual .slider').slick({
                    centerMode: true,
                    variableWidth: true,
                    arrows: true,
                    slideToShow: 1,
                    infinite: true,
                    focusOnSelect: true,
                    autoplay: true
                });

                $(document).on("click",".dwp-btn.confirm",function(){
                    current.close();
                });

                $(document).on('click', '.ui-widget-overlay', function() {
                    current.close();
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 개인추가 팝업 ====================================== */
    $.widget( "dwp.user_address_add", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            ajaxOpts:{
                success:function(data){
                    $("#user-address-add").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="user-address-add" title="Basic title"></div>');
            this.element = $("#user-address-add");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "개인추가",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#user-address-add").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#user-address-add").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(document).on('click', '.ui-widget-overlay', function() {
                    current.close();
                });

                $(document).on('click', '.dwp-btn.cancel', function() {
                    current.close();
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 그룹추가 팝업 ====================================== */
    $.widget( "dwp.group_address_add", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            ajaxOpts:{
                success:function(data){
                    $("#group-address-add").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="group-address-add" title="Basic title"></div>');
            this.element = $("#group-address-add");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "그룹추가",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#group-address-add").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#group-address-add").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(document).on('click', '.ui-widget-overlay', function() {
                    current.close();
                });

                $(document).on('click', '.dwp-btn.cancel', function() {
                    current.close();
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 사원찾기 팝업 ====================================== */
    $.widget( "dwp.emp_search", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            ajaxOpts:{
                success:function(data){
                    $("#emp-search").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="emp-search" title="Basic title"></div>');
            this.element = $("#emp-search");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "사원찾기",
                width: 736,
                height: 730,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#emp-search").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#emp-search").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                /* 왼쪽 트리 */
                if($("#tree .dynatree-container").length < 1) {
                    $("#tree").dynatree({
                        checkbox:true,
                        /*initAjax: {
                         url: "../../assets/js/dynatree/sampjson2.json"
                         },*/
                        children:[
                            {"title": "1Depth Group", "isFolder": true, "key": "folder1", expand: true,
                                "children":[
                                    {"title": "크라운", "key": "emp6"},
                                    {"title": "땅콩", "key": "emp7"},
                                    {"title": "카라멜", "key": "emp8"}
                                ]},
                            {"title": "1Depth Group", "isFolder": true, "key": "folder2",
                                "children": [
                                    {"title": "2Depth Group", "isFolder": true, "key": "folder2-1"},
                                    {"title": "2Depth Group", "isFolder": true, "key": "folder2-2",
                                        "children": [
                                            {"title": "3Depth Group", "isFolder": true, "key": "folder2-2-1"},
                                            {"title": "3Depth Group", "isFolder": true, "key": "folder2-2-2",
                                                "children": [
                                                    {"title": "4Depth Group", "isFolder": true, "key": "folder2-2-2-1",
                                                        "children" : [
                                                            {"title": "비주얼커뮤니케이션1", "key": "emp1"},
                                                            {"title": "장그래", "key": "emp2"},
                                                            {"title": "안그래", "key": "emp3"},
                                                            {"title": "현빈", "key": "emp4"},
                                                            {"title": "사람", "key": "emp5"}
                                                        ]
                                                    },
                                                    {"title": "4Depth Group", "isFolder": true, "key": "folder2-2-2-2"}
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        helper: "clone",
                        /*dnd: {
                         /!* 폴더는 드래그 안되게 *!/
                         onDragStart: function(node) {
                         if(node.data.isFolder){
                         return false;
                         }
                         return true;
                         }
                         }*/
                    });
                }

                $(document).on('click', '.ui-widget-overlay', function() {
                    current.close();
                });

                $(document).on('click', '.dwp-btn.cancel', function() {
                    current.close();
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 오래된 일정관리 ====================================== */
    $.widget("dwp.schedule_clear", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            draggable: false,

            ajaxOpts: {
                success: function (data) {
                    $("#schedule-clear").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="schedule-clear" title="Basic title"></div>');
            this.element = $("#schedule-clear");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "오래된 일정 정리하기",
                modal: false,
                width: 420,
                ajaxOpts: {
                    success: function (data) {
                        $("#schedule-clear").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);
            $("#schedule-clear").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                /* 취소 버튼 클릭시 */
                $(document).on("click", "#schedule-clear .dwp-btn.lg-cancel", function() {
                    current.close();
                });

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
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

    /* ==================================== 개인주소록 유저정보 팝업 ====================================== */
    $.widget("dwp.user_address", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            element: null,
            dialogClass: "transparent-overlay",
            position:{
                my:"right top",
                at:"right top",
                of:window
            },
            width: 736,
            ajaxOpts: {
                success: function (data) {
                    $("#user-address").html(data);
                }
            }
        },

        beforeCreateLoadContent: function () {
            $("body").append('<div id="user-address" title="Basic title"></div>');
            this.element = $("#user-address");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            case_options = {
                title: "사원정보",
                modal: true,
                width: 736,
                height: 500,
                position:{
                    my:"right top",
                    at:"right top",
                    of:".dwp-body-wrap"
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#user-address").html(data);
                    }
                },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').css("background", "rgba(0,0,0,0)");
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                }
            };
            $.extend(true, this.options, case_options);
            $("#user-address").prev().children(".ui-dialog-title").text(this.options.title);
            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                /* 취소 버튼 클릭시 */
                $(document).on("click", "#user-address .dwp-btn.lg-cancel", function() {
                    current.close();
                });

                if (typeof current.options.doSomething == 'function') {
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
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

    /* ==================================== 사진등록 팝업 ====================================== */
    $.widget( "dwp.photo_change", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            ajaxOpts:{
                success:function(data){
                    $("#photo_change").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="photo_change" title="Basic title"></div>');
            this.element = $("#photo_change");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "사진등록",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#photo_change").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#photo_change").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $(document).on('click', '.ui-widget-overlay', function() {
                    current.close();
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 앱스토어 기간설정 팝업 ====================================== */
    $.widget( "dwp.app_date", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            ajaxOpts:{
                success:function(data){
                    $("#app-date").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="app-date" title="Basic title"></div>');
            this.element = $("#app-date");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "기간설정",
                width: 324,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#app-date").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#app-date").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $( ".dwp-calendar-form input[type='text']" ).datepicker({
                    showOn: "button",
                    dateFormat: "yy-mm-dd",
                    buttonImage: "../../assets/images/common/empty.png",
                    buttonImageOnly: true,
                    buttonText: "Select date"
                });

                $(document).on('click', '.ui-widget-overlay', function() {
                    current.close();
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });

    /* ==================================== 비즈카드 ====================================== */
    $.widget("dwp.dropdown_option", $.ui.dialog, {
        options: {
            width: 200,
            dialogClass: 'titleless dropdown-type-dialog',
            element: null,
            ajaxOpts: {
                success: function (data) {
                    $("#dropdown_option").html(data);
                }
            }
        },
        beforeCreateLoadContent: function () {
            $("body").append('<div id="dropdown_option" title="Basic title"></div>');
            this.element = $("#dropdown_option");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;
            this.element.parent().addClass("titleless");
            case_options = {
                title: "드롭다운",
                modal: false,
                width: 200,
                ajaxOpts: {
                    success: function (data) {
                        $("#dropdown_option").html(data);
                    }
                },
                open: null
            };
            $.extend(true, this.options, case_options);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function () {

                $(current.element).inputValidation();

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

    /* ==================================== 설문응답 팝업 ====================================== */
    $.widget( "dwp.research_answer", $.ui.dialog, {
        options: {
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            autoOpen:true,
            draggable: false,

            ajaxOpts:{
                success:function(data){
                    $("#research-answer").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="research-answer" title="Basic title"></div>');
            this.element = $("#research-answer");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;

            case_options = {
                modal: true,
                draggable: false,

                title: "설문응답",
                width: 736,
                hide: { effect: "fade", duration: 300 },
                show: { effect: "fade", duration: 300 },
                position: {
                    my: "center",
                    at: "center",
                    of: window
                },
                open: function() {
                    $(this).closest(".ui-dialog").siblings('.ui-widget-overlay').on('click', function() {
                        current.close();
                    });
                },
                ajaxOpts: {
                    success: function (data) {
                        $("#research-answer").html(data);
                    }
                }
            };
            $.extend(true,this.options,case_options);
            $("#research-answer").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;
            $.ajax(current.options.ajaxOpts).done(function(){

                $( ".dwp-calendar-form input[type='text']" ).datepicker({
                    showOn: "button",
                    dateFormat: "yy-mm-dd",
                    buttonImage: "../../assets/images/common/empty.png",
                    buttonImageOnly: true,
                    buttonText: "Select date"
                });

                $(document).on('click', '.ui-widget-overlay', function() {
                    current.close();
                });

                if(typeof current.options.doSomething == 'function'){
                    current._trigger("doSomething");
                }

                $(current.element).inputValidation();
            });
        },
        _create:function(){
            this.beforeCreateLoadContent();
            this._super();
        },
        open:function(){
            this._innerCase();
            this._super();
        }
    });
});