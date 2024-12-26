package ma.fstt.oracleproject.repositories;

import ma.fstt.oracleproject.entities.Audit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditRepository extends JpaRepository<Audit, Long> {

    List<Audit> findByPerformedBy(String username);


}
