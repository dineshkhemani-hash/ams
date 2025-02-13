package com.silvertouch.attendancemanagement.model;

import com.silvertouch.attendancemanagement.utils.AuthMethods;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.springframework.validation.annotation.Validated;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")

public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) /// tells Hibernate not to set the value manually, but to let the database handle it.
    @Column(columnDefinition = "UUID default gen_random_uuid()") // Ensures UUID default is respected
    private UUID id;

    @Column(nullable = false, length = 100) // Matches VARCHAR(100) constraint
    @NotNull
    @NotEmpty
//    @Pattern(regexp = "[a-zA-Z0-9 ]")
    private String name;
    @Column(nullable = false, length = 250) // Matches VARCHAR(250)
    private String email;
    @Column(nullable = false, length = 250) // Matches VARCHAR(250)

    private String password;
    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id") // Foreign key mapping
    private Roles role;

    @Column(name = "last_logout")
    private Instant lastLogoutTime;

    public UUID getId() {
        return id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = AuthMethods.encryptPassword(password);
    }


    public Integer getRoleId() {
        return role.getId();
    }
    public Roles getRole() { return role; }
    public void setRole(Roles role) { this.role = role; }

    public Instant getLastLogoutTime(){
        return lastLogoutTime;
    }
    public void setLastLogoutTime(Instant lastLogoutTime){
        this.lastLogoutTime = lastLogoutTime;
    }


}
