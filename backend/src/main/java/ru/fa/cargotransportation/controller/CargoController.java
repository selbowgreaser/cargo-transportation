package ru.fa.cargotransportation.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.fa.cargotransportation.service.CargoService;

@Controller
@RequestMapping("/cargo")
@RequiredArgsConstructor
public class CargoController {

    private final CargoService cargoService;

    @GetMapping
    public String findAll(Model model) {
        model.addAttribute("allCargo", cargoService.findAll());


    }
}
