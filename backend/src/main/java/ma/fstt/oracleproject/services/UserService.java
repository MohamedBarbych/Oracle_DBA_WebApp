package ma.fstt.oracleproject.services;

import ma.fstt.oracleproject.dto.UserDTO;

public interface UserService extends GenericService<UserDTO, Long> {
   UserDTO findByUsername(String username);
}
