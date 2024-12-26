package ma.fstt.oracleproject.dto;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class UserDTO {
    private Long id;
    private String username;
    private Set<String> roles; // Noms des rôles pour simplifier
    private Long quotaSpace;
    private String passwordPolicy;
    private List<Long> backups; // Liste d'IDs des backups associés
    private List<Long> audits; // Liste d'IDs des audits associés
    private List<Long> performanceMetrics; // Liste d'IDs des métriques associées
}
