package ru.fa.cargotransportation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.fa.cargotransportation.model.Cargo;
import ru.fa.cargotransportation.repository.CargoRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CargoService {

    private final CargoRepository cargoRepository;

    public List<Cargo> findAll() {
        return cargoRepository.findAll();
    }

    public Cargo findById(Integer id) {
        return cargoRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Cargo save(Cargo cargo) {
        return cargoRepository.save(cargo);
    }

    public void update(Cargo updatedCargo) {
        cargoRepository.save(updatedCargo);
    }

    public void deleteById(Integer id) {
        cargoRepository.deleteById(id);
    }

}
