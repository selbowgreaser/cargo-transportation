package ru.fa.cargotransportation.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import ru.fa.cargotransportation.controller.dto.AuthDto;
import ru.fa.cargotransportation.model.User;
import ru.fa.cargotransportation.security.JWTUtil;
import ru.fa.cargotransportation.service.RegistrationService;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v0")
public class AuthController {

    private final RegistrationService registrationService;
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    @ResponseStatus(CREATED)
    @Operation(summary = "Create a new user")
    @PostMapping("/signup")
    public AuthDto signup(@RequestBody User user) {
        registrationService.signup(user);
        String token = jwtUtil.generateToken(user.getUsername());

        return AuthDto.builder()
                .username(user.getUsername())
                .role(user.getRole())
                .token(token)
                .build();
    }

    @ResponseStatus(OK)
    @Operation(summary = "Login user")
    @PostMapping("/signin")
    public AuthDto performLogin(@RequestBody User user) {
        UsernamePasswordAuthenticationToken authInputToken =
                new UsernamePasswordAuthenticationToken(user.getUsername(),
                        user.getPassword());
        authenticationManager.authenticate(authInputToken);
        String token = jwtUtil.generateToken(user.getUsername());

        return AuthDto.builder()
                .username(user.getUsername())
                .role(user.getRole())
                .token(token)
                .build();
    }
}
