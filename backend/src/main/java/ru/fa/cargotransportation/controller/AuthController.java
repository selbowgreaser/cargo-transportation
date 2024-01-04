package ru.fa.cargotransportation.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import ru.fa.cargotransportation.model.User;
import ru.fa.cargotransportation.security.JWTUtil;
import ru.fa.cargotransportation.service.RegistrationService;

import java.util.Map;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v0")
public class AuthController {

    private final RegistrationService registrationService;
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody User user) {
        registrationService.signup(user);

        String token = jwtUtil.generateToken(user.getUsername());

        return Map.of("jwt-token", token);
    }

    @PostMapping("/signin")
    public Map<String, String> performLogin(@RequestBody User user) {
        UsernamePasswordAuthenticationToken authInputToken =
                new UsernamePasswordAuthenticationToken(user.getUsername(),
                        user.getPassword());

        try {
            authenticationManager.authenticate(authInputToken);
        } catch (BadCredentialsException e) {
            return Map.of("message", "Incorrect credentials!");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return Map.of("jwt-token", token);
    }

}
