package com.silvertouch.attendancemanagement.repository;

import com.silvertouch.attendancemanagement.enums.ERoles;
import com.silvertouch.attendancemanagement.model.Users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<Users, UUID> {
    Optional<Users> findByEmail(String email);
    @Query("select u from Users u join Roles r on u.role.id = r.id where r.name = :roleName")
    List<Users> searchUsersByRoleName(ERoles roleName);
    @Query("select u from Users u where lower(u.name) like lower(concat('%', :name, '%'))")
    List<Users> searchUserByName(String name);

    boolean existsByEmail(@NotBlank(message = "Email is required") @NotNull(message = "Email is required") @Email(message = "Invalid email format") @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,6}$", message = "Invalid email format") String email);
}
