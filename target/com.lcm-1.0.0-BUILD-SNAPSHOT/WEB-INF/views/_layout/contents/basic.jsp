<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/include-jstl.jsp" %>

<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="utf-8">
        <title>lcm</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name=”viewport” content=”width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no” />
        
        <%@ include file="/WEB-INF/include/include-js.jsp" %>
    </head>
    <body>
        <%-- <tiles:insertAttribute name="header"/> --%>
        <%-- <tiles:insertAttribute name="aside"/> --%>
        <tiles:insertAttribute name="contents"/>
    </body>
</html>