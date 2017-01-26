/**
 * Created by COSCOI_BS01 on 2016-08-11.
 */
$(function () {
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
    $.widget("dwp.bizcard", $.ui.dialog, {
        options: {
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

            $(".ui-dialog-title").text(this.options.title);

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
});