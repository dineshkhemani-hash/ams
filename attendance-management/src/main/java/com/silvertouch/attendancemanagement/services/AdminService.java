package com.silvertouch.attendancemanagement.services;

import com.silvertouch.attendancemanagement.dto.UserCreateDTO;
import com.silvertouch.attendancemanagement.dto.UserResponseDTO;
import com.silvertouch.attendancemanagement.dto.UserUpdateDTO;
import com.silvertouch.attendancemanagement.enums.ERoles;
import com.silvertouch.attendancemanagement.exception.ResourceNotFoundException;
import com.silvertouch.attendancemanagement.model.Roles;
import com.silvertouch.attendancemanagement.model.Users;
import com.silvertouch.attendancemanagement.repository.AttendanceRepository;
import com.silvertouch.attendancemanagement.repository.RoleRepository;
import com.silvertouch.attendancemanagement.repository.UserRepository;

import com.silvertouch.attendancemanagement.utils.AuthMethods;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AdminService {
    private final AttendanceRepository attendanceRepository;
    public UserRepository userRepository;
    public RoleRepository roleRepository;
    @Autowired
    public AdminService(UserRepository userRepository, RoleRepository roleRepository, AttendanceRepository attendanceRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.attendanceRepository = attendanceRepository;
    }
//    public Roles getRoleById(Integer roleId) {
//        return roleRepository.findById(Long.valueOf(roleId))
//                .orElseThrow(() -> new RuntimeException("Role not found with ID " + roleId));
//    }
    public List<Roles> getAllRoles(){
        return roleRepository.findAll();
    }
    public UserResponseDTO createUser(UserCreateDTO userDTO){
                Roles role = roleRepository.findById(Long.valueOf(userDTO.getRoleId())).orElseThrow(() -> new RuntimeException("Role not found"));
                Users user = new Users();
                user.setName(userDTO.getName());
                user.setEmail(userDTO.getEmail());
                user.setPassword(AuthMethods.encryptPassword(userDTO.getPassword()));
                user.setRole(role); // Set the fetched Role object
                return new UserResponseDTO(userRepository.save(user));

    }
    public List<UserResponseDTO> getAllUsers(){
        return userRepository.findAll().stream().map(UserResponseDTO::new).collect(Collectors.toList());
    }
    public Users getUserById(UUID id){
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
    public UserResponseDTO updateUser(UUID id, UserUpdateDTO userUpdateDTO){
       Users existingUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
       Roles role = roleRepository.findById(Long.valueOf(userUpdateDTO.getRoleId())).orElseThrow(() -> new ResourceNotFoundException("Role not found"));
       existingUser.setName(userUpdateDTO.getName());
       existingUser.setEmail(userUpdateDTO.getEmail());
       existingUser.setRole(role);
       return new UserResponseDTO(userRepository.save(existingUser));
    }
    public void deleteUser(UUID id) {
        Users existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userRepository.deleteById(existingUser.getId());
    }
    public List<UserResponseDTO> searchUsers(String query){
        List<Users> users;
        if(query.equalsIgnoreCase("USER") || query.equalsIgnoreCase("ADMIN") || query.equalsIgnoreCase("EMPLOYEE")){
            users = userRepository.searchUsersByRoleName(ERoles.valueOf(query.toUpperCase()));
        }else{
            users = userRepository.searchUserByName(query);
        }
        return users.stream().map(UserResponseDTO::new).collect(Collectors.toList());
    }



}
