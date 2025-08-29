package com.jorisvanbreugel.les3.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;

public record CourseCreateDTO(
        @NotBlank(message = "mag niet leeg zijn")
        @Size(min=10, max=20)
        String name

//        @Min(10)
//        Integer age
) {};