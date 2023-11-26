package ru.fa.cargotransportation.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.fa.cargotransportation.annotation.ValidDateRange;

import java.time.LocalDate;

@Setter
@Getter
@Entity
@ValidDateRange
@Table(name = "Cargo")
public class Cargo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "departure_city", nullable = false)
    private String departureCity;

    @Column(name = "departure_date", nullable = false)
    private LocalDate departureDate;

    @Column(name = "arrival_city", nullable = false)
    private String arrivalCity;

    @Column(name = "arrival_date", nullable = false)
    private LocalDate arrivalDate;
}
