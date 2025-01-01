package ma.fstt.oracleproject.services;

import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OptimizationService {

    private static final String URL = "jdbc:oracle:thin:@localhost:1521/ORCLPDB1";
    private static final String USER = "sys as sysdba";
    private static final String PASSWORD = "oracle";

    public List<Map<String, Object>> getSlowQueries() throws Exception {
        List<Map<String, Object>> slowQueries = new ArrayList<>();

        try (Connection connection = DriverManager.getConnection(URL, USER, PASSWORD)) {
            String query = "SELECT sql_id, elapsed_time / 1000000 AS elapsed_seconds, " +
                    "executions, sql_text " +
                    "FROM v$sql " +
                    "WHERE elapsed_time > 1000000 AND executions > 0 " +
                    "ORDER BY elapsed_time DESC";
            try (PreparedStatement statement = connection.prepareStatement(query);
                 ResultSet resultSet = statement.executeQuery()) {
                while (resultSet.next()) {
                    Map<String, Object> row = new HashMap<>();
                    row.put("sql_id", resultSet.getString("sql_id"));
                    row.put("elapsed_seconds", resultSet.getDouble("elapsed_seconds"));
                    row.put("executions", resultSet.getInt("executions"));
                    row.put("sql_text", resultSet.getString("sql_text"));

                    slowQueries.add(row);
                }
            }
        }

        return slowQueries;
    }

    public List<Map<String, Object>> optimizeQuery(String sqlId) throws SQLException {
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
    }
}

