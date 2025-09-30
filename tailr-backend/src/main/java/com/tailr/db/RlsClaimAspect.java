package com.tailr.db;

import com.tailr.security.TailrAuthenticationResolver;
import com.tailr.security.TailrPrincipal;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Aspect
@Component
public class RlsClaimAspect {

    private final TailrAuthenticationResolver authResolver;

    @PersistenceContext
    private EntityManager entityManager;

    public RlsClaimAspect(TailrAuthenticationResolver authResolver) {
        this.authResolver = authResolver;
    }

    @Before("@annotation(org.springframework.transaction.annotation.Transactional)")
    @Transactional
    public void applyRlsClaim(JoinPoint jp) {
        Optional<TailrPrincipal> principal = authResolver.getCurrentPrincipal();
        principal.ifPresent(p -> {
            entityManager.createNativeQuery("select set_config('request.jwt.claim.sub', :uid, true)")
                    .setParameter("uid", p.getUserId().toString())
                    .getSingleResult();
            entityManager.createNativeQuery("select set_config('app.user_id', :uid, true)")
                    .setParameter("uid", p.getUserId().toString())
                    .getSingleResult();
        });
    }
}


