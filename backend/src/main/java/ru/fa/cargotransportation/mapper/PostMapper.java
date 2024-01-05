package ru.fa.cargotransportation.mapper;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Component;
import ru.fa.cargotransportation.controller.dto.CreatedPostDto;
import ru.fa.cargotransportation.controller.dto.PostDto;
import ru.fa.cargotransportation.model.Post;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PostMapper {

    private final ModelMapper modelMapper;
    private TypeMap<Post, CreatedPostDto> postCreatedPostDtoTypeMap;

    @PostConstruct
    public void initTypeMap() {
        postCreatedPostDtoTypeMap = modelMapper.createTypeMap(Post.class, CreatedPostDto.class)
                .addMapping(post1 -> post1.getCreatedBy().getUsername(), CreatedPostDto::setCreatedBy);
    }

    public Post mapPostDtoToPost(PostDto postDto) {
        return modelMapper.map(postDto, Post.class);
    }

    public CreatedPostDto mapPostToCreatedPostDto(Post post) {
        return postCreatedPostDtoTypeMap.map(post);
    }

    public List<CreatedPostDto> mapPostsToCreatedPostDtos(List<Post> posts) {
        return posts.stream().map(this::mapPostToCreatedPostDto).collect(Collectors.toList());
    }
}
