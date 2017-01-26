/* 모바일 스크롤시 footer 보이게 */
function onScrollForFooter(selector) {
    /* 모바일 스크롤시 footer 보이게 */
    window.scrollTimer = function() {
        $(".dwp-footer-m").removeClass("active");
    };
    $(selector).on("scroll", function(e) {
        $(".dwp-footer-m").addClass("active");

        /* 스크롤 마지막 부분은 footer 항상 보이게 */
        if ($(selector).scrollTop() == $(document).height() - $(selector).height()) {
            clearTimeout(window.scrollTimer);
        } else {
            clearTimeout(window.scrollTimer);
            window.scrollTimer = setTimeout(function() {
                $(".dwp-footer-m").removeClass("active");
            }, 1000);
        }
    });
}

$(document).ready(function() {
    /* 공통 게시판 스크롤시 box-shadow */
    window.headShadowTimer = function() {
        $(".dwp-page-heading").eq(0).removeClass("active");
    };
    $(".dwp-body-wrap").on("scroll", function(e) {
        $(".dwp-page-heading").eq(0).addClass("active");

        clearTimeout(window.headShadowTimer);
        window.headShadowTimer = setTimeout(function() {
            $(".dwp-page-heading").eq(0).removeClass("active");
        }, 200);
    });

    /* LNB 이쁜이 스크롤 */
    if($(".dwp-nav .dwp-lnb-wrap").length > 0) {
        $(".dwp-nav .dwp-lnb-wrap").mCustomScrollbar({
            theme:"minimal-dark"
        });
    }

    /* LNB 하위뎁스 열기버튼(+) 클릭시 */
    $(document).on("click", ".dwp-depth-open", function(e) {
        $(this).closest(".dwp-lnb-depth2").toggleClass("active");

        e.preventDefault();
    });

    $(document).on("click", ".tree-type .dwp-open", function() {
        $(this).parent().toggleClass("active");
    });

    /* 모바일 헤더 아이콘 클릭시 하위메뉴 호출 */
    $(document).on("click", ".view-trigger", function () {
        $(this).toggleClass("active");
    });

    /* 모바일 검색영역 호출 */
    $(document).on("click", ".dwp-header-m .search-btn, .dwp-lnb-header-m .search-btn", function(e) {
        $(this).siblings(".search-form-m").addClass("active");
        setTimeout(function(){
            $(".dwp-header-m .search-form-m").find("input[type='text']").focus();
        },400);
    });

    /* 모바일 검색영역 숨김 */
    $(document).on("click", ".dwp-header-m .btn-back, .dwp-lnb-header-m .btn-back", function(e) {
        $(this).closest(".search-form-m").removeClass("active");
    });

    /* 모바일 LNB 열기 버튼 클릭 */
    $(document).on("click", ".dwp-header-m .lnb-trigger, .dwp-lnb-header-m .lnb-trigger", function(e) {
        $("body").addClass("open-lnb");
    });

    /* 모바일 LNB 닫기 버튼 클릭 */
    $(document).on("click", ".dwp-header-m .lnb-close, .dwp-lnb-header-m .lnb-close", function(e) {
        $("body").removeClass("open-lnb");
    });

    /* 모바일 LNB MASK 클릭시 */
    $(document).on("click", ".dwp-header-m .lnb-wrap, .dwp-lnb-header-m .lnb-wrap", function(e) {
        $("body").removeClass("open-lnb");
    });
    $(document).on("click", ".dwp-header-m .lnb-inner, .dwp-lnb-header-m .lnb-inner", function(e) {
        e.stopPropagation();
    });
    $(document).on("click", ".dwp-header-m .lnb-cont, .dwp-lnb-header-m .lnb-cont", function(e) {
        e.stopPropagation();
    });

    /* LNB 열기, 닫기 버튼 클릭 */
    $(document).on("click", ".dwp-trigger", function(e) {
        var $nav = $(this).parent();
        $nav.toggleClass("hide");

        e.preventDefault();
    });

    /* LNB 메뉴 클릭시 */ {
        $(document).on("click", ".dwp-link", function() {
            $(".dwp-link").parent().removeClass("selected");
            $(this).parent().addClass("selected");
        });
    }

    /* LNB 리사이즈 */
    $( ".dwp-nav" ).resizable({
        handles: "e"
    });

    /* 미리보기 리사이즈 */
    $( ".dwp-contents-preview" ).resizable({
        handles: "w, n"
    });

    $.fn.textWidth = function(){
        var html_org = $(this).html();
        var html_calc = '<span>' + html_org + '</span>';
        $(this).html(html_calc);
        var width = $(this).find('span:first').width();
        $(this).html(html_org);
        return width;
    };

    /* 모바일 스크롤시 footer 보이게 하는 이벤트 걸기 */
    onScrollForFooter(window);

    /* 모바일 lnb 뎁스 클릭시 슬라이더 이동 */
    $(document).on("click",".dwp-2depth-nav a", function () {
        var idx = $(this).index();

        $(this).addClass("active").siblings().removeClass("active");

        $('.visual-slider').slick('slickGoTo', idx);
    });

    /* 모바일 슬라이더 이동시 lnb 이동 */
    $(document).on('afterChange','.visual-slider', function(event, slick, currentSlide, nextSlide){
        var offLeft = $(".dwp-2depth-nav a").eq(currentSlide).position().left;

        if($(slick.$list.context).hasClass("visual-slider")) {
            $(".dwp-2depth-nav a").eq(currentSlide).addClass("active").siblings().removeClass("active");

            $(".dwp-2depth-nav").stop().animate({scrollLeft:offLeft}, '500', 'swing', function() {

            });
        }
    });

    /* 모바일 slick */
    $('.visual-slider').slick({
        arrows: false,
        dots : false,
        accessibility: false,
        infinite: false,
        adaptiveHeight: true
    });
});



/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);