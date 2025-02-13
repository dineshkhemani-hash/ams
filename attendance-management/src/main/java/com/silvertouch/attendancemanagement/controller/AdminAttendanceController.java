package com.silvertouch.attendancemanagement.controller;

import com.silvertouch.attendancemanagement.dto.ApiResponseDTO;
import com.silvertouch.attendancemanagement.dto.AttendanceCreateDTO;
import com.silvertouch.attendancemanagement.dto.AttendanceListDTO;
import com.silvertouch.attendancemanagement.dto.UserResponseDTO;
import com.silvertouch.attendancemanagement.model.Attendance;
import com.silvertouch.attendancemanagement.model.Users;
import com.silvertouch.attendancemanagement.services.AdminAttendanceService;
import com.silvertouch.attendancemanagement.services.AdminService;
import com.silvertouch.attendancemanagement.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/attendance")
public class AdminAttendanceController {
    private final AdminAttendanceService adminAttendanceService;
    @Autowired
    public AdminAttendanceController(AdminAttendanceService adminAttendanceService){
        this.adminAttendanceService = adminAttendanceService;
    }
    @GetMapping("/daily")
    public ResponseEntity<?> getDailyAttendanceList(HttpServletRequest request){
//        HttpSession session = request.getSession(false);
//        if(session == null){
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
        Users currentUser = AuthenticationService.getCurrentUser();
        if(currentUser != null){
            List<AttendanceListDTO> attendanceDailyList = adminAttendanceService.getDailyAttendanceList();
            return new ResponseEntity<>(attendanceDailyList,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }



    }
}
