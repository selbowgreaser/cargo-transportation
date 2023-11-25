package ru.fa.cargotransportation.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.fa.cargotransportation.model.Cargo;
import ru.fa.cargotransportation.service.CargoService;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("/api/v0/cargo")
@RequiredArgsConstructor
public class CargoController {

    private final CargoService cargoService;

    @PostMapping
    @ResponseStatus(CREATED)
    public Cargo create(Cargo cargo) {
        return cargoService.save(cargo);
    }

    @GetMapping
    @ResponseStatus(OK)
    public List<Cargo> findAll() {
        return cargoService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(OK)
    public Cargo findById(@PathVariable("id") Integer id) {
        return cargoService.findById(id);
    }

    @PutMapping
    @ResponseStatus(NO_CONTENT)
    public void update(Cargo updatedCargo) {
        cargoService.update(updatedCargo);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    public void deleteById(@PathVariable("id") Integer id) {
        cargoService.deleteById(id);
    }
}
