/**
 * Created by COSCOI_BS01 on 2016-08-11.
 */
$(function () {
    $.widget( "dwp.hk_dialog", $.ui.dialog, {
        options: {
            autoOpen:true,
            case:null,
            ajaxOpts:{
                success:function(data){
                    $("#hk_dialog").html(data);
                }
            }
        },
        beforeCreateLoadContent:function(){
            $("body").append('<div id="hk_dialog" title="Basic title"></div>');
            this.element = $("#hk_dialog");
            var copyOpts = this.options.ajaxOpts;
            copyOpts.async = false;
            $.ajax(copyOpts);
        },
        _innerCase: function () {
            var case_options = {};
            var current = this;


            /*this.element.parent().addClass("dwp-modal");
             this.element.parent().removeClass('titleless');*/
            switch (this.options.case){
                case "criminate":
                    case_options = {
                        modal:false,
                        draggable: false,
                        title: "신고하기",
                        resizable: false,
                        width: 420,
                        position: {
                            my: "center",
                            at: "center",
                            of: window
                        },
                        ajaxOpts: {
                            success: function (data) {
                                $("#hk_dialog").html(data);
                            }
                        }
                    };
                    break;
                case "setting":
                    case_options = {
                        modal:false,
                        draggable: false,
                        title: "보기설정",
                        width: 324,
                        resizable: false,
                        ajaxOpts: {
                            success: function (data) {
                                $("#hk_dialog").html(data);
                            }
                        }
                    };
                    break;
            }

            $.extend(true,this.options,case_options);

            $("#hk_dialog").prev().children(".ui-dialog-title").text(this.options.title);

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