//package com.silvertouch.attendancemanagement.controller;
//
//import com.silvertouch.attendancemanagement.dto.ApiResponseDTO;
//import com.silvertouch.attendancemanagement.dto.UserLoginDTO;
//import com.silvertouch.attendancemanagement.dto.UserResponseDTO;
//import com.silvertouch.attendancemanagement.dto.UserSignupDTO;
//import com.silvertouch.attendancemanagement.model.Users;
//import com.silvertouch.attendancemanagement.services.AuthService;
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import jakarta.servlet.http.HttpSession;
//import jakarta.validation.ConstraintViolationException;
//import jakarta.validation.Valid;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.MethodArgumentNotValidException;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/v1/auth")
//@Validated
//public class AuthControllerWithSession {
//    private final AuthService authService;
//
//
//
//    public AuthControllerWithSession(AuthService authService) {
//        this.authService = authService;
//    }
//
//    @PostMapping("/signup")
//    public ResponseEntity<?> signup(@Valid  @RequestBody UserSignupDTO userSignupDTO, HttpServletRequest request){
//        Users createdUser = authService.Signup(userSignupDTO);
//        System.out.println(new UserResponseDTO(createdUser));
//        HttpSession session = request.getSession(true);
//        session.setAttribute("user_id", createdUser.getId());
//        session.setAttribute("role_name", createdUser.getRole().getName());
//        UserResponseDTO userData = new UserResponseDTO(createdUser);
//        ApiResponseDTO<UserResponseDTO> response = new ApiResponseDTO<>(
//                "SUCCESS",
//                "Account Created Successfully",
//                userData
//        );
////        return new ResponseEntity<UserResponseDTO>(new UserResponseDTO(createdUser), HttpStatus.CREATED);
//        return new ResponseEntity<>(response, HttpStatus.CREATED);
//
//
//
//
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@Valid @RequestBody  UserLoginDTO userLoginDTO, HttpServletRequest request){
//        Users user = authService.Login(userLoginDTO);
//        if(user != null){
//            HttpSession session = request.getSession(true);
//            session.setAttribute("user_id", user.getId());
//            session.setAttribute("role_name", user.getRole().getName());
////            session.setMaxInactiveInterval(60*60);
//            UserResponseDTO userData = new UserResponseDTO(user);
//            ApiResponseDTO<UserResponseDTO> response = new ApiResponseDTO<>(
//                    "SUCCESS",
//                    "Login successful",
//                    userData
//            );
//            return new ResponseEntity<>(response, HttpStatus.OK);
//
//        }
//        // TODO Instead of this response we getting generic error handler response
//        ApiResponseDTO<String> errorResponse = new ApiResponseDTO<>(
//                "FAILURE",
//                "Authentication failed"
//
//        );
//        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
//    }
//    @PostMapping("/logout")
//    @CrossOrigin(origins = "http://localhost:5173")
//    public ResponseEntity<?> logout(HttpServletRequest request) {
//        HttpSession session = request.getSession(false);
//        if (session != null) {
//            session.setAttribute("user_id", null);
//            session.setAttribute("role_name", null);
//            session.invalidate();
//
//            Map<String, String> response = new HashMap<>();
//            response.put("status", "success");
//            response.put("message", "Logged out successfully");
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        }
//        ApiResponseDTO<String> errorResponse = new ApiResponseDTO<>(
//                "FAILURE",
//                "You are not logged in"
//
//        );
//        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
//
//    }
//    @GetMapping("/check-user")
//    public ResponseEntity<?> checkSession(HttpServletRequest request){
//        HttpSession session = request.getSession(false);
//        if(session != null){
//            Map<String,String> response = new HashMap<>();
//            response.put("status","success");
//            response.put("message","User is logged in");
//            response.put("user_id",session.getAttribute("user_id").toString());
//            return new ResponseEntity<>(response,HttpStatus.OK);
//        }
////        Map<String,String> jsonResponse = new HashMap<>();
////        jsonResponse.put("status","failed");
////        jsonResponse.put("message","Unauthorized");
//        ApiResponseDTO<String> errorResponse = new ApiResponseDTO<>(
//                "FAILURE",
//                "Authentication failed"
//
//        );
//        return new ResponseEntity<>(errorResponse,HttpStatus.UNAUTHORIZED);
//    }
//}
////{
////        "name":"hello",
////        "email":"hello1@world.com",
////        "password":"123456789"
////        }
////kya karna hai idhar
////like react and spring backend
////react mai login option only for now
////that login will spring mai jaayega but don't know how to check for that like roleid se pata chalega kon admin and kon user
////but backend mai kya hai actually like