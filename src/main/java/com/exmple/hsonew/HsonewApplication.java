package com.exmple.hsonew;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.exmple.hsonew.entities")
@EnableJpaRepositories("com.exmple.hsonew.repositories")
public class HsonewApplication {

    public static void main(String[] args) {
        SpringApplication.run(HsonewApplication.class, args);
    }

}
