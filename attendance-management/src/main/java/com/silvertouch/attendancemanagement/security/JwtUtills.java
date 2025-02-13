package com.silvertouch.attendancemanagement.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtills {

    private final String secret;
    private final Algorithm algorithm;
    public JwtUtills(@Value("${jwt.secret}") String secret) {
        this.secret = secret;
        this.algorithm = Algorithm.HMAC256(secret);
    }

    //generate token
    public String generateToken(UUID userId){
//        return JWT.create().withSubject(String.valueOf(userId)).sign(Algorithm.HMAC256(secret));
        return JWT.create().withClaim("user_id",userId.toString())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 7L * 24 * 60 * 60 * 1000)) // 7 days from generating
                .sign(algorithm);
    }
    //validate token
    public UUID validateToken(String token){
        DecodedJWT decodedJWT = JWT.require(algorithm).build().verify(token);
        return  UUID.fromString(decodedJWT.getClaim("user_id").asString());
    }
    public Instant getIssuedAt(String token){
        DecodedJWT decodedJWT = JWT.require(algorithm).build().verify(token);
        return decodedJWT.getIssuedAt().toInstant();
    }
}
