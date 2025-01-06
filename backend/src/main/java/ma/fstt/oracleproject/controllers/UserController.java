package ma.fstt.oracleproject.controllers;

import ma.fstt.oracleproject.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@CrossOrigin(origins = "*") // Apply CORS globally to the controller
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private DataSource dataSource;

    // Méthode pour créer un utilisateur
    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestParam("username") String username,
                                             @RequestParam("password") String password,
                                             @RequestParam("roles") String roles) {
        try {
            if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
                return ResponseEntity.badRequest().build(); // Code 400 pour une requête invalide
            }
            userService.createUser(username, password, roles);
            return ResponseEntity.ok().build(); // Code 200 pour succès
        } catch (Exception e) {
            return ResponseEntity.status(500).build(); // Code 500 pour une erreur serveur
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestParam("username") String username,
                                             @RequestParam("newPassword") String newPassword,
                                             @RequestParam(value = "newRoles", required = false) String newRoles) {
        try {
            userService.updateUser(username, newPassword, newRoles);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestParam("username") String username) {
        try {
            if (username == null || username.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            userService.deleteUser(username);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/exists")
    public ResponseEntity<String> getUser(@RequestParam("username") String username) {
        try {
            boolean exists = userService.getUser(username);
            if (exists) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(404).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/assign-role")
    public ResponseEntity<String> assignRoleToUser(@RequestParam("username") String username,
                                                   @RequestParam("role") String role) {
        try {
            if (username == null || username.isEmpty() || role == null || role.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            userService.assignRoleToUser(username, role);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/set-quota")
    public ResponseEntity<String> setUserQuota(@RequestParam("username") String username,
                                               @RequestParam("quota") int quota) {
        try {
            if (username == null || username.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            userService.setUserQuota(username, quota);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Configuration de la sécurité
//    @Configuration
//    @EnableWebSecurity
//    public class SecurityConfig {
//
//        @Bean
//        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//            http
//                    .csrf(csrf -> csrf.disable()) // Disable CSRF for testing
//                    .authorizeHttpRequests(auth -> auth
//                            .requestMatchers("/api/users/**").permitAll() // Allow all requests to this endpoint
//                            .anyRequest().permitAll() // Allow all other requests (for testing)
//                    );
//
//            return http.build();
//        }
//    }


    @PostMapping("/create-tablespace")
    public ResponseEntity<String> createTablespaceForUser(@RequestParam("tablespaceName") String tablespaceName,
                                                          @RequestParam("username") String username,
                                                          @RequestParam("sizeInMB") int sizeInMB) {
        try {
            if (tablespaceName == null || tablespaceName.isEmpty() || username == null || username.isEmpty() || sizeInMB <= 0) {
                return ResponseEntity.badRequest().build();
            }

            userService.createTablespaceForUser(tablespaceName, username, sizeInMB);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).build();

        }
    }

}