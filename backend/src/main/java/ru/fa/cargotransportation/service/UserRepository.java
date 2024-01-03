package ru.fa.cargotransportation.service;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.fa.cargotransportation.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);

}
