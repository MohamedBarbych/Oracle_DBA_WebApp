package ma.fstt.oracleproject.repositories;

import ma.fstt.oracleproject.Entities.Audit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditRepository extends JpaRepository<Audit, Long> {

    List<Audit> findByPerformedBy(String username);


}
