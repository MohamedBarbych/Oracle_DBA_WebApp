package ma.fstt.oracleproject.repositories;

import ma.fstt.oracleproject.entities.Backup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BackupRepository extends JpaRepository<Backup, Long> {
    List<Backup> findById(String type);

    List<Backup> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
}
