package com.daycare.domain.program.dto;

import com.daycare.domain.program.entity.Program;
import java.util.List;

public record ProgramResponse(
        Long id,
        String name,
        String description,
        String imageUrl,
        String category,
        List<String> effects,
        int sortOrder
) {
    public static ProgramResponse from(Program program) {
        return new ProgramResponse(
                program.getId(),
                program.getName(),
                program.getDescription(),
                program.getImageUrl(),
                program.getCategory().getLabel(),
                List.copyOf(program.getEffects()),
                program.getSortOrder()
        );
    }
}
