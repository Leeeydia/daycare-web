package com.daycare.domain.meal.repository;

import com.daycare.domain.meal.entity.MealPlan;
import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {

    /** 오늘이 포함된 주의 식단, 없으면 가장 최근 식단을 사용한다. */
    Optional<MealPlan> findFirstByWeekStartDateLessThanEqualOrderByWeekStartDateDesc(LocalDate date);
}
