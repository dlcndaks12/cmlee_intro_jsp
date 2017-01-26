/* alert 창 */
function dwpAlert(msg) {

    var alertArea = "";
    alertArea += '<div class="dwp-alert-mask">';
    alertArea +=    '<div class="dwp-alert">';
    alertArea +=        '<div class="txt-area">';
    alertArea +=            msg;
    alertArea +=        '</div>';
    alertArea +=        '<div class="btn-area">';
    alertArea +=          '<div class="dwp-btn alert-close strong"><span>확인</span></div>';
    /*alertArea +=          '<div class="dwp-btn alert-close"><span>취소</span></div>';*/
    alertArea +=        '</div>';
    alertArea +=    '</div>';
    alertArea += '</div>';

    $(document).ready(function() {
        $("body").append(alertArea);
    });
}

$(document).on("click", ".dwp-alert .alert-close", function() {
    $(this).closest(".dwp-alert-mask").remove();
});


/* confirm 창 */
function dwpConfirm(msg, callback) {

    var alertArea = "";
    alertArea += '<div class="dwp-alert-mask">';
    alertArea +=    '<div class="dwp-alert">';
    alertArea +=        '<div class="txt-area">';
    alertArea +=            msg;
    alertArea +=        '</div>';
    alertArea +=        '<div class="btn-area">';
    alertArea +=          '<div class="dwp-btn strong confirm-yes"><span>확인</span></div>';
    alertArea +=          '<div class="dwp-btn confirm-no"><span>취소</span></div>';
    alertArea +=        '</div>';
    alertArea +=    '</div>';
    alertArea += '</div>';

    $(document).ready(function() {
        $("body").append(alertArea);
    });

    $(".dwp-alert .confirm-yes").one("click", function() {
        $(this).closest(".dwp-alert-mask").remove();

        callback(true);
    });

    $(".dwp-alert .confirm-no").one("click", function() {
        $(this).closest(".dwp-alert-mask").remove();

        callback(false);
    });
}
