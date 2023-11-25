package ru.fa.cargotransportation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.fa.cargotransportation.model.Cargo;
import ru.fa.cargotransportation.repository.CargoRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

import static org.springframework.data.domain.Sort.Direction.ASC;

@Service
@RequiredArgsConstructor
public class CargoService {

    private final CargoRepository cargoRepository;

    public List<Cargo> findAll() {
        return cargoRepository.findAll();
    }

    public List<Cargo> findAllSortedByArrivalDate(LocalDate arrivalDate) {
        return cargoRepository.findAll(Sort.by(ASC, "arrivalDate"));
    }

    public Cargo findById(Integer id) {
        return cargoRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public void save(Cargo cargo) {
        cargoRepository.save(cargo);
    }

    public void update(Cargo updatedCargo) {
        cargoRepository.save(updatedCargo);
    }

    public void deleteById(Integer id) {
        cargoRepository.deleteById(id);
    }

}
