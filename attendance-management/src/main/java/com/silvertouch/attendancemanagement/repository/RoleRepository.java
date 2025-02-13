package com.silvertouch.attendancemanagement.repository;

import com.silvertouch.attendancemanagement.enums.ERoles;
import com.silvertouch.attendancemanagement.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Roles,Long> {
    Optional<Roles> findByName(ERoles name);
}
