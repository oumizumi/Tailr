package com.tailr.util;

public class ApiError {
    private String error;
    private String message;
    private String traceId;

    public ApiError() {}

    public ApiError(String error, String message, String traceId) {
        this.error = error;
        this.message = message;
        this.traceId = traceId;
    }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getTraceId() { return traceId; }
    public void setTraceId(String traceId) { this.traceId = traceId; }
}


