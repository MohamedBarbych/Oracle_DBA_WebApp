package ma.fstt.oracleproject.repositories;

import ma.fstt.oracleproject.Entities.PerformanceMetrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PerformanceMetricsRepository extends JpaRepository<PerformanceMetrics, Long> {

    List<PerformanceMetrics> findByCollectedAtBetween(LocalDateTime startDate, LocalDateTime endDate);


}
