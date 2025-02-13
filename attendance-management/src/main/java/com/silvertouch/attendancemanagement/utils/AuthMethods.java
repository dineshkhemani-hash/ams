package com.silvertouch.attendancemanagement.utils;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


public class AuthMethods {
    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public static String encryptPassword(String password) {
        return passwordEncoder.encode(password);
    }
    public static boolean checkPassword(String password, String hashedPassword){
        return passwordEncoder.matches(password,hashedPassword);
    }
}
