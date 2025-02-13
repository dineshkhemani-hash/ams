package com.silvertouch.attendancemanagement;

import com.silvertouch.attendancemanagement.repository.AttendanceRepository;
import com.silvertouch.attendancemanagement.repository.RoleRepository;
import com.silvertouch.attendancemanagement.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

public class AttendanceManagementApplication {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AttendanceRepository attendanceRepository;
    @Autowired
    private RoleRepository roleRepository;
    public static void main(String[] args) {
        SpringApplication.run(AttendanceManagementApplication.class, args);
//        try{
//            Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/attendance_management_system","postgres","1234");
//            if(conn != null) {
//                System.out.println("Connected to PostgreSQL database");
//
//                Users user = new Users();
//                user.setName("John Doe");
//                user.setEmail("john.doe@example.com");
//                user.setPassword("hashedpassword");
//                user.setRoleId(1);
//
        //main method tries to use userRepository before Spring Boot has even started
        //because Spring Boot initializes the application context after main() starts.
//                Users savedUser = userRepository.save(user);
//                System.out.println(savedUser); // ID is assigned after saving!
//                System.out.println(savedUser.getEmail());
//
//            }
//        }catch(Exception e){
//            System.out.println("Error when connecting to postgres" + ": " + e.getMessage());
//        }

    }


    @PostConstruct //it ensures the method runs after the application context is initialized. that's why we can use userRepository here
    public void testRepository() {
//        Arrays.stream(ERoles.values()).forEach(roleEnum -> {
//            roleRepository.findByName(roleEnum).orElseGet(() -> {
//                Roles role = new Roles();
//                role.setName(roleEnum);
//                return roleRepository.save(role);
//            });
//        });
//        System.out.println("✅ Default roles seeded.");
////        Roles roles = new Roles();
//////        roles.setName(ERoles.ADMIN);
//        Roles role = roleRepository.findByName(ERoles.ADMIN).orElseThrow(() -> new ResourceNotFoundException("Role not found"));
////        System.out.println(role.getName() + " " +  role.getId());
////        Roles existingRole = roleRepository.findById((long)role.getId()).orElseThrow(() -> new RuntimeException("Role not found"));
//        Users user = new Users();
//        user.setName("John Doe");
//        user.setEmail("john.doe32@example.com");
//        user.setPassword("hashedpassword");
//        user.setRole(role);
//
//        Users savedUser = userRepository.save(user);
////        System.out.println(savedUser); // ID is assigned after saving!
////        System.out.println(savedUser.getEmail());
////        Users savedUser =  userRepository.findAll().get(0);
//
//        Attendance attendance = new Attendance();
//        attendance.setUser(savedUser); // Associate the attendance with the saved user
//        attendance.setAttendanceDate(new Date(System.currentTimeMillis() / 1000 * 1000 ));
//        attendance.setIn_time(new Time(System.currentTimeMillis() / 1000 * 1000));
//        attendance.setOut_time(new Time((System.currentTimeMillis() + 6000000) / 1000 * 1000)); // 10 hours later
//        attendance.setStatus("fullday") ;
//        Attendance savedAttendance = attendanceRepository.save(attendance);
//        System.out.println(savedAttendance); // ID is assigned after saving!
//        System.out.println(savedAttendance.getAttendanceDate());
//        System.out.println(savedAttendance.getIn_time());
//        System.out.println(savedAttendance.getOut_time());
//        System.out.println(savedAttendance.getDuration());
//


    }

}

//------------------------------------------------------------------------------------------------------------------------------
//CommandLineRunner runs after Spring Boot starts and initializes all beans so it  ensures the userRepository is initialized before running
//@Component
//class TestDataLoader implements CommandLineRunner {
//
//    private final UserRepository userRepository;
//
//    public TestDataLoader(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        System.out.println("Testing UserRepository...");
//
//        Users user = new Users();
//        user.setName("John Doe");
//        user.setEmail("john.doe@example.com");
//        user.setPassword("hashedpassword");
//        user.setRoleId(1);
//
//        Users savedUser = userRepository.save(user);
//        System.out.println(savedUser); // ID is assigned after saving!
//        System.out.println(savedUser.getEmail());
//    }
//}