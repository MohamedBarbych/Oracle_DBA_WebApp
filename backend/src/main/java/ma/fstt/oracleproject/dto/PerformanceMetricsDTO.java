package ma.fstt.oracleproject.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PerformanceMetricsDTO {
    private Long id;
    private Double cpuUsage;
    private Double memoryUsage;
    private Double diskIO;
    private LocalDateTime collectedAt; // Date de collecte
}
