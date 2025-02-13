package com.silvertouch.attendancemanagement.controller;

import com.silvertouch.attendancemanagement.dto.*;
import com.silvertouch.attendancemanagement.enums.ReportType;
import com.silvertouch.attendancemanagement.model.Attendance;
import com.silvertouch.attendancemanagement.model.Users;
import com.silvertouch.attendancemanagement.services.AttendanceService;
import com.silvertouch.attendancemanagement.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.UUID;

// attenaance ke liye user_id chahiye which come from session, attendance date automatically, in_time current_time and out_time can be null and duration can be calculated, status also can be null
// case 1 only in_time is there and attendance_Date is changed then mark status as absent
// case 2 only in_time is there and out_time is there then mark status as present also calculate duration
// CASE 3 only in_time is there and out_time is null then mark status as ABSENT and duration as null


@RestController
@RequestMapping("/api/v1/attendance")
@Validated
public class AttendanceController {
    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping("/in")
    public ResponseEntity<ApiResponseDTO<AttendanceCreateDTO>> markInAttendance(@Valid @RequestBody AttendanceCreateDTO attendanceCreateDTO, HttpServletRequest request){
//        HttpSession session = request.getSession(false);
//        if (session == null) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
//       UUID userId = UUID.fromString(session.getAttribute("user_id").toString());
        Users currentUser = AuthenticationService.getCurrentUser();
        if(currentUser != null) {
            UUID userId = currentUser.getId();
            Attendance attendance = attendanceService.createAttendance(userId, attendanceCreateDTO);
            ApiResponseDTO<AttendanceCreateDTO> response = new ApiResponseDTO<>(
                    "SUCCESS",
                    "Attendance marked successfully",
                    new AttendanceCreateDTO(attendance)
            );
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }
    @PatchMapping("/out/{attendanceId}")
    public ResponseEntity<ApiResponseDTO<AttendanceCreateDTO>> markOutAttendance(@PathVariable UUID attendanceId, @Valid @RequestBody OutTimeDTO outTimeDTO, HttpServletRequest request){
        Users currentUser = AuthenticationService.getCurrentUser();
        if(currentUser != null) {
            UUID userId = currentUser.getId();
//        Attendance attendance = attendanceService.markOutAttendance(userId,attendanceId,new Time(out_time));
//        return new ResponseEntity<>(new AttendanceCreateDTO(attendance),HttpStatus.CREATED);
        try{
            Time outTime = Time.valueOf(outTimeDTO.getOutTime());
            System.out.println(outTime);
            Attendance attendance = attendanceService.markOutAttendance(userId,attendanceId,outTime);
            ApiResponseDTO<AttendanceCreateDTO> response = new ApiResponseDTO<>(
                    "SUCCESS",
                    "Attendance marked successfully",
                    new AttendanceCreateDTO(attendance)
            );
            return new ResponseEntity<>(response,HttpStatus.CREATED);
        }catch (IllegalAccessError error){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
        else{

            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    //TODO check for user id so only particular user get their report
    @GetMapping(path = "/report",params = "limit")
    public ResponseEntity<List<AttendanceCreateDTO>> getAttendanceReport(@RequestParam int limit, HttpServletRequest request){
//        HttpSession session = request.getSession(false);
//        if(session == null){
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//        }
        Users currentUser = AuthenticationService.getCurrentUser();

        if(currentUser != null) {
            UUID userId =currentUser.getId();
            List<AttendanceCreateDTO> attendanceList = attendanceService.getAttendanceReport(userId, limit);
            return new ResponseEntity<>(attendanceList, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
//        return ResponseEntity.ok("Attendance Report id " + attendance_id);
    }

//    TODO Type can be today's,weekly, monthly, yearly WILL BE IMPLEMENTED LATER
    @GetMapping(value = "/report",params = "type")
    public ResponseEntity<List<AttendanceCreateDTO>> getAttendanceReportByType(  @RequestParam @Pattern(regexp = "(?i)(WEEKLY|MONTHLY)",
            message = "Type must be either WEEKLY, MONTHLY")  String type,  @RequestParam(required = false) Integer year,
                                                                                 @RequestParam(required = false) Integer month ){
        Users currentUser = AuthenticationService.getCurrentUser();
        if(currentUser != null) {
            UUID userId =currentUser.getId();
           List<AttendanceCreateDTO> attendanceList = attendanceService.getAttendanceReportByType(userId, type,year,month);
            return new ResponseEntity<>(attendanceList,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
//        return ResponseEntity.ok("Attendance Report type" + type);


    }

}
