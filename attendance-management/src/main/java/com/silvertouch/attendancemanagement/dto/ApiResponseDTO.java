
package com.silvertouch.attendancemanagement.dto;

import java.util.List;

public class ApiResponseDTO<T> {
    private String status;
    private String message;
    private T data;
    private String error;

    // Constructor
    public ApiResponseDTO(String status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public ApiResponseDTO(String status, String message) {
        this.status = status;
        this.message = message;
//        this.error = error;
    }




    // Getters and Setters
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public T getData() { return data; }
    public void setData(T data) { this.data = data; }
//    public String getError() { return error; }
//    public void setError(String error) { this.error = error; }
}