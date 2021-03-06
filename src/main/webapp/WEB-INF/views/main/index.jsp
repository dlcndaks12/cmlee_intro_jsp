<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/include-jstl.jsp" %>

<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="utf-8">
        <title>lcm</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        
        <%@ include file="/WEB-INF/include/include-js.jsp" %>
        
        <script>
	        $(window).on("load", function() {
	            $('.card-container').cardUp({
	                itemWidth: 350,
	                gutterX: 20,
	                gutterY: 30
	            });
	        });
	
	        // return a throttled function
	        function waitForPause(ms, callback) {
	            var timer;
	
	            return function() {
	                var self = this, args = arguments;
	                clearTimeout(timer);
	                timer = setTimeout(function() {
	                    callback.apply(self, args);
	                }, ms);
	            };
	        }
	
	        this.start = function() {
	            // wrap around your callback
	            $('#container').scroll( waitForPause( 30, self.worker ) );
	        };
	
	        $(document).ready(function (){
	
	            $('.profile-area > a').on('click', function(e) {
	                $('body').addClass('open-profile');
	                $(this).prev().addClass('active');
	                e.preventDefault();
	            });
	
	            $('.profile-detail .btn-close').on('click', function(e) {
	                $('body').removeClass('open-profile');
	                $(this).closest('.profile-detail').removeClass('active');
	                e.preventDefault();
	            });
	
	            $('[data-popup]').on('click', function(e) {
	                var id = $(this).attr('data-popup');
	
	                $('#'+id).addClass('active');
	                e.preventDefault();
	            });
	
	            $('.pop-detail').on('click', function(e) {
	                $(this).removeClass('active');
	                e.preventDefault();
	            });
	
	            $('.pop-detail .inner').on('click', function(e) {
	                e.stopPropagation();
	            });
	
	            $('.pop-detail .btn-close').on('click', function(e) {
	                $(this).closest('.pop-detail').removeClass('active');
	                e.preventDefault();
	            });
	
	            var eventOffTop = $('.profile-area').offset().top + 50;
	
	            $('#container').on('scroll', function(e) {
	                var sTop = $(this).scrollTop();
	                var scale = 1 - sTop/800;
	
	                $('.video-background .txt').css({
	                    transform: 'translate(-50%, -50%) scale('+scale+')'
	                });
	
	                if(sTop > 100) {
	                    $('.btn-top').addClass('active');
	
	                }else{
	                    $('.btn-top').removeClass('active');
	                }
	                if(sTop > eventOffTop) {
	                    $('body').addClass('fix');
	                }else{
	                    $('body').removeClass('fix');
	                }
	
	                var videoTop = sTop - (sTop / 2);
	                $('.video-foreground').css({
	                    marginTop: videoTop + 'px'
	                });
	            });
	
	            $('.btn-top').on('click', function(e) {
	                $('#container').stop().animate({scrollTop:0}, '500', 'swing');
	                e.preventDefault();
	            });
	        });
	    </script>
    </head>
    <body>
		
	<div id="container">
	    <div class="contents">
	        <div class="video-background">
	            <div class="video-foreground">
	                <video poster="resources/images/video-poster.jpg" id="bgvid" playsinline autoplay muted loop>
	                    <source src="resources/images/bg-video.mp4" type="video/mp4">
	                    <source src="resources/images/bg-video.webm" type="video/webm">
	                </video>

                	<div class="txt">Slow and steady win the race.</div>
	            </div>
	        </div>
        	<div class="cont">
	        	<div class="profile-area-helper">
			        <div class="profile-area">
			            <div class="profile-detail">
			                <div class="mask"></div>
			
			                <div class="inner">
	                            <div class="inner-contents">
	                                <ul class="info-list">
	                                    <li>
	                                        <div class="key">이름</div>
	                                        <div class="value">이충만</div>
	                                    </li>
	                                    <li>
	                                        <div class="key">성별</div>
	                                        <div class="value">남</div>
	                                    </li>
	                                    <li>
	                                        <div class="key">생년월일</div>
	                                        <div class="value">1991.04.01</div>
	                                    </li>
	                                    <li>
	                                        <div class="key">이메일</div>
	                                        <div class="value">dlcndaks12@naver.com</div>
	                                    </li>
	                                </ul>
	
	                                <div class="section">
	                                    <div class="sub-title">소개</div>
	                                    <p>
	                                        이것저것 하고싶은 것 많고 개발 '조금' 하는 퍼블리셔 입니다.
	                                    </p>
	                                </div>
	
	                                <div class="section">
	                                    <div class="sub-title">기술</div>
	                                    <ul class="info-list">
	                                        <li>
	                                            <div class="key">HTML</div>
	                                            <div class="value">웹표준, 웹접근성, HTML5, Cross Browsing</div>
	                                        </li>
	                                        <li>
	                                            <div class="key">MOBILE</div>
	                                            <div class="value">반응형웹, 모바일웹, 하이브리드앱</div>
	                                        </li>
	                                        <li>
	                                            <div class="key">CSS</div>
	                                            <div class="value">CSS3, Animation, 동적구현, CSS전처리(SASS)</div>
	                                        </li>
	                                        <li>
	                                            <div class="key">SCRIPT</div>
	                                            <div class="value">Jquery, Ajax, OOP, Closure</div>
	                                        </li>
	                                        <li>
	                                            <div class="key">BUILD</div>
	                                            <div class="value">GULP, GRUNT</div>
	                                        </li>
	                                        <li>
	                                            <div class="key">JAVA</div>
	                                            <div class="value">Spring framework, RESTful, Design pattern</div>
	                                        </li>
	                                        <li>
	                                            <div class="key">DB</div>
	                                            <div class="value">Mybatis, Oracle, MySql, MsSql</div>
	                                        </li>
	                                        <li>
	                                            <div class="key">JSP</div>
	                                            <div class="value">JSTL</div>
	                                        </li>
	                                        <li>
	                                            <div class="key">LINUX</div>
	                                            <div class="value">CentOS, Ubuntu</div>
	                                        </li>
	                                        <li>
	                                            <div class="key">VCS</div>
	                                            <div class="value">Svn, Git, Github, Bitbucket</div>
	                                        </li>
	                                        <li>
	                                            <div class="key">ETC</div>
	                                            <div class="value">API 연동 경험, JSON</div>
	                                        </li>
	                                    </ul>
	                                </div>
	                            </div>
	                            <a href="#" class="btn-close">닫기</a>
	                        </div>
						</div>
			            <a href="#">
			                <div class="photo">
			                    <img src="resources/images/profile2.jpg" alt="">
			                </div>
			                <div class="name">Profile</div> 
			            </a> 
			        </div>
	            </div>
		
		        <ul class="card-container">
		            <li>
		                <a target="_blank" href="http://www.skylife.co.kr">
		                    <span class="thumb">
		                    	<img src="resources/images/skylife.jpg" alt="">
		                    </span>
		                    <span class="desc">
			                    SkyLife 웹서비스 개편구축
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="tetris.do">
		                    <span class="thumb"><img src="resources/images/tetris.jpg" alt=""></span>
		                    <span class="desc">
					                    테트리스(개인프로젝트)
			                </span>
	                        <span class="tag-list">
	                            <span class="tag dev">개발</span>
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="projects/hankooktire/html/portal/index.html">
		                    <span class="thumb"><img src="resources/images/hankook.jpg" alt=""></span>
		                    <span class="desc">
		                    	한국타이어 디지털워크플레이스 DWP 구축
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="https://www.creativekorea.or.kr/main/townIntro">
		                    <span class="thumb"><img src="resources/images/creative.jpg" alt=""></span>
			                <span class="desc">
			                   	 창조경제타운 서비스 구축
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="http://www.scienceall.com/intro/">
		                    <span class="thumb"><img src="resources/images/scienceall.jpg" alt=""></span>
		                    <span class="desc">
		                    	사이언스올 웹사이트 운영 및 활성화 사업
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="http://www.3ting.co.kr">
		                    <span class="thumb"><img src="resources/images/3ting.jpg" alt=""></span>
			                <span class="desc">
			                    3D 프린팅 출력서비스 오픈 및 3Ting 웹사이트 신규 구축
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="http://www.africacenter.kr/main/index.do">
		                    <span class="thumb"><img src="resources/images/africa.jpg" alt=""></span>
		                    <span class="desc">
		                    	아프리카 미래전략센터 운영, 구축
			                </span>
	                        <span class="tag-list">
	                            <span class="tag dev">개발</span>
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="http://www.kogas.or.kr">
		                    <span class="thumb"><img src="resources/images/kogas.jpg" alt=""></span>
		                    <span class="desc">
		                    	한국가스공사 홈페이지 개선
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <div>
		                    <span class="thumb"><img src="resources/images/training.jpg" alt=""></span>
			                <span class="desc">
                            	교육정보통합시스템 구축 사업
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </div>
		            </li>
		            <li>
		                <a target="_blank" href="http://www.bitmaru.kr">
		                    <span class="thumb"><img src="resources/images/bitmaru.jpg" alt=""></span>
		                    <span class="desc">
		                    	빛마루 유통시스템 및 홈페이지 운용관리 위탁용역
			                </span>
	                        <span class="tag-list">
	                            <span class="tag dev">개발</span>
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="http://m.coscoi.net/">
		                    <span class="thumb"><img src="resources/images/coscoi.png" alt=""></span>
		                    <span class="desc">
		                    	코스코이 모바일 웹개발
			                </span>
	                        <span class="tag-list">
	                            <span class="tag dev">개발</span>
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="http://www.kicox.or.kr/index.do">
		                    <span class="thumb"><img src="resources/images/kicox.jpg" alt=""></span>
		                    <span class="desc">
		                    	한국산업단지공단 홈페이지 및 컨텐츠 관리개선
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="http://jdcenter.co.kr/main/index.do">
		                    <span class="thumb"><img src="resources/images/jdc.jpg" alt=""></span>
		                    <span class="desc">
		                    	JDC 기관 홈페이지 유지보수 및 관리운영 용역
			                </span>
	                        <span class="tag-list">
	                            <span class="tag dev">개발</span>
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="http://www.3ting.co.kr">
		                    <span class="thumb"><img src="resources/images/3ting-m.jpg" alt=""></span>
		                    <span class="desc">
		                    	IITP 2차년도 모바일 기반 3D프린팅 콘텐츠 생성 저작 출력기술 R&amp;D사업
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <div>
		                    <span class="thumb"><img src="resources/images/god-tower.png" alt=""></span>
		                    <span class="desc">
		                    	모바일게임 신의탑  프로모션 페이지
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </div>
		            </li>
		            <li>
		                <a target="_blank" href="projects/lai/view/main/main.html">
		                    <span class="thumb"><img src="resources/images/lai.jpg" alt=""></span>
		                    <span class="desc">
		                    	스마트헬스케어 Lai 소개페이지
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="https://www.yongin.go.kr/index.do">
		                    <span class="thumb"><img src="resources/images/youngin.jpg" alt=""></span>
		                    <span class="desc">
		                    	용인시청 홈페이지 유지보수
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="javascript:alert('준비중입니다.')">
		                    <span class="thumb"><img src="resources/images/tombs.jpg" alt=""></span>
		                    <span class="desc">
		                    	2016년 조선왕릉디지털백과
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="http://www.oh-pop.com/">
		                    <span class="thumb"><img src="resources/images/the-flag.jpg" alt=""></span>
		                    <span class="desc">
		                    	THE FLAG 홈페이지 구축
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="http://www.gm.go.kr/pt/index.do">
		                    <span class="thumb"><img src="resources/images/gm.jpg" alt=""></span>
		                    <span class="desc">
		                    	괌명시청 홈페이지 유지보수
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="http://www.socialenterprise.or.kr/index.do">
		                    <span class="thumb"><img src="resources/images/social.jpg" alt=""></span>
		                    <span class="desc">
		                    	사회적기업 진흥원 메인페이지 개편
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="http://www.suwon.go.kr/index.do">
		                    <span class="thumb"><img src="resources/images/suwon.jpg" alt=""></span>
		                    <span class="desc">
		                    	수원시청 홈페이지 유지보수
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="http://www.museum.seoul.kr/www/NR_index.do?sso=ok">
		                    <span class="thumb"><img src="resources/images/history.jpg" alt=""></span>
		                    <span class="desc">
		                    	서울역사박물관 유지보수
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		            <li>
		                <a target="_blank" href="http://www.suwon.go.kr/web/fifa/index.do">
		                    <span class="thumb"><img src="resources/images/u-20.jpg" alt=""></span>
		                    <span class="desc">
		                    	수원 FIFA U-20 월드컵 홈페이지 구축
			                </span>
	                        <span class="tag-list">
	                            <span class="tag pub">퍼블리싱</span>
	                        </span>
		                </a>
		            </li>
		        </ul>
        	</div>
	    </div>
	</div>
	
	
	<div class="pop-detail" id="skylife">
	    <div class="inner">
	        <div class="sub-title">SkyLife 웹서비스 개편구축</div>
	        <div class="section">
	            <ul class="project-list">
	                <li><a target="_blank" href="http://www.skylife.co.kr">http://www.skylife.co.kr</a></li>
	                <li>반응형, 웹표준 프로젝트</li>
	                <li>약 300페이지</li>
	                <li>CSS3 3D 속성을 이용한 Flip 효과 구현</li>
	                <li>Drag &amp; Drop 이용한 실시간 편성표 페이지 구현</li>
	            </ul>
	        </div>
	        <a href="#" class="btn-close">닫기</a>
	    </div>
	</div>
	
	<div class="pop-detail" id="hankook">
	    <div class="inner">
	        <div class="sub-title">한국타이어 디지털워크플레이스 DWP 구축</div>
	        <div class="section">
	            <ul class="project-list">
	                <li>태블릿 반응형, 모바일, 하이브리드앱 프로젝트</li>
	                <li>약 500페이지</li>
	                <li>다양한 Anamation 효과 적용</li>
	                <li>최신 CSS3 속성 사용</li>
	                <li>Drag &amp; Drop 이용한 다수의 페이지 구현</li>
	            </ul>
	        </div>
	        <a href="#" class="btn-close">닫기</a>
	    </div>
	</div>
	
	<div class="pop-detail" id="3ting">
	    <div class="inner">
	        <div class="sub-title">3D 프린팅 출력서비스 오픈 및 3Ting 웹사이트 신규 구축</div>
	        <div class="section">
	            <ul class="project-list">
	                <li><a target="_blank" href="http://www.3ting.co.kr">http://www.3ting.co.kr</a></li>
	                <li>웹표준, 웹접근성 프로젝트</li>
	                <li>약 150페이지</li>
	                <li>쇼핑몰 형태의 사이트</li>
	                <li>CSS3 속성, 스크립트를 이용한 동적효과 구현</li>
	            </ul>
	        </div>
	        <a href="#" class="btn-close">닫기</a>
	    </div>
	</div>
	
	<div class="pop-detail" id="kogas">
	    <div class="inner">
	        <div class="sub-title">한국가스공사 홈페이지 개선</div>
	        <div class="section">
	            <ul class="project-list">
	                <li><a target="_blank" href="http://www.kogas.or.kr">http://www.kogas.or.kr</a></li>
	                <li>웹표준, 웹접근성 프로젝트</li>
	                <li>약 100페이지</li>
	                <li>CSS3 속성, 스크립트를 이용한 동적효과 구현</li>
	            </ul>
	        </div>
	        <a href="#" class="btn-close">닫기</a>
	    </div>
	</div>
	
	<div class="pop-detail" id="africa">
	    <div class="inner">
	        <div class="sub-title">아프리카 미래전략센터 구축, 유지보수</div>
	        <div class="section">
	            <ul class="project-list">
	                <li><a target="_blank" href="http://www.africacenter.kr">http://www.africacenter.kr</a></li>
	                <li>웹표준, 웹접근성 프로젝트</li>
	                <li>약 150페이지</li>
	                <li>스크롤 이벤트를 이용한 페이지 구성</li>
	                <li>CSS3 속성, 스크립트를 이용한 동적효과 구현</li>
	            </ul>
	        </div>
	        <a href="#" class="btn-close">닫기</a>
	    </div>
	</div>
	
	<div class="pop-detail" id="scienceall">
	    <div class="inner">
	        <div class="sub-title">사이언스올 웹사이트 운영 및 활성화 사업</div>
	        <div class="section">
	            <ul class="project-list">
	                <li><a target="_blank" href="http://www.scienceall.com/intro/">http://www.scienceall.com</a></li>
	                <li>웹표준, 반응형, 웹접근성 프로젝트</li>
	                <li>약 150페이지</li>
	                <li>스크롤 이벤트를 이용한 페이지 구성</li>
	                <li>CSS3 속성, 스크립트를 이용한 동적효과 구현</li>
	            </ul>
	        </div>
	        <a href="#" class="btn-close">닫기</a>
	    </div>
	</div>
	
	<div class="pop-detail" id="bitmaru">
	    <div class="inner">
	        <div class="sub-title">빛마루 유통시스템 및 홈페이지 운용관리 위탁용역</div>
	        <div class="section">
	            <ul class="project-list">
	                <li><a target="_blank" href="http://www.bitmaru.kr">http://www.bitmaru.kr</a></li>
	                <li>웹표준, 웹접근성 프로젝트</li>
	                <li>퍼블리싱 운영</li>
	                <li>개발 운영</li>
	                <li>파일 관리기능 등 신규 개발</li>
	            </ul>
	        </div>
	        <a href="#" class="btn-close">닫기</a>
	    </div>
	</div>
	
	<div class="pop-detail" id="training">
	    <div class="inner">
	        <div class="sub-title">교육정보통합시스템 구축 사업</div>
	        <div class="section">
	            <ul class="project-list">
	                <li>웹표준, 웹접근성 프로젝트</li>
	                <li>약 500페이지</li>
	                <li>다량의 관리자 페이지 퍼블리싱</li>
	            </ul>
	        </div>
	        <a href="#" class="btn-close">닫기</a>
	    </div>
	</div>
	
	<div class="pop-detail" id="creative">
	    <div class="inner">
	        <div class="sub-title">창조경제타운 서비스 구축</div>
	        <div class="section">
	            <ul class="project-list">
	                <li><a target="_blank" href="https://www.creativekorea.or.kr/main/townIntro">https://www.creativekorea.or.kr</a></li>
	                <li>웹표준, 반응형, 웹접근성 프로젝트</li>
	                <li>약 400페이지</li>
	                <li>스크롤 이벤트 이용한 intro 페이지 구현</li>
	                <li>CSS3, 스크립트를 이용한 동적효과 구현</li>
	            </ul>
	        </div>
	        <a href="#" class="btn-close">닫기</a>
	    </div>
	</div>
	
	<div class="pop-detail" id="kicox">
	    <div class="inner">
	        <div class="sub-title">한국산업단지공단 홈페이지 구축</div>
	        <div class="section">
	            <ul class="project-list">
	                <li><a target="_blank" href="http://www.kicox.or.kr/index.do">http://www.kicox.or.kr</a></li>
	                <li>웹표준, 반응형, 웹접근성 프로젝트</li>
	                <li>약 200페이지</li>
	                <li>CSS3, 스크립트를 이용한 동적효과 구현</li>
	            </ul>
	        </div>
	        <a href="#" class="btn-close">닫기</a>
	    </div>
	</div>
	
	<div class="pop-detail" id="jdc">
	    <div class="inner">
	        <div class="sub-title">JDC 기관 홈페이지 유지보수 및 관리운영 용역</div>
	        <div class="section">
	            <ul class="project-list">
	                <li><a target="_blank" href="http://jdcenter.co.kr/main/index.do">http://jdcenter.co.kr</a></li>
	                <li>웹표준, 웹접근성 프로젝트</li>
	                <li>퍼블리싱 운영</li>
	                <li>개발 운영</li>
	                <li>약 200페이지</li>
	            </ul>
	        </div>
	        <a href="#" class="btn-close">닫기</a>
	    </div>
	</div>
	
	<div class="pop-detail" id="3ting-m">
	    <div class="inner">
	        <div class="sub-title">IITP 2차년도 모바일 기반 3D프린팅 콘텐츠 생성 저작 출력기술 R&D사업</div>
	        <div class="section">
	            <ul class="project-list">
	                <li>하이브리드앱 프로젝트</li>
	                <li>약 200페이지</li>
	            </ul>
	        </div>
	        <a href="#" class="btn-close">닫기</a>
	    </div>
	</div>
	
	<div class="pop-detail" id="coscoi-m">
	    <div class="inner">
	        <div class="sub-title">코스코이 모바일 개발</div>
	        <div class="section">
	            <ul class="project-list">
	                <li>하이브리드앱, 모바일웹 프로젝트</li>
	                <li>약 100페이지</li>
	                <li>전체 페이지 퍼블리싱</li>
	                <li>전체 페이지 개발</li>
	            </ul>
	        </div>
	        <a href="#" class="btn-close">닫기</a>
	    </div>
	</div>
	
	<a href="#" class="btn-top">Top</a>
    </body>
</html>