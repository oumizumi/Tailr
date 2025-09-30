package com.tailr.security;

import java.util.UUID;

public class TailrPrincipal {
    private final UUID userId;
    private final String email;

    public TailrPrincipal(UUID userId, String email) {
        this.userId = userId;
        this.email = email;
    }

    public UUID getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }
}


