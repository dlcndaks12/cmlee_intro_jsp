$(document).ready(function() {
    /* Top 버튼 클릭시 */
    $(document).on("click", ".dwp-btn-top", function() {
        $(".dwp-page-body .dwp-body-wrap").stop().animate({scrollTop:0}, '500', 'swing', function() {
        });
    });

    /* 태블릿에서 header의 메뉴더보기 버튼 클릭시 */
    $(document).on("click", ".dwp-header .dwp-menu-trigger", function() {
        $(this).parent().toggleClass("active");
    });

    /* 빠른검색 영역 닫기 */
    $(document).on("click", ".quick-srch-area .btn-quick-close", function() {
        $(this).closest(".quick-srch-area").removeClass("active");
        $(window).trigger("scroll");
    });

    /* head-banner 닫기 */
    $(document).on("click", ".dwp-head-banner .btn-close", function() {
        $("body").removeClass("show-banner");
    });

    /* 주메뉴 여닫기 */
    $(document).on("click", ".dwp-gnb-trigger", function() {
        $(this).parent().toggleClass("active");

        if($(this).parent().hasClass("active")) {
            $(".dwp-header").removeClass("dwp-transparent");
        }else{
            $(window).trigger("scroll");
        }
    });

    /* 헤더 검색영역 focus */
    $(document).on("focusin", ".dwp-header .srch-input input", function() {
        $(this).closest(".dwp-search-area").addClass("focus");
        $(".dwp-header").removeClass("dwp-transparent");
    });
    $(document).on("focusout", ".dwp-header .srch-input input", function() {
        $(this).closest(".dwp-search-area").removeClass("focus");
        $(window).trigger("scroll");
    });

    /* Calendar */
    $( ".dwp-calendar-form input[type='text']" ).datepicker({
        showOn: "button",
        dateFormat: "yy-mm-dd",
        buttonImage: "../../assets/images/common/empty.png",
        buttonImageOnly: true,
        buttonText: "Select date"
    });

    /* TAB */
    $(".dwp-tabs").tabs({
        active: 0
    });

    $(".dwp-tabs-simple").tabs({
        active: 0
    });

    /* 리스트 상단 공지 Banner 닫기 버튼 클릭시 */
    $(document).on("click", ".dwp-msg-banner .btn-close button", function() {
        $(this).closest(".dwp-msg-banner").hide();
    });

    /* search form 돋보기 클릭시 */
    $(document).on("click", ".dwp-search-grouping .dwp-btn-trigger", function(e) {
        var $this = $(this);
        $this.closest(".dwp-search-grouping").addClass("active");
        setTimeout(function() {
            $this.closest(".dwp-search-grouping").find("input[type='text']").focus();
        }, 600);
    });

    /* 체크박스 전체 선택 */
    $(document).on("click", ".dwp-check-all", function(){
        $(this).closest(".check-group").find(".dwp-chk").prop("checked", $(this).is(":checked"));
    });
    $(document).on("click", ".dwp-chk", function(){
        var chkAll = $(this).closest(".check-group").find(".dwp-check-all");
        var chk = $(this).closest(".check-group").find(".dwp-chk");

        chkAll.prop("checked", chk.size() == chk.filter(":checked").size() ? true : false);
    });

    /* 보기설정 아이콘 클릭시 */
    $(document).on("click", ".icon-wrap.list .dwp-btn.icon", function(){
        $(".icon-wrap.list .dwp-btn.icon").each(function(){
            $(this).removeClass("active");
        });
        $(this).addClass("active");
    });
    $(document).on("click", ".icon-wrap.view .dwp-btn.icon", function(){
        $(".icon-wrap.view .dwp-btn.icon").each(function(){
            $(this).removeClass("active");
        });
        $(this).addClass("active");
    });

    /* 드롭다운 버튼 */
    $(document).on("click", ".dwp-dropdown .trigger", function() {
        $(this).closest(".dwp-dropdown").toggleClass("active");
    });
    $(document).on("click", ".dwp-dropdown .dwp-option-list button", function() {
        $(this).closest(".dwp-dropdown").removeClass("active");
    });

    /* 정렬버튼 클릭시 */
    $(document).on("click", ".dwp-btn.toggle button", function() {
        $(this).closest(".dwp-btn.toggle").toggleClass("active");
    });

    /* 플라워메뉴 버튼 클릭시 */
    $(document).on("click", ".flower-menu", function(){
        $(this).toggleClass("active");
    });

    $(document).on("click", ".flower-menu .flower-shortcut", function(e){
        e.stopPropagation();
    });

    /* tooltip 버튼 클릭시 */
    $(document).on("click", ".dwp-tooltip .tooltip-trigger", function() {
        $(this).closest(".dwp-tooltip").toggleClass("active");
    });
    /* tooltip 닫기 버튼 클릭시 */
    $(document).on("click", ".dwp-tooltip .close-tooltip", function() {
        $(this).closest(".dwp-tooltip").removeClass("active");
    });

    /* 콤보박스 직접선택시 */
    $(document).on("change", ".dwp-combobox select", function() {
        var attr = $(this).children(":selected").attr('data-direct');

        if (typeof attr !== typeof undefined && attr !== false) {
            $(this).closest(".dwp-combobox").addClass("active").find("input[type='text']").focus();
        } else {
            $(this).closest(".dwp-combobox").removeClass("active");
        }
    });

    /* 모바일 풋터 클릭 액션 */
    $('.dwp-footer-m .util-btn a').on('click', function (event) {
        event.preventDefault();

        var $div = $('<div/>'),
            btnOffset = $(this).offset(),
            xPos = event.pageX - btnOffset.left,
            yPos = event.pageY - btnOffset.top;

        $div.addClass('ripple-effect');
        var $ripple = $(".ripple-effect");

        $div.css({
                top: yPos - 25,
                left: xPos - 25
            })
            .appendTo($(this));

        window.setTimeout(function(){
            $div.remove();
        }, 900);
    });

    /* Activity Stream에서 viewmore버튼 클릭시 */

    $(document).on("click", ".dwp-view-read", function( ) {
        $(this).siblings(".dwp-acts-desc").toggleClass("active");

        if($(".dwp-acts-desc").hasClass("active")) {
            $(this).children(".more").text("Close");
        } else {
            $(this).children(".more").text("+ View More");
        }
    });
});
