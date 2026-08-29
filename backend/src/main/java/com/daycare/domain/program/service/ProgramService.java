package com.daycare.domain.program.service;

import com.daycare.domain.program.dto.ProgramResponse;
import com.daycare.domain.program.repository.ProgramRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProgramService {

    private final ProgramRepository programRepository;

    @Transactional(readOnly = true)
    public List<ProgramResponse> findAll() {
        return programRepository.findAllByOrderBySortOrderAscIdAsc().stream()
                .map(ProgramResponse::from)
                .toList();
    }
}
