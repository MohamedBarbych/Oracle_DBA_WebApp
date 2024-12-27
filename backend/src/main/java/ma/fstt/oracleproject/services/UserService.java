package ma.fstt.oracleproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Méthode pour créer un utilisateur
    @Transactional
    public void createUser(String username, String password, String roles) {
        String sql = "INSERT INTO users (username, password, roles) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, username, password, roles);
        System.out.println("Utilisateur créé : " + username);
    }

    // Méthode pour mettre à jour un utilisateur
    @Transactional
    public void updateUser(String username, String newPassword, String newRoles) {
        String sql = "UPDATE users SET password = ?, roles = ? WHERE username = ?";
        jdbcTemplate.update(sql, newPassword, newRoles, username);
        System.out.println("Utilisateur mis à jour : " + username);
    }

    // Méthode pour supprimer un utilisateur
    @Transactional
    public void deleteUser(String username) {
        String sql = "DELETE FROM users WHERE username = ?";
        jdbcTemplate.update(sql, username);
        System.out.println("Utilisateur supprimé : " + username);
    }

    // Méthode pour récupérer un utilisateur par son nom d'utilisateur
    public boolean getUser(String username) {
        String sql = "SELECT COUNT(*) FROM users WHERE username = ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, username);
        return count > 0;
    }

    // Méthode pour gérer les privilèges d'accès (Exemple : assigner un rôle à un utilisateur)
    @Transactional
    public void assignRoleToUser(String username, String role) {
        String sql = "UPDATE users SET roles = ? WHERE username = ?";
        jdbcTemplate.update(sql, role, username);
        System.out.println("Rôle attribué à l'utilisateur : " + username);
    }

    // Méthode pour gérer les quotas d'espace (Exemple : ajuster l'espace d'un utilisateur)
    @Transactional
    public void setUserQuota(String username, int quota) {
        String sql = "UPDATE users SET quota = ? WHERE username = ?";
        jdbcTemplate.update(sql, quota, username);
        System.out.println("Quota mis à jour pour l'utilisateur : " + username);
    }
}