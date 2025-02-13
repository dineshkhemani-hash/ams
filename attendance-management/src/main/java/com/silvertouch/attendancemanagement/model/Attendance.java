package com.silvertouch.attendancemanagement.model;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.time.Duration;
import java.util.UUID;
@Entity
@Table(name = "attendance" )
@Getter
@Setter
@NoArgsConstructor
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) /// tells Hibernate not to set the value manually, but to let the database handle it.
    @Column(columnDefinition = "UUID default gen_random_uuid()") // Ensures UUID default is respected
//    @Setter(AccessLevel.PRIVATE)
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id") // Foreign key mapping
    private Users user;
    @Column(nullable = false,name = "attendance_date")
    private Date attendanceDate;
    private Time in_time;
    private Time out_time;
//    @Column(columnDefinition = "INTERVAL", insertable = false, updatable = false)
    private String duration;
    private String status;


//    public Attendance() {}
//    public UUID getId() {
//        return id;
//    }
//    public Users getUser_id() {
//        return user;
//    }
//    public void setUser(Users user) {
//        this.user = user;
//    }
//    public Date getAttendance_date() {
//        return attendanceDate;
//    }
//    public Time getIn_time() {
//        return in_time;
//    }
//    public Time getOut_time() {
//        return out_time;
//    }
//    public Duration getDuration() {
//        return duration;
//    }
//    public String getStatus() {
//        return status;
//    }
//    public void setAttendance_date(Date attendance_date) {
//        this.attendanceDate = attendance_date;
//    }
//    public void setIn_time(Time in_time) {
//        this.in_time = in_time;
//    }
//    public void setOut_time(Time out_time) {
//        this.out_time = out_time;
//    }
//    public void setStatus(String status) {
//        this.status = status;
//    }
}
