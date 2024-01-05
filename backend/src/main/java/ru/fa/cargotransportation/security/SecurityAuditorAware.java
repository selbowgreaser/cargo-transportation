package ru.fa.cargotransportation.security;

import org.springframework.data.domain.AuditorAware;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import ru.fa.cargotransportation.model.User;

import java.util.Optional;

@Component
public class SecurityAuditorAware implements AuditorAware<User> {

    @Override
    @NonNull
    public Optional<User> getCurrentAuditor() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        return Optional.of(((UserDetails) authentication.getPrincipal()).user());
    }
}