package com.silvertouch.attendancemanagement;

import com.silvertouch.attendancemanagement.dto.UserSignupDTO;
import jakarta.validation.*;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Set;

@SpringBootTest
class AttendanceManagementApplicationTests {

    @Test
    void contextLoads() {
    }


}
//@ExtendWith(MockitoExtension.class)
//class JwtUtillsTest {
//    private JwtUtills jwtUtills;
//
//    @BeforeEach
//    void setUp() {
//        jwtUtills = new JwtUtills("test-secret");
//    }
//
//    @Test
//    void shouldGenerateAndValidateToken() {
//        UUID userId = UUID.randomUUID();
//        String token = jwtUtills.generateToken(userId);
//        UUID validated = jwtUtills.validateToken(token);
//        assertEquals(userId, validated);
//    }
//}