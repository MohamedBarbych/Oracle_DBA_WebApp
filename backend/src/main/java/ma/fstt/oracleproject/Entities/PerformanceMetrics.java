package ma.fstt.oracleproject.Entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "performance_metrics")
public class PerformanceMetrics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cpu_usage", nullable = false)
    private Double cpuUsage;

    @Column(name = "memory_usage", nullable = false)
    private Double memoryUsage;

    @Column(name = "disk_io", nullable = false)
    private Double diskIO;

    @Column(name = "collected_at", nullable = false)
    private LocalDateTime collectedAt;
}
