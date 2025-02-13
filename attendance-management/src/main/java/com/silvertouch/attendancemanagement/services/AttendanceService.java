package com.silvertouch.attendancemanagement.services;

import com.silvertouch.attendancemanagement.dto.AttendanceListDTO;
import com.silvertouch.attendancemanagement.enums.ATTENDANCESTATUS;
import com.silvertouch.attendancemanagement.dto.AttendanceCreateDTO;
import com.silvertouch.attendancemanagement.exception.ResourceNotFoundException;
import com.silvertouch.attendancemanagement.model.Attendance;
import com.silvertouch.attendancemanagement.model.Users;
import com.silvertouch.attendancemanagement.repository.AttendanceRepository;
import com.silvertouch.attendancemanagement.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;


import java.sql.Time;
import java.time.Duration;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.temporal.ChronoField;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@Validated
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

    @Autowired
    public AttendanceService(AttendanceRepository attendanceRepository, UserRepository userRepository) {
        this.attendanceRepository = attendanceRepository;
        this.userRepository = userRepository;
    }

    public Attendance createAttendance(@NotNull UUID user_id, @Valid AttendanceCreateDTO attendanceCreateDTO) {
        Attendance attendance  = new Attendance();
//        attendance.setUserId(UUID.fromString(user_id));
        Users user = userRepository.findById(user_id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Attendance foundAttendance = attendanceRepository.findByUserIdAndAttendanceDate(user_id,new Date(System.currentTimeMillis()));
        if (foundAttendance != null){
            throw new ResourceNotFoundException("You already marked attendance for today");
        }
        attendance.setUser(user);
        attendance.setAttendanceDate(new java.sql.Date(System.currentTimeMillis()));
        attendance.setIn_time(new Time(System.currentTimeMillis()));
//        attendance.setOut_time(new Time(System.currentTimeMillis() + 360000));
        long hours = 0;
        //TODO Will remove i think
        if(attendanceCreateDTO.getOut_time() != null){
            attendance.setOut_time(attendanceCreateDTO.getOut_time());
            Duration duration = Duration.between(attendance.getIn_time().toLocalTime(), attendanceCreateDTO.getOut_time().toLocalTime());
            hours = duration.toHours();
            long minutes = duration.toMinutes() % 60;
            long seconds = duration.getSeconds() % 60;
            String formattedDuration = String.format("%02d:%02d:%02d", hours, minutes, seconds);
//        String formattedDuration = String.format("%02d hours %02d minutes %02d seconds", hours, minutes, seconds);
            attendance.setDuration(formattedDuration);
        }
        if(hours < 4){
            attendance.setStatus(String.valueOf(ATTENDANCESTATUS.ABSENT));
        }else if(hours < 8){
            attendance.setStatus(String.valueOf(ATTENDANCESTATUS.HALF_DAY));
        }else {
            attendance.setStatus(String.valueOf(ATTENDANCESTATUS.FULL_DAY));
        }
        return attendanceRepository.save(attendance);

//        attendance.setStatus(String.valueOf(ATTENDANCESTATUS.FULL_DAY));
//        System.out.println(String.valueOf(ATTENDANCESTATUS.FULL_DAY));

    }
    public Attendance markOutAttendance(@NotNull UUID user_id,@NotNull UUID attendance_id, @NotNull Time out_time){
        Users user = userRepository.findById(user_id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        System.out.println(attendance_id + " attendance id ");
        Attendance foundAttendance = attendanceRepository.findById(attendance_id).orElseThrow(() -> new ResourceNotFoundException("Attendance not found"));
        System.out.println(foundAttendance.getId() + " found attendance id");
        if(foundAttendance.getOut_time() != null){
            throw new ResourceNotFoundException("You already marked out time for today");
        }else if(foundAttendance.getIn_time().after(out_time)){
            throw new ResourceNotFoundException("Out time cannot be before in time");
        }else if (out_time == null) {
            throw new ResourceNotFoundException("Please provide your out time");
        }else {
            int rowsUpdated = attendanceRepository.updateOutTime(user.getId(),foundAttendance.getId(), new Date(System.currentTimeMillis()), out_time);
            if (rowsUpdated == 0){
                throw new ResourceNotFoundException("You already marked out time for today");
            }else {
                Attendance updatedAttendance =  attendanceRepository.findById(attendance_id).orElseThrow(() -> new ResourceNotFoundException("Attendance not found after update"));
                System.out.println(updatedAttendance.getOut_time() + " out time");
                Duration duration = Duration.between(updatedAttendance.getIn_time().toLocalTime(), out_time.toLocalTime());
                long hours = duration.toHours();
                long minutes = duration.toMinutes() % 60;
                long seconds = duration.getSeconds() % 60;
                String formattedDuration = String.format("%02d:%02d:%02d", hours, minutes, seconds);
//        String formattedDuration = String.format("%02d hours %02d minutes %02d seconds", hours, minutes, seconds);
                updatedAttendance.setOut_time(out_time);
               updatedAttendance.setDuration(formattedDuration);
                if(hours < 4){
                   updatedAttendance.setStatus(String.valueOf(ATTENDANCESTATUS.ABSENT));
                }else if(hours < 8){
                   updatedAttendance.setStatus(String.valueOf(ATTENDANCESTATUS.HALF_DAY));
                }else {
                   updatedAttendance.setStatus(String.valueOf(ATTENDANCESTATUS.FULL_DAY));
                }
                return attendanceRepository.save(updatedAttendance);
            }
        }


 }
    public List<AttendanceCreateDTO> getAttendanceReport(@NotNull UUID user_id, int limit){
        Users user = userRepository.findById(user_id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return attendanceRepository.findByAttendanceIdAndUserId(user_id,limit);
    }
    public List<AttendanceCreateDTO> getAttendanceReportByType(@NotNull UUID user_id,String type,Integer year,Integer month){
        LocalDate endDate = LocalDate.now();
        LocalDate startDate;
        if("WEEKLY".equalsIgnoreCase(type)){
//            int startDayOfWeek = endDate.getDayOfWeek().get(ChronoField.DAY_OF_WEEK);
            startDate = endDate.with(ChronoField.DAY_OF_WEEK,1); /// Set to Monday
//            startDate = endDate.minusDays(startDayOfWeek);
        }else if("MONTHLY".equalsIgnoreCase(type)){
//            startDate = endDate.withDayOfMonth(1);
            if(year != null && month != null){
                YearMonth yearMonth = YearMonth.of(year,month);
                startDate = yearMonth.atDay(1);
                endDate = yearMonth.atEndOfMonth();
            }else{
                startDate = endDate.withDayOfMonth(1);
                endDate = endDate.withDayOfMonth(endDate.lengthOfMonth());
            }
        }else {
            throw new IllegalArgumentException("Invalid Report Type");
        }
        Date start =  Date.from(startDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date end =  Date.from(endDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        return attendanceRepository.findAttendanceByUserIdAndDateRange(user_id,start,end);
    }
}
