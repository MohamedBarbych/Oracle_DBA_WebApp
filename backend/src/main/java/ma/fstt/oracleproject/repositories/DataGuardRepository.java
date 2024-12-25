package ma.fstt.oracleproject.repositories;

import ma.fstt.oracleproject.Entities.DataGuard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataGuardRepository extends JpaRepository<DataGuard, Long> {
    DataGuard findByPrimaryDatabase(String primaryDatabase);
}
