package com.silvertouch.attendancemanagement.controller;

import com.silvertouch.attendancemanagement.dto.*;
import com.silvertouch.attendancemanagement.model.Roles;
import com.silvertouch.attendancemanagement.model.Users;
import com.silvertouch.attendancemanagement.repository.AttendanceRepository;
import com.silvertouch.attendancemanagement.services.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin")
@Validated
//@CrossOrigin("*")


//TODO add validations and exception handling
public class AdminController {
    private final AdminService adminService;
    private final AttendanceRepository attendanceRepository;

    @Autowired
    public AdminController(AdminService adminService, AttendanceRepository attendanceRepository) {
        this.adminService = adminService;
        this.attendanceRepository = attendanceRepository;
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers(){
        List<UserResponseDTO> users = adminService.getAllUsers();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable UUID id){
        Users foundUser = adminService.getUserById(id);
        return new ResponseEntity<>(new UserResponseDTO(foundUser),HttpStatus.OK);
    }
    @PostMapping("/user")
    public  ResponseEntity<ApiResponseDTO<UserResponseDTO>> createUser(@Valid @RequestBody UserCreateDTO userDTO){
        UserResponseDTO newUser = adminService.createUser(userDTO);
        ApiResponseDTO<UserResponseDTO> response = new ApiResponseDTO<>(
                "SUCCESS",
                "User Created Successfully",
                newUser
        );
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }
    @PatchMapping("/user/{id}")
    public ResponseEntity<ApiResponseDTO<UserResponseDTO>> updateUser(@PathVariable UUID id, @Valid @RequestBody UserUpdateDTO userUpdateDTO) {
        UserResponseDTO updatedUser = adminService.updateUser(id, userUpdateDTO);
        ApiResponseDTO<UserResponseDTO> response = new ApiResponseDTO<>(
                "SUCCESS",
                "User Created Successfully",
                updatedUser
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

//    @RequestMapping(value = "/user/{id}", method = RequestMethod.OPTIONS)
//    public ResponseEntity<?> handleOptions() {
//        return ResponseEntity.ok().build();
//    }
    @DeleteMapping("/user/{id}")
    public ResponseEntity<Map<String,String>> deleteUser(@PathVariable UUID id, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        adminService.deleteUser(id);
        Map<String, String> response = new HashMap<>();
        response.put("status","success");
        response.put("message", "User deleted successfully");

        return new ResponseEntity<>(response,HttpStatus.OK);
//        return ResponseEntity.noContent().build(); //means 204 user deleted successfully
    }
    @GetMapping(path = "/search",params = "q")
    public ResponseEntity<List<UserResponseDTO>> searchUsers(@RequestParam String q){
        List<UserResponseDTO> users = adminService.searchUsers(q);
        return new ResponseEntity<>(users,HttpStatus.OK);
    }
    @GetMapping("/roles")
    public ResponseEntity<List<Roles>> getAllRoles(){
        return new ResponseEntity<>(adminService.getAllRoles(),HttpStatus.OK);
    }

}
