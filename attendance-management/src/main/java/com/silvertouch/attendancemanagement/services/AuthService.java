package com.silvertouch.attendancemanagement.services;

import com.silvertouch.attendancemanagement.dto.UserLoginDTO;
import com.silvertouch.attendancemanagement.dto.UserSignupDTO;
import com.silvertouch.attendancemanagement.enums.ERoles;
import com.silvertouch.attendancemanagement.model.Roles;
import com.silvertouch.attendancemanagement.model.Users;
import com.silvertouch.attendancemanagement.repository.RoleRepository;
import com.silvertouch.attendancemanagement.repository.UserRepository;
import com.silvertouch.attendancemanagement.utils.AuthMethods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

@Service

public class AuthService {
    private final UserRepository userRepository;
    public RoleRepository roleRepository;

@Autowired
    public AuthService( RoleRepository roleRepository, UserRepository userRepository) {
    this.roleRepository = roleRepository;

    this.userRepository = userRepository;
}

    public Users Signup(UserSignupDTO userSignupDTO){
          Roles role = roleRepository.findByName(ERoles.USER).orElseThrow(() -> new RuntimeException("Role not found"));
          Users users = new Users();
          users.setName(userSignupDTO.getName());
          users.setEmail(userSignupDTO.getEmail());
//          String hashedPassword = AuthMethods.encryptPassword(userSignupDTO.getPassword());
          users.setPassword(userSignupDTO.getPassword());
          users.setRole(role);
          return userRepository.save(users);
    }
    public Users Login(UserLoginDTO userLoginDTO){
        Users user = userRepository.findByEmail(userLoginDTO.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        if(AuthMethods.checkPassword(userLoginDTO.getPassword(),user.getPassword())){
            return user;
        }else {
            throw new BadCredentialsException("Invalid Email or Password");
        }
//        throw new RuntimeException("Invalid password");
    }
}
