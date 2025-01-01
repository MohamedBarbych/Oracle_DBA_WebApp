package ma.fstt.oracleproject.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

// Cette classe est pour gerer les autorisations de toutes les endpoints
@Configuration
@EnableWebSecurity
public class UnifiedSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.
            csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // autorisations pour les endpoints de BackupController
                    .requestMatchers("api/backup/**").permitAll()
                // autorisations pour les endpoints de UserController
                    .requestMatchers("api/users/**").permitAll()
                // autorisations pour les endpoints de OptimizationController
                    .requestMatchers("/api/optimization/**").permitAll()
                // exige une authentification pour tous les autre endpoints
                    .anyRequest().authenticated());
        return http.build();

    }


}
