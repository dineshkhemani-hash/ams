
package com.silvertouch.attendancemanagement.exception;

import org.springframework.http.HttpStatus;

public class DuplicateKeyException extends RuntimeException {
    private final HttpStatus httpStatus;

    public DuplicateKeyException(String message) {
        this(message, HttpStatus.BAD_REQUEST);
    }

    public DuplicateKeyException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}