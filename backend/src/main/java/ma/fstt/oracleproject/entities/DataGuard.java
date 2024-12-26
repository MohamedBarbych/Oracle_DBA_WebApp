package ma.fstt.oracleproject.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "data_guard")
public class DataGuard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String primaryDatabase;

    @Column(nullable = false)
    private String standbyDatabase;

    @Column(nullable = false)
    private String status; // Exemple : "SYNCHRONIZED", "NOT_SYNCHRONIZED"

    @Column(name = "last_failover", nullable = true)
    private LocalDateTime lastFailover;
}

