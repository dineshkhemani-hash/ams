package com.silvertouch.attendancemanagement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Validated
public class UserUpdateDTO {
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

    private Integer roleId; // Only send roleId instead of full Role object

//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
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
//    public Integer getRoleId() {
//        return roleId;
//    }
//
//    public void setRoleId(Integer roleId) {
//        this.roleId = roleId;
//    }
}
