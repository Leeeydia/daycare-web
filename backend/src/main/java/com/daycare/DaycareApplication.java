package com.daycare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationPropertiesScan
@SpringBootApplication
public class DaycareApplication {

    public static void main(String[] args) {
        SpringApplication.run(DaycareApplication.class, args);
    }
}
