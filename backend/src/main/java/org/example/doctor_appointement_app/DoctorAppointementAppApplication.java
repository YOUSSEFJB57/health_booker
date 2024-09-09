package org.example.doctor_appointement_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "org.example.doctor_appointement_app.repository")
@EntityScan(basePackages = "org.example.doctor_appointement_app.model")
public class DoctorAppointementAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(DoctorAppointementAppApplication.class, args);
	}

}
