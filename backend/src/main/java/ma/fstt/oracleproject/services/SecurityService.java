package ma.fstt.oracleproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SecurityService {

    @Value("${oracle.wallet.path}")
    private String walletPath;

    @Value("${oracle.tablespace.path}")
    private String tablespacePath;

    @Value("${oracle.schema.name}")
    private String schemaName;

    @Value("${oracle.table.name}")
    private String tableName;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Transactional
    public void configureTDE(String walletPassword) {
        try {
            // Create the wallet
            executeSQL(String.format(
                    "ADMINISTER KEY MANAGEMENT CREATE KEYSTORE '%s' IDENTIFIED BY '%s'",
                    walletPath, walletPassword
            ));
            System.out.println("Wallet created successfully.");

            // Open the wallet
            executeSQL(String.format(
                    "ADMINISTER KEY MANAGEMENT OPEN KEYSTORE IDENTIFIED BY '%s'",
                    walletPassword
            ));
            System.out.println("Wallet opened successfully.");

            // Set the encryption key
            executeSQL(String.format(
                    "ADMINISTER KEY MANAGEMENT SET KEY IDENTIFIED BY '%s' WITH BACKUP",
                    walletPassword
            ));
            System.out.println("Encryption key configured successfully.");

            // Create encrypted tablespace
            executeSQL(String.format(
                    "CREATE TABLESPACE tde_tablespace " +
                            "DATAFILE '%s' SIZE 10M AUTOEXTEND ON " +
                            "ENCRYPTION USING 'AES256' DEFAULT STORAGE (ENCRYPT) LOGGING",
                    tablespacePath
            ));
            System.out.println("Encrypted tablespace created successfully.");
        } catch (Exception e) {
            throw new RuntimeException("Error configuring TDE: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void enableSecurityAudit() {
        try {
            executeSQL("AUDIT ALL BY ACCESS");
            System.out.println("Security audit enabled successfully.");
        } catch (Exception e) {
            throw new RuntimeException("Error enabling security audit: " + e.getMessage(), e);
        }
    }

    @Transactional
    public void createVPDPolicy() {
        try {
            // First check if the policy already exists
            String checkPolicyQuery = "SELECT COUNT(*) FROM ALL_POLICIES WHERE POLICY_NAME = 'VPD_POLICY' AND OBJECT_NAME = 'MY_TABLE' AND OBJECT_OWNER = 'MY_SCHEMA'";
            int count = jdbcTemplate.queryForObject(checkPolicyQuery, Integer.class);

            if (count > 0) {
                // If policy exists, drop it first
                String dropPolicyQuery = "BEGIN " +
                        "DBMS_RLS.DROP_POLICY(" +
                        "  object_schema => 'MY_SCHEMA', " +
                        "  object_name => 'MY_TABLE', " +
                        "  policy_name => 'VPD_POLICY'" +
                        "); END;";
                jdbcTemplate.execute(dropPolicyQuery);
                System.out.println("Existing VPD policy dropped.");
            }

            // Now create the new policy
            String createPolicyQuery = String.format(
                    "BEGIN " +
                            "DBMS_RLS.ADD_POLICY(" +
                            "  object_schema => '%s', " +
                            "  object_name => '%s', " +
                            "  policy_name => 'VPD_POLICY', " +
                            "  function_schema => '%s', " +
                            "  policy_function => 'vpd_function', " +
                            "  statement_types => 'SELECT'" +
                            "); END;",
                    schemaName, tableName, schemaName
            );

            jdbcTemplate.execute(createPolicyQuery);
            System.out.println("VPD policy created successfully.");
        } catch (Exception e) {
            throw new RuntimeException("Error creating VPD policy: " + e.getMessage(), e);
        }
    }



    @Transactional
    public void createVPDPolicyFunction() {
        try {
            executeSQL(
                    "CREATE OR REPLACE FUNCTION vpd_function " +
                            "RETURN VARCHAR2 AS " +
                            "BEGIN " +
                            "  RETURN 'user_id = SYS_CONTEXT(''USERENV'', ''SESSION_USER'')'; " +
                            "END;"
            );
            System.out.println("VPD policy function created successfully.");
        } catch (Exception e) {
            throw new RuntimeException("Error creating VPD policy function: " + e.getMessage(), e);
        }
    }

    private void executeSQL(String sql) {
        jdbcTemplate.execute(sql);
    }
}
