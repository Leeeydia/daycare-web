package com.daycare.domain.meal.service;

import com.daycare.domain.meal.dto.MealPlanResponse;
import com.daycare.domain.meal.repository.MealPlanRepository;
import com.daycare.global.exception.BusinessException;
import com.daycare.global.exception.MealErrorCode;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MealService {

    private final MealPlanRepository mealPlanRepository;

    /** 이번 주(또는 가장 최근) 식단표 */
    @Transactional(readOnly = true)
    public MealPlanResponse findCurrent() {
        return mealPlanRepository
                .findFirstByWeekStartDateLessThanEqualOrderByWeekStartDateDesc(LocalDate.now())
                .map(MealPlanResponse::from)
                .orElseThrow(() -> new BusinessException(MealErrorCode.MEAL_NOT_FOUND));
    }
}
