package ma.fstt.oracleproject.controllers;

import ma.fstt.oracleproject.services.BackupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/backup")
public class BackupController {

    private final BackupService backupService;

    @Autowired
    public BackupController(BackupService backupService){
        this.backupService = backupService;
    }

    @PostMapping("/full")
    public ResponseEntity<String> triggerFullBackup(){
        try {
            backupService.triggerFullBackup();
            return ResponseEntity.ok("Full backup triggered successfully");
        }catch(SQLException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in triggerFullBackup");
        }
    }

    @PostMapping("/incremental")
    public ResponseEntity<String> triggerIncrementalBackup(){
        try{
            backupService.triggerIncrementalBackup();
            return ResponseEntity.ok("Incremental backup triggered successfully");
        }catch (SQLException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error triggering incremental backup");
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<String>> getBackupHistory(){
        try{
            List<String> history = backupService.getBackupHistory();
            return ResponseEntity.ok(history);
        } catch (SQLException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonList("Error retrieving backup history"));
        }
    }
    @Configuration
    @EnableWebSecurity
    public class BackupSecurityConfig {

        @Bean(name = "backupSecurityFilterChain")
        public SecurityFilterChain backupSecurityFilterChain(HttpSecurity http) throws Exception {
            http
                    .csrf(csrf -> csrf.disable()) // Disable CSRF protection for testing
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers("/api/backup/full").permitAll() // Allow access to BackupController endpoints
                            .anyRequest().authenticated()); // Require authentication for all other endpoints
            return http.build();
        }
    }


}
