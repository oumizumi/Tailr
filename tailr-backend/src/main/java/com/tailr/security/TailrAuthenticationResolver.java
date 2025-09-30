package com.tailr.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class TailrAuthenticationResolver {

    public Optional<TailrPrincipal> getCurrentPrincipal() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) return Optional.empty();
        Object principal = auth.getPrincipal();
        if (principal instanceof TailrPrincipal tp) {
            return Optional.of(tp);
        }
        if (principal instanceof Jwt jwt) {
            try {
                UUID uid = UUID.fromString(jwt.getSubject());
                String email = jwt.getClaimAsString("email");
                return Optional.of(new TailrPrincipal(uid, email));
            } catch (Exception ignored) {}
        }
        return Optional.empty();
    }
}


