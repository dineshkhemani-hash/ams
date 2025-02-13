package com.silvertouch.attendancemanagement.controller;

import com.silvertouch.attendancemanagement.dto.ApiResponseDTO;
import com.silvertouch.attendancemanagement.dto.UserLoginDTO;
import com.silvertouch.attendancemanagement.dto.UserResponseDTO;
import com.silvertouch.attendancemanagement.dto.UserSignupDTO;
import com.silvertouch.attendancemanagement.model.Users;
import com.silvertouch.attendancemanagement.repository.UserRepository;
import com.silvertouch.attendancemanagement.security.JwtUtills;
import com.silvertouch.attendancemanagement.services.AuthService;
import com.silvertouch.attendancemanagement.services.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/api/v1/auth")
@Validated
public class AuthController {
    private final AuthService authService;
    private final JwtUtills jwtUtils;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    //Since spring 4.3 @AutoWired is optional for single constructor class
    public AuthController(AuthService authService, JwtUtills jwtUtills, AuthenticationService authenticationService, UserRepository userRepository) {
        this.authService = authService;
        this.jwtUtils = jwtUtills;
        this.authenticationService = authenticationService;
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody UserSignupDTO userSignupDTO, HttpServletRequest request, HttpServletResponse servletResponse) {
        Users createdUser = authService.Signup(userSignupDTO);
        //Step 1 generate token
        String token = jwtUtils.generateToken(createdUser.getId());
        System.out.println("Generated token at signup " + token);
        //step 2 add it to cookies
        servletResponse.setHeader(HttpHeaders.SET_COOKIE, createCookie(token).toString());
        UserResponseDTO userData = new UserResponseDTO(createdUser);
        ApiResponseDTO<UserResponseDTO> response = new ApiResponseDTO<>(
                "SUCCESS",
                "Account Created Successfully",
                userData
        );
//        return new ResponseEntity<UserResponseDTO>(new UserResponseDTO(createdUser), HttpStatus.CREATED);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserLoginDTO userLoginDTO, HttpServletRequest request, HttpServletResponse httpServletResponse) {
//        try{
//            Users user = authService.Login(userLoginDTO);
//            String token = jwtUtils.generateToken(user.getId());
//
//            ResponseCookie cookie = createCookie(token);
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
//                    .body(new ApiResponseDTO<>("SUCCESS", "Login successful", user));
//        }catch (AuthenticationException e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(new ApiResponseDTO<>("FAILURE", "Invalid credentials"));
//        }
        Users user = authService.Login(userLoginDTO);
        if (user != null) {
            String token = jwtUtils.generateToken(user.getId());
            httpServletResponse.setHeader(HttpHeaders.SET_COOKIE, createCookie(token).toString());
            UserResponseDTO userData = new UserResponseDTO(user);
            userData.setToken(token);
            ApiResponseDTO<UserResponseDTO> response = new ApiResponseDTO<>(
                    "SUCCESS",
                    "Login successful",
                    userData
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            // Log the failure for debugging purposes
            System.out.println("Authentication failed for user: " + userLoginDTO.getEmail());
            ApiResponseDTO<String> errorResponse = new ApiResponseDTO<>(
                    "FAILURE",
                    "Authentication failed"
            );
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse httpServletResponse) {
        Cookie[] cookies = request.getCookies();
        String authHeader = request.getHeader("Authorization");

        if (cookies != null || authHeader != null || authHeader.startsWith("Bearer")) {
            Users currentUser = AuthenticationService.getCurrentUser();
            currentUser.setLastLogoutTime(Instant.now());
            userRepository.save(currentUser);
            ResponseCookie deleteCookie = ResponseCookie.from("jwt", "")
                    .httpOnly(true)
                    .secure(false)  // Set to true in production with HTTPS
                    .sameSite("Lax")  // Changed from Strict to allow cross-site requests
                    .path("/")        // Add path to make cookie available for all routes
                    .domain("localhost")  // Add domain
                    .maxAge(0)
                    .build();
            httpServletResponse.setHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());
            ApiResponseDTO<?> response = new ApiResponseDTO<>(
                    "SUCCESS",
                    "Logout successful"

            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        ApiResponseDTO<String> errorResponse = new ApiResponseDTO<>(
                "FAILURE",
                "You are not logged in"

        );
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);

    }

    @GetMapping("/check-user")
    public ResponseEntity<?> checkSession(HttpServletRequest request) {
        try {
            Users currentUser = AuthenticationService.getCurrentUser();

            UserResponseDTO userResponse = new UserResponseDTO(currentUser);

            ApiResponseDTO<UserResponseDTO> response = new ApiResponseDTO<>(
                    "SUCCESS",
                    "User is authenticated",
                    userResponse
            );

//                log.info("User authentication check successful for user: {}", currentUser.getId());
//            String token = extractToken(request);
//            Instant iat = jwtUtils.getIssuedAt(token);
//            if (currentUser.getLastLogoutTime() != null && iat.isBefore(currentUser.getLastLogoutTime())) {
//                SecurityContextHolder.clearContext();
//                throw new UnauthorizedException("Token revoked");
//            }
            return ResponseEntity.ok(response);

        } catch (AuthenticationCredentialsNotFoundException e) {
//                log.warn("Authentication check failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponseDTO<>("FAILURE", "User not authenticated", null));
        } catch (Exception e) {
//                log.error("Unexpected error during authentication check", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDTO<>("ERROR", "Internal server error", null));
        }
//            Map<String,String> response = new HashMap<>();
//            response.put("status","success");
//            response.put("message","User is logged in");
//            response.put("user_id", currentUser.getId());
//            return new ResponseEntity<>(response,HttpStatus.OK);
    }


    private ResponseCookie createCookie(String token) {

        return ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false)  // Set to true in production with HTTPS
                .sameSite("Lax")  // Changed from Strict to allow cross-site requests
                .path("/")        // Add path to make cookie available for all routes
                .domain("localhost")  // Add domain
                .maxAge(7 * 24 * 60 * 60)
                .build();
    }
}
//{
//        "name":"hello",
//        "email":"hello1@world.com",
//        "password":"123456789"
//        }
//kya karna hai idhar
//like react and spring backend
//react mai login option only for now
//that login will spring mai jaayega but don't know how to check for that like roleid se pata chalega kon admin and kon user
//but backend mai kya hai actually like