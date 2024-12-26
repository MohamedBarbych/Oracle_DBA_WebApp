package ma.fstt.oracleproject.services;

import java.util.List;

public interface GenericService<T,TD> {
    List<T> findAll();
    T fingById(TD id);
    T save(T dto);
    void deleteById(TD id);
}
