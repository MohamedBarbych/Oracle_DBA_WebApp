package ma.fstt.oracleproject.Entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "backups")
public class Backup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type; // "FULL" or "INCREMENTAL"

    @Column(nullable = false)
    private String status; // "SUCCESS", "FAILED", etc.

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "restored_at", nullable = true)
    private LocalDateTime restoredAt;

    @Column(name = "auto_schedule", nullable = true)
    private Boolean autoSchedule;

    @ManyToOne
    private DataGuard dataguard;

}
