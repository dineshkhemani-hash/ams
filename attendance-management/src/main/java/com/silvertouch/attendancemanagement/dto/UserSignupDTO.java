package com.silvertouch.attendancemanagement.dto;

import jakarta.validation.constraints.*;
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
public class UserSignupDTO {

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

//    @NotNull(message = "Role ID is required")
//    private Integer roleId;  // Assuming you need role; if not, omit it.

    // Getters and Setters
//    public String getName() { return name; }
//    public void setName(String name) { if(name.isBlank()) { throw new IllegalArgumentException("Name cannot be empty"); } this.name = name; }
//
//    public String getEmail() { return email; }
//    public void setEmail(String email) { if(email.isBlank()) { throw new IllegalArgumentException("Email cannot be empty"); } this.email = email; }
//
//    public String getPassword() { return password; }
//    public void setPassword(String password) { if(password.isBlank() || password.length() < 8) { throw new IllegalArgumentException("Password cannot be empty or its length should be greater then 8"); } this.password = password; }

//    public Integer getRoleId() { return roleId; }
//    public void setRoleId(Integer roleId) { this.roleId = roleId; }
}
