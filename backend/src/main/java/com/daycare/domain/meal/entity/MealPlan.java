package com.daycare.domain.meal.entity;

import com.daycare.global.common.BaseTimeEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/** 주간 식단표. 이미지 한 장으로 등록하거나 요일별 텍스트로 등록할 수 있다. */
@Entity
@Getter
@Table(name = "meal_plan")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MealPlan extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private LocalDate weekStartDate;

    @Column(nullable = false)
    private LocalDate weekEndDate;

    @Column(length = 500)
    private String imageUrl;

    @OrderBy("date asc")
    @OneToMany(mappedBy = "mealPlan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MealPlanDay> days = new ArrayList<>();

    private MealPlan(LocalDate weekStartDate, LocalDate weekEndDate, String imageUrl) {
        this.weekStartDate = weekStartDate;
        this.weekEndDate = weekEndDate;
        this.imageUrl = imageUrl;
    }

    public static MealPlan create(LocalDate weekStartDate, LocalDate weekEndDate, String imageUrl) {
        return new MealPlan(weekStartDate, weekEndDate, imageUrl);
    }

    public void addDay(MealPlanDay day) {
        this.days.add(day);
        day.assignTo(this);
    }
}
