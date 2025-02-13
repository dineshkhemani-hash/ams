package com.silvertouch.attendancemanagement.services;

import com.silvertouch.attendancemanagement.dto.AttendanceListDTO;
import com.silvertouch.attendancemanagement.dto.UserDTO;
import com.silvertouch.attendancemanagement.model.Attendance;
import com.silvertouch.attendancemanagement.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminAttendanceService {
private final AttendanceRepository attendanceRepository;
@Autowired
    public AdminAttendanceService(AttendanceRepository attendanceRepository){
    this.attendanceRepository = attendanceRepository;
}
    public List<AttendanceListDTO> getDailyAttendanceList() {
        Date currentDate = new Date(System.currentTimeMillis());
        List<Attendance> attendanceList = attendanceRepository.findAllDailyAttendance(currentDate);
        return attendanceList.stream()
                .map(attendance -> new AttendanceListDTO(
                        attendance.getId(),
                        new UserDTO(
                                attendance.getUser().getId(),
                                attendance.getUser().getName(),
                                attendance.getUser().getEmail(),
                                attendance.getUser().getRole().getName()
                        ),
                        attendance.getAttendanceDate().toLocalDate(),
                        attendance.getIn_time().toLocalTime(),
                        attendance.getOut_time() != null ? attendance.getOut_time().toLocalTime() : null,
                        attendance.getDuration(),
                        attendance.getStatus()
                ))
                .collect(Collectors.toList());
    }
}
