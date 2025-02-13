package com.silvertouch.attendancemanagement.repository;

import com.silvertouch.attendancemanagement.dto.AttendanceCreateDTO;
import com.silvertouch.attendancemanagement.dto.AttendanceListDTO;

import com.silvertouch.attendancemanagement.model.Attendance;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.UUID;
//define constant for current date;

public interface AttendanceRepository extends JpaRepository<Attendance, UUID> {
    @Modifying
    @Transactional
    @Query("UPDATE Attendance a SET a.out_time = :outTime WHERE a.user.id = :userId AND a.out_time IS NULL AND a.attendanceDate = :currentDate AND a.id = :attendanceId")
    int updateOutTime(UUID userId, UUID attendanceId, Date currentDate, Time outTime);
    @Query("SELECT a FROM Attendance a WHERE a.user.id = :userId order by a.attendanceDate LIMIT :limit")
    List<AttendanceCreateDTO> findByAttendanceIdAndUserId(UUID userId, int limit);
    @Query("SELECT a from Attendance  a WHERE a.user.id = :userId AND a.attendanceDate = :currentDate")
    Attendance findByUserIdAndAttendanceDate(UUID userId, Date currentDate);
    @Query("select a from Attendance a where a.attendanceDate = :currentDate")
//    List<AttendanceListDTO> findAllDailyAttendance(Date currentDate);
    List<Attendance> findAllDailyAttendance(@Param("currentDate") Date currentDate);
//    @Query("delete from Attendance where ")
    @Query("SELECT a FROM  Attendance a where a.user.id = :userId  AND a.attendanceDate BETWEEN :startDate AND :endDate ORDER BY a.attendanceDate")
    List<AttendanceCreateDTO> findAttendanceByUserIdAndDateRange(UUID userId, Date startDate, Date endDate);
}

