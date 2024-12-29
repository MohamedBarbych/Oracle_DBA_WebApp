package ma.fstt.oracleproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Service
public class BackupService {

    @Autowired
    private DataSource dataSource;

    public void triggerFullBackup() throws SQLException {
// before calling the rman

        //        String sql = "BACKUP DATABASE";
//        try(Connection connection = dataSource.getConnection();
//            Statement statement = connection.createStatement()){
//            statement.execute(sql);
//        }catch (SQLException e){
//            e.printStackTrace();
//            throw new SQLException("Error in triggerFullBackup");
//        }

        runRmanBackup();

    }

    private void runRmanBackup() {
        try{
            ProcessBuilder builder = new ProcessBuilder(
                    "docker", "exec", "-it", "oracledb", "bash", "-c", "rman target /"
            );

            builder.redirectErrorStream(true);
            Process process = builder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while((line = reader.readLine()) != null){
                System.out.println(line);
            }

            int exitCode = process.waitFor();
            if(exitCode == 0){
                System.out.println("Backup completed successfully");
            }
            else{
                System.out.println("Backup failed");
            }
        }catch (Exception e){
            e.printStackTrace();

        }
    }

    public void triggerIncrementalBackup() throws SQLException {
        String sql = "BACKUP INCREMENTAL LEVEL 1 DATABASE;";  // RMAN command for incremental backup
        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement()) {
            statement.execute(sql);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new SQLException("Error triggering incremental backup");
        }
    }


    public List<String> getBackupHistory() throws SQLException {
        List<String> backupHistory = new ArrayList<>();
        String sql = "SELECT * FROM V$BACKUP_SET";
        try(Connection connection = dataSource.getConnection();
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(sql)){
            while(resultSet.next()){
                backupHistory.add(resultSet.getString("BACKUP_TYPE")+ " - "+resultSet.getString("BACKUP_SET_NAME"));
            }} catch(SQLException e){
                e.printStackTrace();
                throw new SQLException("Error retrieving backup history");
            }
        return backupHistory;

    }



}
