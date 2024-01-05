package ru.fa.cargotransportation.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.fa.cargotransportation.controller.dto.CreatedPostDto;
import ru.fa.cargotransportation.controller.dto.PostDto;
import ru.fa.cargotransportation.mapper.PostMapper;
import ru.fa.cargotransportation.model.Post;
import ru.fa.cargotransportation.service.PostService;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v0/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostMapper postMapper;

    @Operation(summary = "Create a new post")
    @PostMapping
    @ResponseStatus(CREATED)
    public CreatedPostDto create(@Valid @RequestBody PostDto postDto) {
        return postMapper.mapPostToCreatedPostDto(postService.save(postMapper.mapPostDtoToPost(postDto)));
    }

    @Operation(summary = "Get a list of all posts")
    @GetMapping
    @ResponseStatus(OK)
    public List<CreatedPostDto> findAll() {
        return postMapper.mapPostsToCreatedPostDtos(postService.findAll());
    }

    @Operation(summary = "Get post by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Found the post"),
            @ApiResponse(responseCode = "404", description = "Post not found")
    })
    @GetMapping("/{id}")
    @ResponseStatus(OK)
    public CreatedPostDto findById(@PathVariable("id") Integer id) {
        return postMapper.mapPostToCreatedPostDto(postService.findById(id));
    }

    @Operation(summary = "Update an existing post")
    @PutMapping
    @ResponseStatus(NO_CONTENT)
    @PreAuthorize("@postSecurityService.isPostOwner(authentication, #postDto)")
    public void update(@RequestBody @Valid PostDto postDto) {
        Post post = postMapper.mapPostDtoToPost(postDto);
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

}
