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
                return ResponseEntity.badRequest().body("Nom d'utilisateur et mot de passe sont obligatoires.");
            }
            userService.createUser(username, password, roles);
            return ResponseEntity.ok("user created");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la création de l'utilisateur : " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestParam("username") String username,
                                             @RequestParam("newPassword") String newPassword,
                                             @RequestParam(value = "newRoles", required = false) String newRoles) {
        try {
            userService.updateUser(username, newPassword, newRoles);
            return ResponseEntity.ok("user updated");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body("Erreur : " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestParam("username") String username) {
        try {
            if (username == null || username.isEmpty()) {
                return ResponseEntity.badRequest().body("username is required");
            }
            userService.deleteUser(username);
            return ResponseEntity.ok("user deleted");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la suppression de l'utilisateur : " + e.getMessage());
        }
    }

    @GetMapping("/exists")
    public ResponseEntity<String> getUser(@RequestParam("username") String username) {
        try {
            boolean exists = userService.getUser(username);
            if (exists) {
                return ResponseEntity.ok("user exists");
            } else {
                return ResponseEntity.status(404).body("user does not exist");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la vérification de l'utilisateur : " + e.getMessage());
        }
    }

    @PostMapping("/assign-role")
    public ResponseEntity<String> assignRoleToUser(@RequestParam("username") String username,
                                                   @RequestParam("role") String role) {
        try {
            if (username == null || username.isEmpty() || role == null || role.isEmpty()) {
                return ResponseEntity.badRequest().body("username and role are required");
            }
            userService.assignRoleToUser(username, role);
            return ResponseEntity.ok("role successfully assigned to user");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de l'attribution du rôle : " + e.getMessage());
        }
    }

    @PostMapping("/set-quota")
    public ResponseEntity<String> setUserQuota(@RequestParam("username") String username,
                                               @RequestParam("quota") int quota) {
        try {
            if (username == null || username.isEmpty()) {
                return ResponseEntity.badRequest().body("username is required");
            }
            userService.setUserQuota(username, quota);
            return ResponseEntity.ok("Quota successfully set for user");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la mise à jour du quota : " + e.getMessage());
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
                return ResponseEntity.badRequest().body("tablespace and user name and size are required");
            }

            userService.createTablespaceForUser(tablespaceName, username, sizeInMB);
            return ResponseEntity.ok("Tablespace successfully created for user");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body("Erreur lors de la création du tablespace : " + e.getMessage());
        }
    }

}