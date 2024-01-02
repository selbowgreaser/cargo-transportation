package ru.fa.cargotransportation.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
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

    @Operation(summary = "Create a new post")
    @PostMapping
    @ResponseStatus(CREATED)
    public Post create(@Valid @RequestBody Post post) {
        return postService.save(post);
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
    public void update(@RequestBody @Valid Post updatedPost) {
        postService.update(updatedPost);
    }

    @Operation(summary = "Delete post by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Post deleted"),
            @ApiResponse(responseCode = "404", description = "Post not found")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    public void deleteById(@PathVariable("id") Integer id) {
        postService.deleteById(id);
    }
}
