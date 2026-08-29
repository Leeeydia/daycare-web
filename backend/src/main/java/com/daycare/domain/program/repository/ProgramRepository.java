package com.daycare.domain.program.repository;

import com.daycare.domain.program.entity.Program;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramRepository extends JpaRepository<Program, Long> {

    @EntityGraph(attributePaths = "effects")
    List<Program> findAllByOrderBySortOrderAscIdAsc();
}
