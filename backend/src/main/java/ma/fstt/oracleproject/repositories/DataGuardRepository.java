package ma.fstt.oracleproject.repositories;

import ma.fstt.oracleproject.entities.DataGuard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataGuardRepository extends JpaRepository<DataGuard, Long> {
    DataGuard findByPrimaryDatabase(String primaryDatabase);
}
