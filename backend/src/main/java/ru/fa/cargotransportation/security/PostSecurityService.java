package ru.fa.cargotransportation.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import ru.fa.cargotransportation.exception.PostNotFoundException;
import ru.fa.cargotransportation.model.Post;
import ru.fa.cargotransportation.model.User;
import ru.fa.cargotransportation.repository.PostRepository;
import ru.fa.cargotransportation.service.dto.PostDto;

@Component
@RequiredArgsConstructor
public class PostSecurityService {

    private final PostRepository postRepository;

    public boolean isPostOwner(Authentication authentication, Integer postId) {
        User user = ((UserDetails) authentication.getPrincipal()).user();

        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);

        return post != null && post.getCreatedBy().equals(user.getUsername());
    }

    public boolean isPostOwner(Authentication authentication, PostDto postDto) {
        return isPostOwner(authentication, postDto.getId());
    }

}
