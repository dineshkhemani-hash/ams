package com.silvertouch.attendancemanagement.model;

import com.silvertouch.attendancemanagement.enums.ERoles;
import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) /// tells Hibernate not to set the value manually, but to let the database handle it.
    @Column(columnDefinition = "SERIAL PRIMARY KEY")
    private int id;
    @Column(nullable = false,unique = true)
    @Enumerated(EnumType.STRING)// Store the enum value as a string (e.g., "ADMIN")
    private ERoles name;
    public int getId() {
        return id;
    }

    public ERoles getName() {
        return name;
    }

    public void setName(ERoles name) {
        this.name = name;
    }
}
