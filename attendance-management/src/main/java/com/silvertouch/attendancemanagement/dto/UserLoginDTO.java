package com.silvertouch.attendancemanagement.dto;

import jakarta.validation.constraints.*;

public class UserLoginDTO {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Pattern(regexp=".+@.+\\..+",message = "Invalid Email Format")
    private String email;

    @NotBlank(message = "Password is required")
    @NotNull(message = "Password is required")
    @Size(min = 8, message = "Password should be at least 8 characters long")
    private String password;

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
