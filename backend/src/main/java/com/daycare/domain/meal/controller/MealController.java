package com.daycare.domain.meal.controller;

import com.daycare.domain.meal.dto.MealPlanResponse;
import com.daycare.domain.meal.service.MealService;
import com.daycare.global.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/meals")
@RequiredArgsConstructor
public class MealController {

    private final MealService mealService;

    @GetMapping("/current")
    public ApiResponse<MealPlanResponse> current() {
        return ApiResponse.success(mealService.findCurrent());
    }
}
