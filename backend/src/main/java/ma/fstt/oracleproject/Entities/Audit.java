package ma.fstt.oracleproject.Entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "audits")
public class Audit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String action; // Exemple : "LOGIN", "DATA_ACCESS"

    @Column(name = "performed_by", nullable = false)
    private String performedBy;

    @Column(name = "performed_at", nullable = false)
    private LocalDateTime performedAt;

    @Column(nullable = true)
    private String details; // Détails supplémentaires
}
