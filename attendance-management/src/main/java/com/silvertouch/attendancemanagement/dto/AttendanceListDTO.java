package  com.silvertouch.attendancemanagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.silvertouch.attendancemanagement.model.Attendance;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

public class AttendanceListDTO {
    private UUID id;
    private UserDTO user;
    private LocalDate attendanceDate;
    @JsonProperty("in_time")
    private LocalTime in_time;
@JsonProperty("out_time")
    private LocalTime out_time;
    private String duration;
    private String status;

    // Constructor
    public AttendanceListDTO(UUID id, UserDTO user, LocalDate attendanceDate, LocalTime in_time,
                         LocalTime out_time, String duration, String status) {
        this.id = id;
        this.user = user;
        this.attendanceDate = attendanceDate;
        this.in_time = in_time;
        this.out_time = out_time;
        this.duration = duration;
        this.status = status;
    }

    // Getters and setters (only include what you need)
    public UUID getId() { return id; }
    public UserDTO getUser() { return user; }
    public LocalDate getAttendanceDate() { return attendanceDate; }
    @JsonProperty("in_time")
    public LocalTime getInTime() { return in_time; }
    @JsonProperty("out_time")
    public LocalTime getOutTime() { return out_time; }
    public String getDuration() { return duration; }
    public String getStatus() { return status; }

    // Setter methods if needed
    public void setId(UUID id) { this.id = id; }
    public void setUser(UserDTO user) { this.user = user; }
    public void setAttendanceDate(LocalDate attendanceDate) { this.attendanceDate = attendanceDate; }
    public void setInTime(LocalTime in_time) { this.in_time = in_time; }
    public void setOutTime(LocalTime out_time) { this.out_time = out_time; }
    public void setDuration(String duration) { this.duration = duration; }
    public void setStatus(String status) { this.status = status; }

    // Constructor with optional fields
    public AttendanceListDTO(UUID id, UserDTO user, LocalDate attendanceDate) {
        this(id, user, attendanceDate, null, null, null, null);
    }
    // Static method to convert Attendance entity to AttendanceDto
    public static AttendanceListDTO fromEntity(Attendance attendance) {
        UserDTO userDto = new UserDTO(
                attendance.getUser().getId(),
                attendance.getUser().getName(),
                attendance.getUser().getEmail(),
                attendance.getUser().getRole().getName()
        );

        return new AttendanceListDTO(
                attendance.getId(),
                userDto,
                attendance.getAttendanceDate().toLocalDate(),
                attendance.getIn_time().toLocalTime(),
                attendance.getOut_time().toLocalTime(),
                attendance.getDuration(),
                attendance.getStatus()
        );
    }
}