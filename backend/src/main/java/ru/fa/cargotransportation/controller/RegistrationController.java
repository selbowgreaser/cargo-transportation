package ru.fa.cargotransportation.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.fa.cargotransportation.model.User;
import ru.fa.cargotransportation.service.RegistrationService;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v0")
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping("/signup")
    public void signup(@RequestBody User user) {
        registrationService.signup(user);
    }


}
