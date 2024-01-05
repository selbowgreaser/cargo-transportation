package ru.fa.cargotransportation.service.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CreatedPostDto {

    private Integer id;
    private String header;
    private String body;
    private LocalDateTime createdAt;
    private String createdBy;
}
