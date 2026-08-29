package com.daycare.domain.meal.dto;

import com.daycare.domain.meal.entity.MealPlan;
import java.time.format.DateTimeFormatter;
import java.util.List;

public record MealPlanResponse(
        String weekStartDate,
        String weekEndDate,
        String imageUrl,
        List<Day> days
) {
    private static final DateTimeFormatter FULL = DateTimeFormatter.ISO_LOCAL_DATE;
    private static final DateTimeFormatter SHORT = DateTimeFormatter.ofPattern("MM-dd");

    public record Day(String day, String date, List<String> lunch, String snack) {}

    public static MealPlanResponse from(MealPlan plan) {
        List<Day> days = plan.getDays().stream()
                .map(d -> new Day(d.getDayLabel(), d.getDate().format(SHORT), List.copyOf(d.getLunch()), d.getSnack()))
                .toList();
        return new MealPlanResponse(
                plan.getWeekStartDate().format(FULL),
                plan.getWeekEndDate().format(FULL),
                plan.getImageUrl(),
                days
        );
    }
}
