<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/include-jstl.jsp" %>

<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="utf-8">
        <title>tetris</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        
        <%@ include file="/WEB-INF/include/include-js.jsp" %>
        
    </head>
    <body>
	<div class="tetris">
	    <div class="container">
	        <h1 class="logo"><img src="resources/images/logo.png" alt=""></h1>
	
	        <div class="tetris-area">
	            <div class="tetris-container">
	
	            </div>
	
	            <div class="next-area">
	                <div class="title">Next</div>
	                <div class="next-block">
	
	                </div>
	            </div>
	
	            <div class="score-area">
	                <div class="title">Score</div>
	                <div class="num">0</div>
	            </div>
	
	            <div class="ranking">
	                <div class="title">Ranking</div>
	                <ul>
	                	<c:forEach items="${list}" var="item">
		                    <li>
		                        <span class="num">1.</span>
		                        <span class="name">${item.id}</span>
		                        <span class="rscore">${item.score} 점</span>
		                    </li>
	                	</c:forEach>
	                </ul>
	            </div>
	
	            <div class="start-area">
	                <p>게임을<br>시작해보세요!</p>
	                <a href="#">Start</a>
	            </div>
	        </div>
	
	        <div class="copy"><img src="resources/images/copy.png" alt=""></div>
	    </div>
	
	    <div class="gameover">
	        <div class="inner">
	            <p>Game Over ㅠ_ㅠ</p>
	            <div class="score">
	                <span class="num">0</span>점
	            </div>
	            <div class="btn-area">
	                <a href="#" class="btn replay"><img src="resources/images/replay.png" alt="">Replay</a>
	                <a href="#" class="btn save">Save</a>
	            </div>
	        </div>
	    </div>
	
	    <div class="save-wrap">
	        <div class="inner">
	            <div class="save-area">
	                <input type="text" id="id" name="id" placeholder="이름을 입력해주세요." />
	            </div>
	            <a href="#" class="btn">SUBMIT</a>
	        </div>
	    </div>
	</div>
    </body>
    
    <script>
    	function refreshRank() {
    		$.ajax({
	            url : '/tetris/getScore.do',
	            type : 'post',
	            dataType : 'json',
	            success : function(data) {
	              	var list = data.list;
              		var $con = $('.ranking > ul');
              			$con.empty();
	              	
	              	for(var i=0; i<list.length; i++) {
	              		var id = list[i].id;
	              		var score = list[i].score;
	              		var item = new StringBuffer();
	              			item.append('<li>');
	              			item.append('	<span class="num">'+(i+1)+'.</span>');
	              			item.append('	<span class="name">'+id+'</span>');
	              			item.append('	<span class="rscore">'+score+' 점</span>');
	              			item.append('</li>');
	              		$con.append(item.toString());
	              	}
	            },
	            error: function () {
	                alert("웹페이지에 문제가 발생 하였습니다.");
	                location.reload();
	                return false;
	            }
	        });
    	}
    
    	$('.save-wrap .btn').on('click', function(e) {
    		var id = $('#id').val();
    		var score = $('.gameover .score .num').text();
    		
    		$.ajax({
	            url : '/tetris/insertScore.do',
	            type : 'post',
	            dataType : 'json',
	            data : {
	            	id: id,
	            	score: score
	            },
	            success : function(data) {
	              	if(data.result > 0) {
	              		$('.save-wrap').removeClass('active');
	              		$('.gameover .save').hide();
	              		
	              		refreshRank();
	              	}
	            },
	            error: function () {
	                alert("웹페이지에 문제가 발생 하였습니다.");
	                location.reload();
	                return false;
	            }
	        });
    		
    		e.preventDefault();
    	});
    </script>
</html>