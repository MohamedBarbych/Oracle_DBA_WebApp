package ma.fstt.oracleproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
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
        // Nettoyage des paramètres pour éviter les espaces ou erreurs de format
        username = username.trim();
        password = password.trim();

        // Construire les commandes SQL
        String createUserSQL = String.format("CREATE USER \"%s\" IDENTIFIED BY \"%s\"", username, password);
        String grantRoleSQL = String.format("GRANT %s TO \"%s\"", roles, username);

        try {
            // Exécution de la commande CREATE USER
            jdbcTemplate.execute(createUserSQL);

            // Attribution des rôles si spécifiés
            if (roles != null && !roles.isEmpty()) {
                jdbcTemplate.execute(grantRoleSQL);
            }

            System.out.println("Utilisateur créé avec succès : " + username);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la création de l'utilisateur : " + e.getMessage(), e);
        }
    }

    @Transactional
    public void updateUser(String username, String newPassword, String newRoles) {
        username = username.trim();
        newPassword = newPassword.trim();

        try {
            // Validation des paramètres
            if (username == null || username.isEmpty()) {
                throw new IllegalArgumentException("Le nom d'utilisateur est obligatoire.");
            }

            // Vérifier si l'utilisateur existe
            String checkUserSQL = "SELECT COUNT(*) FROM dba_users WHERE username = ?";
            Integer userCount = jdbcTemplate.queryForObject(checkUserSQL, new Object[]{username.toUpperCase()}, Integer.class);

            if (userCount == null || userCount == 0) {
                throw new IllegalArgumentException("L'utilisateur spécifié n'existe pas : " + username);
            }

            // Modifier le mot de passe
            if (newPassword != null && !newPassword.isEmpty()) {
                // Utiliser directement le mot de passe dans la requête
                String updatePasswordSQL = "ALTER USER " + username + " IDENTIFIED BY " + newPassword ;

                // Exécuter la requête pour changer le mot de passe
                jdbcTemplate.execute(updatePasswordSQL);
            }

            // Ajouter de nouveaux rôles si spécifiés
            if (newRoles != null && !newRoles.isEmpty()) {
                String[] roles = newRoles.split(",");
                for (String role : roles) {
                    // Ajouter un rôle
                    String grantRoleSQL = "GRANT " + role.trim() + " TO " + username;
                    jdbcTemplate.execute(grantRoleSQL);
                }
            }

            System.out.println("Mise à jour effectuée pour l'utilisateur : " + username);

        } catch (DataAccessException e) {
            throw new RuntimeException("Erreur SQL : " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la mise à jour de l'utilisateur : " + e.getMessage(), e);
        }
    }

    // Méthode pour supprimer un utilisateur
    @Transactional
    public void deleteUser(String username) {
        username = username.trim();
        try {
            // Commande pour supprimer l'utilisateur
            String deleteUserSQL = "DROP USER " + username + " CASCADE";
            jdbcTemplate.execute(deleteUserSQL);

            System.out.println("Utilisateur supprimé avec succès : " + username);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la suppression de l'utilisateur : " + e.getMessage(), e);
        }
    }

    // Méthode pour vérifier si un utilisateur existe
    public boolean getUser(String username) {
        username = username.trim();
        try {
            // Vérification dans dba_users
            String checkUserSQL = "SELECT COUNT(*) FROM dba_users WHERE USERNAME = ?";
            Integer count = jdbcTemplate.queryForObject(checkUserSQL, new Object[]{username.toUpperCase()}, Integer.class);

            return count != null && count > 0;
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la vérification de l'utilisateur : " + e.getMessage(), e);
        }
    }

    // Méthode pour attribuer un rôle à un utilisateur
    @Transactional
    public void assignRoleToUser(String username, String role) {
        try {
            // Commande pour attribuer un rôle
            String assignRoleSQL = "GRANT " + role + " TO " + username;
            jdbcTemplate.execute(assignRoleSQL);

            System.out.println("Rôle attribué à l'utilisateur : " + username);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de l'attribution du rôle : " + e.getMessage(), e);
        }
    }

    // Méthode pour définir un quota d'espace pour un utilisateur
    @Transactional
    public void setUserQuota(String username, int quota) {
        try {
            // Commande pour ajuster le quota
            String setQuotaSQL = "ALTER USER " + username + " QUOTA " + quota + "M ON USERS";
            jdbcTemplate.execute(setQuotaSQL);

            System.out.println("Quota mis à jour pour l'utilisateur : " + username);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la mise à jour du quota : " + e.getMessage(), e);
        }
    }
}
