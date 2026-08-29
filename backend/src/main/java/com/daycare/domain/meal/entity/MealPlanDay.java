package com.daycare.domain.meal.entity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/** 주간 식단표의 하루치 식단 */
@Entity
@Getter
@Table(name = "meal_plan_day")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MealPlanDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meal_plan_id", nullable = false)
    private MealPlan mealPlan;

    /** 월/화/수/목/금 */
    @Column(nullable = false, length = 5)
    private String dayLabel;

    @Column(nullable = false)
    private LocalDate date;

    @ElementCollection
    @CollectionTable(name = "meal_plan_lunch", joinColumns = @JoinColumn(name = "meal_plan_day_id"))
    @OrderColumn(name = "sort_order")
    @Column(name = "menu", nullable = false, length = 100)
    private List<String> lunch = new ArrayList<>();

    @Column(length = 200)
    private String snack;

    private MealPlanDay(String dayLabel, LocalDate date, List<String> lunch, String snack) {
        this.dayLabel = dayLabel;
        this.date = date;
        this.lunch = new ArrayList<>(lunch);
        this.snack = snack;
    }

    public static MealPlanDay create(String dayLabel, LocalDate date, List<String> lunch, String snack) {
        return new MealPlanDay(dayLabel, date, lunch, snack);
    }

    void assignTo(MealPlan mealPlan) {
        this.mealPlan = mealPlan;
    }
}
