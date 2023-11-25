package ru.fa.cargotransportation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.fa.cargotransportation.model.Cargo;

import java.time.LocalDate;
import java.util.List;

public interface CargoRepository extends JpaRepository<Cargo, Integer> {

    Cargo findByName(String name);

    List<Cargo> findAllByArrivalDate(LocalDate arrivalDate);
}
