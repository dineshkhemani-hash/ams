//package com.silvertouch.attendancemanagement.utils;
//
//import com.silvertouch.attendancemanagement.enums.ERoles;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import jakarta.servlet.http.HttpSession;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.HandlerInterceptor;
//
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Objects;
////
//@Component
//public class AdminAuthInterceptors implements HandlerInterceptor {
//    @Override
//
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
//            return true;
//        }
//        return true;
//    }
//}
//////        String token = request.getHeader("Authorization");
//////
//////        HttpSession session = request.getSession(false);
//////        if(session == null ||  session.getAttribute("role_name") == null){
//////
//////            response.setStatus(401);
//////            return false;
//////        }
//////        String isAdmin = session.getAttribute("role_name").toString();
//////        System.out.println(isAdmin + " Admin Auth Interceptor");
//////        if(Objects.equals(isAdmin, ERoles.ADMIN.toString())){
////////            response.setStatus(200);
//////            return true;
//////        }else {
//////            Map<String,String> jsonResponse = new HashMap<>();
//////            jsonResponse.put("status","failed");
//////            jsonResponse.put("message","Unauthorized");
//////            response.sendError(401,"Unauthorized");
////////            response.setStatus(401);
//////            return false;
//////        }
////////        if(token == null || !token.equals("Bearer admin")){
////////            response.setStatus(401);
////////            return false;
////////        }
////////        return true;
//////    }
//////}
