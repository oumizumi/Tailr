package com.tailr.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;
import java.util.UUID;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   CorsConfigurationSource corsConfigurationSource,
                                                   @Value("${SUPABASE_JWKS_URL:http://localhost:9999/mock-jwks}") String jwksUrl) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.GET, "/healthz", "/readyz").permitAll()
                        .requestMatchers("/actuator/health").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(Customizer.withDefaults())
                );

        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter delegate = new JwtGrantedAuthoritiesConverter();
        delegate.setAuthorityPrefix("");

        return new JwtAuthenticationConverter() {
            @Override
            protected AbstractAuthenticationToken convert(Jwt jwt) {
                AbstractAuthenticationToken base = super.convert(jwt);
                if (base == null) return null;

                String sub = jwt.getSubject();
                String email = jwt.getClaimAsString("email");
                TailrPrincipal principal = null;
                try {
                    principal = new TailrPrincipal(UUID.fromString(sub), email);
                } catch (Exception ignored) {
                    // invalid UUID in sub -> auth will fail elsewhere when required
                }

                return new AbstractAuthenticationToken(List.of(new SimpleGrantedAuthority("USER"))) {
                    @Override
                    public Object getCredentials() {
                        return jwt.getTokenValue();
                    }

                    @Override
                    public Object getPrincipal() {
                        return principal;
                    }
                };
            }
        };
    }
}


