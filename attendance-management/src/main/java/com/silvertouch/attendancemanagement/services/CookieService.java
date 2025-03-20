package com.silvertouch.attendancemanagement.services;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
public class CookieService {
//    @Value("${app.jwt.cookie-name}")
//    private String cookieName;
//
//    @Value("${app.jwt.expiration-ms}")
//    private int jwtExpirationMs;
//
//    @Value("${app.secure-cookie}")
//    private boolean secureCookie;
    public void addAuthCookie(HttpServletResponse response,String token){
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false)  // Set to true in production with HTTPS
                .sameSite("Lax")  // Changed from Strict to allow cross-site requests
                .path("/")        // Add path to make cookie available for all routes
                .domain("localhost")  // Add domain
                .maxAge(7 * 24 * 60 * 60)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE,cookie.toString());
    }
    public void clearAuthCookie(HttpServletResponse response){
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .maxAge(0)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE,cookie.toString());
    }
}
