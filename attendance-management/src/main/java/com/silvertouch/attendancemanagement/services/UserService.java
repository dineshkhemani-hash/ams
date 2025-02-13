//package com.silvertouch.attendancemanagement.services;
//
//import com.silvertouch.attendancemanagement.model.Users;
//import com.silvertouch.attendancemanagement.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserService {
//    private final UserRepository userRepository;
//    @Autowired
//    public UserService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//    public Users insertUser(){
//        Users user = new Users();
//        user.setName("John Doe");
//        user.setEmail("john.doe@example.com");
//        user.setPassword("hashedpassword");
//        user.setRoleId(1);
//
//        Users savedUser = userRepository.save(user);
//        return savedUser;
//    }
//}
