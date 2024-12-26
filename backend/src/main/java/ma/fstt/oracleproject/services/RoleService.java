package ma.fstt.oracleproject.services;

import ma.fstt.oracleproject.dto.RoleDTO;

public interface RoleService extends GenericService<RoleDTO, Long> {
    RoleDTO findByName(String name);

    RoleDTO findById(Long id);
}
