package com.silvertouch.attendancemanagement.dto;


import com.silvertouch.attendancemanagement.enums.ERoles;

import java.util.UUID;

public class UserDTO {
    private UUID id;
    private String name;
    private String email;
    private String roleName;

    // Constructor
    public UserDTO(UUID id, String name, String email, ERoles roleName) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.roleName = String.valueOf(roleName);
    }

    // Getters and setters
    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRoleName() { return roleName; }

    // Setter methods if needed
    public void setId(UUID id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setRoleName(String roleName) { this.roleName = roleName; }
}