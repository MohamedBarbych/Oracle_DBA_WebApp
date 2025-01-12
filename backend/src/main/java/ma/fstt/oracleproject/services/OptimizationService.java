package ma.fstt.oracleproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OptimizationService {

    @Autowired
    private DataSource dataSource;

/*    private static final String URL = "jdbc:oracle:thin:@localhost:1521/ORCLPDB1";
    private static final String USER = "sys as sysdba";
    private static final String PASSWORD = "oracle";*/


    public List<Map<String, Object>> getSlowQueries() throws Exception {
        List<Map<String, Object>> slowQueries = new ArrayList<>();

        String query = "SELECT sql_id, elapsed_time / 1000000 AS elapsed_seconds, " +
                "executions, sql_text " +
                "FROM v$sql " +
                "WHERE elapsed_time > 1000000 AND executions > 0 " +
                "ORDER BY elapsed_time DESC";
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(query);
             ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                Map<String, Object> row = new HashMap<>();
                row.put("sql_id", resultSet.getString("sql_id"));
                row.put("elapsed_seconds", resultSet.getDouble("elapsed_seconds"));
                row.put("executions", resultSet.getInt("executions"));
                row.put("sql_text", resultSet.getString("sql_text"));

                slowQueries.add(row);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error while fetching slow queries", e);
        }


        return slowQueries;
    }

    public String createTuningTask(String sqlId) {
        String taskName = "Tuing_Tasks_" + sqlId;
        String plsql = """
                DECLARE
                  v_task_name VARCHAR2(30);
                BEGIN
                  v_task_name := DBMS_SQLTUNE.CREATE_TUNING_TASK(
                    sql_id           => '%s',
                    scope            => 'COMPREHENSIVE',
                    time_limit       => 60,
                    task_name        => '%s',
                    description      => 'Tuning for SQL query optimization'
                  );
                END;
                """.formatted(sqlId, taskName);

        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement()) {
            statement.executeUpdate(plsql);
            return taskName;
        } catch (Exception e) {
            throw new RuntimeException("Error while creating tuning task: " + e.getMessage(), e);
        }
    }

    // Exécuter la tâche de tuning
    public String executeTuningTask(String taskName) {
        String plsql = """
                BEGIN
                    DBMS_SQLTUNE.EXECUTE_TUNING_TASK(task_name => '%s');
                END;
                """.formatted(taskName);

        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement()) {
            statement.executeUpdate(plsql);
            return "Tuning task executed successfully: " + taskName;
        } catch (Exception e) {
            throw new RuntimeException("Error while executing tuning task: " + e.getMessage(), e);
        }
    }

    // Extraire la requête optimisée après exécution de la tâche
    public String getOptimizedQuery(String taskName) {
        String plsql = "SELECT DBMS_SQLTUNE.REPORT_TUNING_TASK('%s') AS report FROM DUAL".formatted(taskName);
        String optimizedQuery = "";

        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(plsql)) {

            if (resultSet.next()) {
                String report = resultSet.getString("report");

                // Extraire la requête SQL à partir du rapport
                int start = report.indexOf("SQL Text:") + "SQL Text:".length();
                int end = report.indexOf("ADDITIONAL INFORMATION SECTION");
                if (start > 0 && end > start) {
                    optimizedQuery = report.substring(start, end).trim(); // Extraire la requête SQL

                    // Si la requête SQL est une procédure, vous pouvez la nettoyer ou la traiter selon les besoins.
                    if (optimizedQuery.contains("call")) {
                        optimizedQuery = "Optimized SQL is a procedure call: " + optimizedQuery;
                    }
                }
            }

        } catch (Exception e) {
            throw new RuntimeException("Error while fetching optimized query: " + e.getMessage(), e);
        }

        if (optimizedQuery.isEmpty()) {
            return "There are no recommendations to improve the statement."; // Message explicite si la requête est vide
        }

        return optimizedQuery;
    }
}



    /*public List<Map<String, Object>> optimizeQuery(String sqlId) throws SQLException {
        List<Map<String, Object>> recommendations = new ArrayList<>();

        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD)) {
            // Créer la tâche de tuning SQL avec des paramètres corrects
            String createTaskQuery = "BEGIN " +
                    "  DBMS_SQLTUNE.create_tuning_task(" +
                    "    sql_id => ?, " +
                    "    scope => 'COMPREHENSIVE', " +  // Scope à définir : 'COMPREHENSIVE' ou 'BASIC'
                    "    time_limit => 60, " +           // Durée limite de la tâche (en secondes)
                    "    task_name => 'TuningTask_' || TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS'), " +
                    "    description => 'SQL Tuning Advisor Task', " +
                    "    attributes => DBMS_SQLTUNE.ATTR_ALL); " +  // Option pour inclure tous les attributs
                    "END;";

            try (PreparedStatement statement = connection.prepareStatement(createTaskQuery)) {
                statement.setString(1, sqlId);
                statement.executeUpdate();
            }

            // Récupérer les recommandations du SQL Tuning Advisor
            String recommendationsQuery = "SELECT * FROM table(DBMS_SQLTUNE.report_tuning_task('TuningTask_' || TO_CHAR(SYSDATE, 'YYYYMMDDHH24MISS')))";
            try (PreparedStatement statement = connection.prepareStatement(recommendationsQuery);
                 ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    Map<String, Object> recommendation = new HashMap<>();
                    recommendation.put("recommendation", resultSet.getString("recommendation"));
                    recommendations.add(recommendation);
                }
            }
        }

        return recommendations;
    }*/





