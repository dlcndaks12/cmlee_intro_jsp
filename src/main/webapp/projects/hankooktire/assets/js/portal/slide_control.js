// /* zhuny@coscoi.net */
//
//
// $(window).ready(function() {
//
//     var mySwiper = new Swiper('.dwp-main-visual', {
//         nextButton: '.swiper-button-next',
//         prevButton: '.swiper-button-prev',
//         pagination: '.swiper-pagination',
//         paginationType: 'fraction',
//         slidesPerView: 'auto',
//         centeredSlides: true,
//         loop: true,
//         loopAdditionalSlides: 1,
//         autoplay: 2000
//
//         /*
//         onSlideChangeStart: function(e){
//             // 슬라이드 바뀌면. 드레그엔 드롭 할 때에는 드롭이 된 시점
//             console.log("slide change start", e);
//         },
//         onSlideChangeEnd: function(e){
//             // 슬라이드 다 자리잡으면
//             console.log("slide change end", e);
//         }
//         onTransitionStart: function(e){
//             console.log("transition start", e);
//         },
//         onTransitionEnd: function(e){
//             console.log("transition end", e);
//         },
//         onTouchStart: function(e){
//             console.log("touch start", e);
//         },
//         onTouchEnd: function(e){
//             console.log("touch end", e);
//         }*/
//     });
//
//     function get_slides(name){
//         return mySwiper.wrapper.find("."+name).filter(function(i,elem){
//             return (!$(elem).hasClass("swiper-slide-duplicate"));
//         });
//     }
//
//     var SwiperContanier = {
//         all: get_slides("swiper-slide")
//     };
//
//     mySwiper.container.find(".swiper-button-play").click(function(e){
//         if($(e.target).closest('.swiper-container')[0].swiper.autoplaying){
//             slide_cont.stop_auto_play();
//         }else{
//             slide_cont.start_auto_play();
//         }
//     });
//
//     $("#swiper-toggle").click(function(e){
//         if($("#swiper_center").is(":visible")){
//             slide_cont.hide_slide();
//         }else{
//             slide_cont.refresh_slide("all");
//         }
//     });
//
//     $(".swiper-control-item").click(function(e){
//         if($(e.target).hasClass("selected")){
//             slide_cont.refresh_slide("all");
//         }else{
//             slide_cont.refresh_slide($(e.target).data("rel"));
//         }
//     }).each(function(i,elem){
//         (function(name){
//             SwiperContanier[name] = get_slides(name);
//         })(
//             $(elem).data("rel")
//         );
//     });
//
//     mySwiper.prevButton.click(function(e){
//         slide_cont.stop_auto_play();
//     });
//
//     mySwiper.nextButton.click(function(e){
//         slide_cont.stop_auto_play();
//     });
//
//     function start_count($o, cur, end, angle, rot){
//         $o.text(
//             cur
//         ).css({
//             transform:(
//                 (rot)?
//                 "rotate3d("+rot+","+angle+"deg)" :
//                 "rotateX("+angle+"deg)")
//         });
//         if(cur < end || (cur == end && angle < 0)){
//             setTimeout(function(){
//                 if(angle >= 75){
//                     start_count($o, cur+1, end, -90, rot);
//                 }else{
//                     start_count($o, cur, end, angle+15, rot);
//                 }
//             }, 15);
//         }
//     }
//
//     function get_random_angle(){
//         var ang = Math.random() * Math.PI * 2;
//         return Math.cos(ang) + "," + Math.sin(ang) + ",0"
//     }
//
//
//
//
//     var slide_cont = {
//         refresh_slide: function(sel){
//             $("#swiper_center").slideDown();
//             $("#swiper-toggle").find("span").hide();
//             $("#swiper-toggle").find(".on").show();
//             $(".swiper-control-item").removeClass("selected")
//                                      .find(".counter")
//                                      .remove();
//             if(sel != "all"){
//                 $(".swiper-control-item").removeClass("selected");
//                 start_count(
//                     $("<div>").addClass("counter").appendTo(
//                         $(".swiper-control-item[data-rel='"+sel+"']").addClass("selected")
//                     ),
//                     1,
//                     SwiperContanier[sel].length,
//                     -90,
//                     get_random_angle()
//                 );
//             }
//
//             mySwiper.slideTo(4,1000);
//             mySwiper.removeAllSlides();
//             mySwiper.appendSlide(SwiperContanier[sel]);
//             mySwiper.update();
//             slide_cont.start_auto_play();
//             console.log("refresh_slide");
//         },
//         hide_slide: function(){
//             $("#swiper_center").slideUp();
//             $(".selected").removeClass("selected").find(".counter").remove();
//             $("#swiper-toggle").find("span").hide();
//             $("#swiper-toggle").find(".off").show();
//             slide_cont.stop_auto_play();
//             console.log("hide_slide");
//         },
//         start_auto_play: function(){
//             mySwiper.startAutoplay();
//             $(".swiper-button-play").find("span").hide();
//             $(".swiper-button-play").find(".on").show();
//             console.log("start_auto_play");
//         },
//         stop_auto_play: function(){
//             mySwiper.stopAutoplay();
//             $(".swiper-button-play").find("span").hide();
//             $(".swiper-button-play").find(".off").show();
//             console.log("stop_auto_play");
//         }
//     };
//
// });
//
