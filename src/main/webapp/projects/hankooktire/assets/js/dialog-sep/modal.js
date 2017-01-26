/**
 * Created by COSCOI_BS01 on 2016-08-11.
 */
$(function () {
    $.widget( "dwp.modal", $.ui.dialog, {
        options: {
            modal: true,
            draggable: false,
            resizable: false,
            show:{ effect: "fade", duration: 300 },
            hide:{ effect: "fade", duration: 300 },
            ajaxOpts:{
                success:function(data){
                    $("#modal").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="modal" title="Basic title"></div>');
            this.element = $("#modal");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;


            this.element.parent().addClass("dwp-modal");
            /*this.element.parent().removeClass('titleless');*/
            switch(this.options.case){
                case "bookmark":
                case_options = {
                    width: 736,
                    title: "나의 북마크 첨부하기",
                    position: {
                        my: "center",
                        at: "center",
                        of: window
                    },
                    ajaxOpts: {
                        success: function (data) {
                            $("#modal").html(data);
                        }
                    },
                    open: function () {
                        $('.ui-widget-overlay').on('click', function () {
                            current.close();
                        });
                    }
                };
                break;

                case "criminate":
                    case_options = {
                        title: "신고하기",
                        width: 420,
                        position: {
                            my: "center",
                            at: "center",
                            of: window
                        },
                        ajaxOpts: {
                            success: function (data) {
                                $("#modal").html(data);
                            }
                        },
                        open: function () {
                            $('.ui-widget-overlay').on('click', function () {
                                current.close();
                            });
                        }
                    };
                    break;
            }



            $.extend(true,this.options,case_options);
            console.log(this.options);

            $("#modal").prev().children(".ui-dialog-title").text(this.options.title);

            var current = this;

            $.ajax(current.options.ajaxOpts).done(function(){
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

});