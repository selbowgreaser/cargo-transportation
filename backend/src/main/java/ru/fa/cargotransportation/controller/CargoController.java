package ru.fa.cargotransportation.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(summary = "Create a new cargo")
    @PostMapping
    @ResponseStatus(CREATED)
    public Cargo create(Cargo cargo) {
        return cargoService.save(cargo);
    }

    @Operation(summary = "Get a list of all cargos")
    @GetMapping
    @ResponseStatus(OK)
    public List<Cargo> findAll() {
        return cargoService.findAll();
    }

    @Operation(summary = "Get cargo by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the cargo"),
            @ApiResponse(responseCode = "404", description = "Cargo not found")
    })
    @GetMapping("/{id}")
    @ResponseStatus(OK)
    public Cargo findById(@PathVariable("id") Integer id) {
        return cargoService.findById(id);
    }

    @Operation(summary = "Update an existing cargo")
    @PutMapping
    @ResponseStatus(NO_CONTENT)
    public void update(Cargo updatedCargo) {
        cargoService.update(updatedCargo);
    }

    @Operation(summary = "Delete cargo by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Cargo deleted"),
            @ApiResponse(responseCode = "404", description = "Cargo not found")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    public void deleteById(@PathVariable("id") Integer id) {
        cargoService.deleteById(id);
    }
}
