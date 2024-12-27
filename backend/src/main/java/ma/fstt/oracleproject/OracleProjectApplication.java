package ma.fstt.oracleproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "ma.fstt.oracleproject.entities")
@EnableJpaRepositories(basePackages = "ma.fstt.oracleproject.repositories")
public class OracleProjectApplication {
    public static void main(String[] args) {
        SpringApplication.run(OracleProjectApplication.class, args);
    }
}