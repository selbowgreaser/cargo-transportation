package ru.fa.cargotransportation.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.fa.cargotransportation.exception.PostNotFoundException;
import ru.fa.cargotransportation.model.Post;
import ru.fa.cargotransportation.repository.PostRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public List<Post> findAll() {
        return postRepository.findAll();
    }

    public Post findById(Integer id) {
        return postRepository.findById(id).orElseThrow(PostNotFoundException::new);
    }

    public Post save(Post post) {
        return postRepository.save(post);
    }

    public void update(Post updatedPost) {
        Post post = postRepository.findById(updatedPost.getId()).orElseThrow(PostNotFoundException::new);

        post.setHeader(updatedPost.getHeader());
        post.setBody(updatedPost.getBody());

        postRepository.save(post);
    }

    public void deleteById(Integer id) {
        postRepository.deleteById(id);
    }
}
