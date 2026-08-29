package com.daycare.domain.program.entity;

import com.daycare.global.common.BaseTimeEntity;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/** 센터 운영 프로그램 */
@Entity
@Getter
@Table(name = "program")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Program extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(length = 500)
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ProgramCategory category;

    @Column(nullable = false)
    private int sortOrder;

    /** 기대 효과 태그 */
    @ElementCollection
    @CollectionTable(name = "program_effect", joinColumns = @JoinColumn(name = "program_id"))
    @Column(name = "effect", nullable = false, length = 50)
    private List<String> effects = new ArrayList<>();

    private Program(String name, String description, String imageUrl, ProgramCategory category, int sortOrder,
                    List<String> effects) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sortOrder = sortOrder;
        this.effects = new ArrayList<>(effects);
    }

    public static Program create(String name, String description, String imageUrl, ProgramCategory category,
                                 int sortOrder, List<String> effects) {
        return new Program(name, description, imageUrl, category, sortOrder, effects);
    }

    public void update(String name, String description, String imageUrl, ProgramCategory category, int sortOrder,
                       List<String> effects) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sortOrder = sortOrder;
        this.effects.clear();
        this.effects.addAll(effects);
    }
}
