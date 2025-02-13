package com.silvertouch.attendancemanagement.dto;

import com.silvertouch.attendancemanagement.enums.ATTENDANCESTATUS;
import com.silvertouch.attendancemanagement.model.Attendance;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;
import java.util.UUID;
@Getter
@Setter
@NoArgsConstructor
public class AttendanceCreateDTO {

    private UUID userId;
    private UUID id;
    private String name;
    private Date attendanceDate;
    private Time in_time;
//    @NotBlank(message = "Out Time is required")
//    @NotNull(message = "Out Time is required")
//    @Pattern(regexp = "^(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$",message = "Please provide time in HH:MM:SS format")
    private Time out_time;
    private String duration;
    private ATTENDANCESTATUS status;
    // Constructor to create AttendanceCreateDTO from Attendance object
    public AttendanceCreateDTO(Attendance attendance) {
        this.userId = attendance.getUser().getId();
        this.name = attendance.getUser().getName();
        this.id = attendance.getId();
        this.attendanceDate = attendance.getAttendanceDate();
        this.in_time = attendance.getIn_time();
        this.out_time = attendance.getOut_time();
        this.duration = attendance.getDuration();
        this.status = ATTENDANCESTATUS.valueOf(attendance.getStatus());
    }
}
