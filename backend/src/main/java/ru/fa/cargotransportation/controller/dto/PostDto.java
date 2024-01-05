package ru.fa.cargotransportation.controller.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostDto {

    private Integer id;
    private String header;
    private String body;
}
