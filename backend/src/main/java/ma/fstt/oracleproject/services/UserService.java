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
        String createUserSQL = String.format("CREATE USER \"%s\" IDENTIFIED BY \"%s\"", username.toUpperCase(), password);
        String grantRoleSQL = String.format("GRANT %s TO \"%s\"", roles.trim().toUpperCase(), username.toUpperCase());

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
                // Construire une requête sécurisée
                String updatePasswordSQL = "ALTER USER " + username.toUpperCase() + " IDENTIFIED BY \"" + newPassword + "\"";

                // Exécuter la requête pour changer le mot de passe
                jdbcTemplate.execute(updatePasswordSQL);
            }

            // Ajouter de nouveaux rôles si spécifiés
            if (newRoles != null && !newRoles.isEmpty()) {
                String[] roles = newRoles.split(",");
                for (String role : roles) {
                    // Ajouter un rôle
                    String grantRoleSQL = "GRANT " + role.trim().toUpperCase() + " TO " + username.toUpperCase();
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

    @Transactional
    public void deleteUser(String username) {
        username = username.trim();

        try {
            // Validation du paramètre
            if (username == null || username.isEmpty()) {
                throw new IllegalArgumentException("Le nom d'utilisateur est obligatoire.");
            }

            // Commande pour supprimer l'utilisateur
            String deleteUserSQL = "DROP USER " + username.toUpperCase() + " CASCADE";
            jdbcTemplate.execute(deleteUserSQL);

            System.out.println("Utilisateur supprimé avec succès : " + username);
        } catch (DataAccessException e) {
            throw new RuntimeException("Erreur SQL : " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la suppression de l'utilisateur : " + e.getMessage(), e);
        }
    }


    public boolean getUser(String username) {
        username = username.trim();

        try {
            // Validation du paramètre
            if (username == null || username.isEmpty()) {
                throw new IllegalArgumentException("Le nom d'utilisateur est obligatoire.");
            }

            // Vérification dans dba_users
            String checkUserSQL = "SELECT COUNT(*) FROM dba_users WHERE USERNAME = ?";
            Integer count = jdbcTemplate.queryForObject(checkUserSQL, new Object[]{username.toUpperCase()}, Integer.class);

            return count != null && count > 0;
        } catch (DataAccessException e) {
            throw new RuntimeException("Erreur SQL : " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la vérification de l'utilisateur : " + e.getMessage(), e);
        }
    }


    @Transactional
    public void assignRoleToUser(String username, String role) {
        username = username.trim();
        role = role.trim();

        try {
            // Validation des paramètres
            if (username == null || username.isEmpty() || role == null || role.isEmpty()) {
                throw new IllegalArgumentException("Le nom d'utilisateur et le rôle sont obligatoires.");
            }

            // Commande pour attribuer un rôle
            String assignRoleSQL = "GRANT " + role.toUpperCase() + " TO " + username.toUpperCase();
            jdbcTemplate.execute(assignRoleSQL);

            System.out.println("Rôle attribué à l'utilisateur : " + username);
        } catch (DataAccessException e) {
            throw new RuntimeException("Erreur SQL : " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de l'attribution du rôle : " + e.getMessage(), e);
        }
    }



    @Transactional
    public void setUserQuota(String username, int quota) {
        username = username.trim();

        try {
            // Validation des paramètres
            if (username == null || username.isEmpty()) {
                throw new IllegalArgumentException("Le nom d'utilisateur est obligatoire.");
            }

            // Commande pour ajuster le quota
            String setQuotaSQL = "ALTER USER " + username.toUpperCase() + " QUOTA " + quota + "M ON USERS";
            jdbcTemplate.execute(setQuotaSQL);

            System.out.println("Quota mis à jour pour l'utilisateur : " + username);
        } catch (DataAccessException e) {
            throw new RuntimeException("Erreur SQL : " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la mise à jour du quota : " + e.getMessage(), e);
        }
    }


    @Transactional
    public void createTablespaceForUser(String tablespaceName, String username, int sizeInMB) {
        tablespaceName = tablespaceName.trim();
        username = username.trim();

        try {
            // Validation des paramètres
            if (tablespaceName == null || tablespaceName.isEmpty()) {
                throw new IllegalArgumentException("Le nom du tablespace est obligatoire.");
            }
            if (username == null || username.isEmpty()) {
                throw new IllegalArgumentException("Le nom d'utilisateur est obligatoire.");
            }
            if (sizeInMB <= 0) {
                throw new IllegalArgumentException("La taille du tablespace doit être supérieure à 0.");
            }

            // Création du tablespace
            String createTablespaceSQL = String.format(
                    "CREATE TABLESPACE %s DATAFILE '%s.dbf' SIZE %dM AUTOEXTEND ON NEXT 10M MAXSIZE UNLIMITED",
                    tablespaceName.toUpperCase(),
                    tablespaceName.toLowerCase(),
                    sizeInMB
            );
            jdbcTemplate.execute(createTablespaceSQL);

            // Attribution du tablespace par défaut à l'utilisateur
            String alterUserSQL = String.format(
                    "ALTER USER %s DEFAULT TABLESPACE %s",
                    username.toUpperCase(),
                    tablespaceName.toUpperCase()
            );
            jdbcTemplate.execute(alterUserSQL);

            System.out.println("Tablespace créé et assigné à l'utilisateur avec succès : " + username);

        } catch (DataAccessException e) {
            throw new RuntimeException("Erreur SQL : " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la création du tablespace : " + e.getMessage(), e);
        }
    }

}
