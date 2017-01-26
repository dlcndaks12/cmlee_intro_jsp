// $(window).ready(function() {
//
//     var $LEFT = $("#left_box");
//     var $CENTER = $("#center_box");
//     var $LIST = $("#sortable");
//     var CENTER_LIST = [];
//
//     function MyIcon(info){
//         this.id = info.id;
//         this.img = info.img;
//         this.name = info.name;
//         this.url = info.url;
//         this.widget = info.widget;
//         this.list_obje = (
//             $("<li>")
//                 .addClass("icon_container ui-state-default")
//                 .append(
//                     $("<img>")
//                         .attr("src", info.img))
//                 .append(
//                     $("<div>")
//                         .addClass("center_title")
//                         .text(info.name))
//                 .append(
//                     $("<div>")
//                         .addClass("center_body")
//                         .text(info.url + ": 페이지를 찾을 수 없습니다."))
//                 .data("icon", this));
//     }
//
//     MyIcon.prototype.add_to_left = function(){
//         $LIST.append(this.list_obje);
//         this.to_left();
//         return this;
//     }
//
//     MyIcon.prototype.add_to_center = function() {
//         CENTER_LIST.push(this.list_obje);
//         this.to_center();
//     }
//
//     MyIcon.prototype.to_left = function(){
//         this.list_obje.children("img").show();
//         this.list_obje.children("div").hide();
//         this.list_obje.css({'height': ""});
//     }
//
//     MyIcon.prototype.to_center = function(){
//         this.list_obje.children("img").hide();
//         this.list_obje.children(".center_title").show();
//         (function(o,w,u){
//             o.css({height: ""})
//             .animate({
//                 height: w*324
//             }, 400, function(){
//                 o.children(".center_body").css({
//                     height: w*324-50
//                 }).show();
//             });
//             $.ajax({
//                 dataType: "html",
//                 url: u,
//                 success: function(data){
//                     o.children(".center_body").html(data);
//                 }
//             });
//         })(
//             this.list_obje, this.widget, this.url
//         );
//     }
//
//     MyIcon.prototype.hide_body = function(){
//         (function(o){
//             o.fadeOut(function(){
//                 o.hide();
//             });
//         })(this.list_obje.children(".center_body"));
//         this.list_obje.animate({height: 50},400);
//     }
//
//     MyIcon.prototype.set_pos = function(){
//         this.list_pos = this.list_obje.position();
//         return this;
//     }
//
//     MyIcon.prototype.push_it = function(state,$c,count){
//         $($c.get(count)).find("ul").append(this.list_obje);
//         state[count] += this.widget;
//     }
//
//     MyIcon.prototype.move_to = function(){
//         (function(old_pos, new_pos, o){
//             o.css({
//                 left: old_pos.left - new_pos.left,
//                 top: old_pos.top - new_pos.top,
//                 position: "relative"
//             }).animate({
//                 left: 0,
//                 top: 0
//             }, 500, function(){
//                 o.css({position: ""});
//             });
//         })(this.list_pos, this.list_obje.position(), this.list_obje);
//     }
//
//     function comp_func(a,b){
//         if(a.list_pos.top < b.list_pos.top){
//             return -1;
//         }else if(a.list_pos.top > b.list_pos.top){
//             return 1;
//         }else if(a.list_pos.left < b.list_pos.left){
//             return -1;
//         }else if(a.list_pos.left > b.list_pos.left){
//             return 1;
//         }else{
//             return 0;
//         }
//     }
//
//     /* 유저 정보 불러오는 부분과 이벤트가 실행되는 것을 동기화해야 한다. */
//     var COUNTER = {
//         user_info_ajax: false,
//         animate_event: false,
//         set_animate: function(l){
//             /* 창이 바귈때마다 실행된다.
//                다만, set_user_info가 호출되기 전에 실행될 수 있지만 횟수는 1번 이하이다. */
//             COUNTER.level = l;
//             COUNTER.animate_event = true;
//             if(COUNTER.user_info_ajax){
//                 COUNTER.redraw();
//             }
//         },
//         set_user_info: function(){
//             /* 유저 정보를 불러온 뒤 딱 한 번 호출된다.
//                만약 set_animate가 호출된 다음이라면 set_animate때 실행되었어야 하는 부분을 실행한다.*/
//             COUNTER.user_info_ajax = true;
//             if(COUNTER.animate_event){
//                 COUNTER.redraw();
//             }
//         },
//         redraw: function(){
//             var level = COUNTER.level;
//             var $visible = $(".column_up_" + level);
//             var count = (function(count, $c){
//                 $c.each(function(i,e){
//                     count[i] = 0;
//                     count.elems.push(i);
//                 });
//                 return count;
//             })(
//                 {elems: []},
//                 $visible
//             );
//
//             (function(e,callback){
//                 callback.apply();
//                 return e;
//             })((
//             $CENTER.find("li").add(CENTER_LIST).map(function(i,e){
//                 return $(e).data("icon").set_pos();
//             })
//             .sort(comp_func).each(function(i,e){
//                 e.push_it(
//                     count,
//                     $visible,
//                     count.elems.sort(function(a,b){
//                         if((c=count[a]-count[b]) == 0){
//                             return a-b;
//                         }
//                         return c;
//                     })[0]);
//             })), function(){
//                 /* DOM구조 바뀌는 것은 모두 이곳에 넣어야 동작함 */
//                 $visible.show();
//                 $(".column_down_" + level).hide();
//                 $CENTER.css("width", (324+24)*level-24);
//             }).each(function(i,e){
//                 if (CENTER_LIST.length == 0){
//                     e.move_to();
//                 }
//             });
//             CENTER_LIST.length = 0;
//         }
//     };
//
//
//     /* 유저 정보를 불러와서 실행하는 부분 */
//     function construct_icon(data){
//
//         function save_it(e, ui){
//             (function(icon, parent){
//                 switch(parent.attr("id")){
//                     case "sortable": {
//                         icon.to_left();
//                     }
//                     break;
//                     default: {
//                         icon.to_center();
//                     }
//                 }
//             })(ui.item.data("icon"), ui.item.closest("ul"));
//
//             /* 서버에 변경내용 저장 */
//             var data1 = (
//                 $LIST.children("li.ui-state-default")
//                 .map(function(i,e){
//                     return $(e).data("icon").id;
//                 }).get().join(" "));
//
//             var data2 = $CENTER.find("li").map(function(i,e){
//                 return $(e).data("icon").set_pos();
//             })
//             .sort(comp_func).map(function(i,e){
//                 return e.id;
//             }).get().join(" ");
//
//             /*
//             data1 = "2 3 4";
//             data2 = "1";
//
//             $.ajax({
//                 dataType: "json",
//                 url: "user_info.json",
//                 success: function(data3){
//                     console.log(data3);
//                 },
//                 method: "POST",
//                 data: {id: data.id, icon: data1, center: data2},
//             });
//             */
//
//         }
//
//
//         /* 가운데 있는 아이콘 추가하기 */
//         data.icon.forEach(function(info){
//             (new MyIcon(info)).add_to_left();
//         });
//         /* 오른쪽에 있는 아이콘 추가하기 */
//         data.center.forEach(function(info){
//             (new MyIcon(info)).add_to_center();
//         })
//         $LIST.sortable({
//             stop: function(e, ui){
//                 save_it(e, ui);
//             },
//             connectWith: "ul",
//             placeholder: "icon-placeholder"
//         });
//         $LIST.disableSelection();
//
//         $CENTER.find("ul").sortable({
//             stop: function(e, ui){
//                 save_it(e, ui);
//             },
//             start: function(e, ui){
//                 ui.item.data("icon").hide_body();
//             },
//             forcePlaceholderSize: true,
//             handle: ".center_title",
//             connectWith: "ul",
//             placeholder: "icon-placeholder"
//         });
//
//         COUNTER.set_user_info();
//     }
//
//     $.ajax({
//         dataType: "json",
//         url: "user_info.json",
//         success: construct_icon
//     });
//
//
//     /* 반응형 컨트롤 */
//     $CENTER.get(0).addEventListener("animationstart", function(e){
//         if(e.target.id == "center_box"){
//             var level;
//             switch(e.animationName){
//                 case "size-1020px": {
//                     level = 3;
//                 }
//                 break;
//                 case "size-672px": {
//                     level = 2;
//                 }
//                 break;
//                 case "size-324px": {
//                     level = 1;
//                 }
//                 break;
//                 default: return;
//             }
//
//             COUNTER.set_animate(level);
//
//         }
//     });
//
//
//
// });
