package com.silvertouch.attendancemanagement.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class OutTimeDTO {
    @JsonProperty("out_time")
    @NotBlank(message = "Out Time is required")
    @NotNull(message = "Out Time is required")
    @Pattern(regexp = "^(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$",message = "Please provide time in HH:MM:SS format")
    private String outTime; // We'll map "outTime" from JSON

    public String getOutTime() {
        return outTime;
    }

    public void setOutTime(String outTime) {
        this.outTime = outTime;
    }
}
