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
            return ResponseEntity.ok("Utilisateur créé avec succès");
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
            return ResponseEntity.ok("Utilisateur mis à jour avec succès.");
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
                return ResponseEntity.badRequest().body("Nom d'utilisateur est obligatoire.");
            }
            userService.deleteUser(username);
            return ResponseEntity.ok("Utilisateur supprimé avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la suppression de l'utilisateur : " + e.getMessage());
        }
    }

    @GetMapping("/exists")
    public ResponseEntity<String> getUser(@RequestParam("username") String username) {
        try {
            boolean exists = userService.getUser(username);
            if (exists) {
                return ResponseEntity.ok("L'utilisateur existe.");
            } else {
                return ResponseEntity.status(404).body("L'utilisateur n'existe pas.");
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
                return ResponseEntity.badRequest().body("Nom d'utilisateur et rôle sont obligatoires.");
            }
            userService.assignRoleToUser(username, role);
            return ResponseEntity.ok("Rôle attribué à l'utilisateur avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de l'attribution du rôle : " + e.getMessage());
        }
    }

    @PostMapping("/set-quota")
    public ResponseEntity<String> setUserQuota(@RequestParam("username") String username,
                                               @RequestParam("quota") int quota) {
        try {
            if (username == null || username.isEmpty()) {
                return ResponseEntity.badRequest().body("Nom d'utilisateur est obligatoire.");
            }
            userService.setUserQuota(username, quota);
            return ResponseEntity.ok("Quota mis à jour pour l'utilisateur avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la mise à jour du quota : " + e.getMessage());
        }
    }

    // Configuration de la sécurité
    @Configuration
    @EnableWebSecurity
    public class SecurityConfig {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .csrf(csrf -> csrf.disable()) // Disable CSRF for testing
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers("/api/users/**").permitAll() // Allow all requests to this endpoint
                            .anyRequest().permitAll() // Allow all other requests (for testing)
                    );

            return http.build();
        }
    }


    @PostMapping("/create-tablespace")
    public ResponseEntity<String> createTablespaceForUser(@RequestParam("tablespaceName") String tablespaceName,
                                                          @RequestParam("username") String username,
                                                          @RequestParam("sizeInMB") int sizeInMB) {
        try {
            if (tablespaceName == null || tablespaceName.isEmpty() || username == null || username.isEmpty() || sizeInMB <= 0) {
                return ResponseEntity.badRequest().body("Nom du tablespace, nom d'utilisateur et taille sont obligatoires.");
            }

            userService.createTablespaceForUser(tablespaceName, username, sizeInMB);
            return ResponseEntity.ok("Tablespace créé et assigné à l'utilisateur avec succès.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body("Erreur lors de la création du tablespace : " + e.getMessage());
        }
    }

}
