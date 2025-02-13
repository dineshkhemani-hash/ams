package com.silvertouch.attendancemanagement.security;

import com.silvertouch.attendancemanagement.exception.ResourceNotFoundException;
import com.silvertouch.attendancemanagement.model.Users;
import com.silvertouch.attendancemanagement.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

@Component
@EnableMethodSecurity
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtUtills jwtUtills;
    private final UserRepository userRepository;
@Autowired
public JwtAuthFilter(JwtUtills jwtUtills,UserRepository userRepository){
    this.jwtUtills = jwtUtills;
    this.userRepository = userRepository;
}
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = extractToken(request);
        if(token != null){
            try{
                //validate the token and get the userid
                UUID userId = jwtUtills.validateToken(token);
                System.out.println("User id "  + userId);
                Users user =userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User does not exist"));
                //check token validity against last logout time
                Instant iat = jwtUtills.getIssuedAt(token);
                System.out.println("IAT " + iat);
                System.out.println(user.getLastLogoutTime());
                if(user.getLastLogoutTime() != null && iat.isBefore(user.getLastLogoutTime())){
                    //token issued before last logout time
                    response.sendError(HttpStatus.UNAUTHORIZED.value(),"TOKEN revoked");
                    SecurityContextHolder.clearContext();
                    return;
                }
                //Token valid ho then set authentication
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().getName())));
                    SecurityContextHolder.getContext().setAuthentication(auth);



//                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user,null, Collections.EMPTY_LIST);
//                SecurityContextHolder.getContext().setAuthentication(auth);
            }catch (Exception e){
                logger.warn("Token validation failed: " + e.getMessage());
                SecurityContextHolder.clearContext();
            }
        }else{
            logger.warn("No JWT token found in request");
        }
        filterChain.doFilter(request, response);
    }
    private String extractToken(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        if(cookies != null){
        for(Cookie cookie : cookies){
            if("jwt".equals(cookie.getName())){
                return cookie.getValue();
            }
        }
        }
    //if cookie null check for token in authorization header
        String authHeader =request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer")){
                return null;
        }
        return authHeader.substring(7);
    }
}
