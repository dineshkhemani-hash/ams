package com.silvertouch.attendancemanagement.dto;

import com.silvertouch.attendancemanagement.enums.ERoles;
import com.silvertouch.attendancemanagement.model.Users;

import java.util.UUID;

public class UserResponseDTO {

    private UUID id;
    private String name;
    private String email;
    private String token;
    private Integer role_id;
    private ERoles role_name;
//    public UserResponseDTO(UUID id, String name, String email, Integer role_id, String role_name){
//        this.id = id;
//        this.name = name;
//        this.email = email;
////        this.password = password;
//        this.role_id = role_id;
//        this.role_name = role_name;
//    }

// ✅ Add a constructor that accepts a Users object
public UserResponseDTO(Users user) {

    this.id = user.getId();
    this.name = user.getName();
    this.email = user.getEmail();
    this.role_id = user.getRole().getId();
    this.role_name = user.getRole().getName();
}
    public void setToken(String token){
    this.token = token;
    }
    // Getters only, no setters needed
    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Integer getRoleId() { return role_id; }
    public ERoles getRoleName() { return role_name; }
    public String getToken() {return token;}
//    public static UserResponseDTO fromUser(Users user) {
//        return UserResponseDTO.builder()
//                .id(user.getId())
//                .email(user.getEmail())
//                .name(user.getName())
//                .role_name(user.getRole().getName())
//
//                .build();
//    }

}
