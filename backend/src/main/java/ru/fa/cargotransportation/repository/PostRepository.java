package ru.fa.cargotransportation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.fa.cargotransportation.model.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {
}
