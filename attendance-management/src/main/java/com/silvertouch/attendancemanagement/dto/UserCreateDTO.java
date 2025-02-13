package com.silvertouch.attendancemanagement.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserCreateDTO {

    @NotBlank(message = "Name is required")
    @NotNull(message = "Name is required")
//    @Pattern(regexp = "[a-zA-Z0-9 ]")
    @Pattern(regexp = "^[a-zA-Z ]+$", message = "Name can only contain letters and spaces")
    private String name;
    @NotBlank(message = "Email is required")
    @NotNull(message = "Email is required")
    @Email(message = "Invalid email format")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,6}$", message = "Invalid email format")
    private String email;
    @NotBlank(message = "Password is required")
    @NotNull(message = "Password is required")
    @Size(min = 8, message = "Password should be at least 8 characters long")
    private String password;

    private Integer roleId; // Only send roleId instead of full Role object

//    public String getName() {
//        return name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public Integer getRoleId() {
//        return roleId;
//    }
//
//    public void setRoleId(Integer roleId) {
//        this.roleId = roleId;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }

    // Getters & Setters
}
//@NotBlank(message = "Name is required")
//private String name;
//
//@NotBlank(message = "Email is required")
//@Email(message = "Invalid email format")
//private String email;
//
//@NotBlank(message = "Password is required")
//private String password;
//
//@NotNull(message = "Role ID is required")