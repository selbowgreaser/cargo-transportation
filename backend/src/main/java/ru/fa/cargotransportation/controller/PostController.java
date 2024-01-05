package ru.fa.cargotransportation.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.fa.cargotransportation.model.Post;
import ru.fa.cargotransportation.service.PostService;
import ru.fa.cargotransportation.service.dto.PostDto;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v0/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final ModelMapper modelMapper;

    @Operation(summary = "Create a new post")
    @PostMapping
    @ResponseStatus(CREATED)
    public Post create(@Valid @RequestBody PostDto postDto) {
        return postService.save(postDtoToPost(postDto));
    }

    @Operation(summary = "Get a list of all posts")
    @GetMapping
    @ResponseStatus(OK)
    public List<Post> findAll() {
        return postService.findAll();
    }

    @Operation(summary = "Get post by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the post"),
            @ApiResponse(responseCode = "404", description = "Post not found")
    })
    @GetMapping("/{id}")
    @ResponseStatus(OK)
    public Post findById(@PathVariable("id") Integer id) {
        return postService.findById(id);
    }

    @Operation(summary = "Update an existing post")
    @PutMapping
    @ResponseStatus(NO_CONTENT)
    @PreAuthorize("@postSecurityService.isPostOwner(authentication, #postDto)")
    public void update(@RequestBody @Valid PostDto postDto) {
        Post post = postDtoToPost(postDto);
        postService.update(post);
    }

    @Operation(summary = "Delete post by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Post deleted"),
            @ApiResponse(responseCode = "404", description = "Post not found")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    @PreAuthorize("hasAnyRole('ADMIN') or @postSecurityService.isPostOwner(authentication, #id)")
    public void deleteById(@PathVariable("id") Integer id) {
        postService.deleteById(id);
    }

    private Post postDtoToPost(PostDto postDto) {
        return modelMapper.map(postDto, Post.class);
    }
}
