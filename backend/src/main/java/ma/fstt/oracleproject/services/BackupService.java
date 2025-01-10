package ma.fstt.oracleproject.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.sql.*;
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


        // calling the rman
        try{
            ProcessBuilder builder = new ProcessBuilder(
                    "docker", "exec", "oracle-db", "bash", "-c",
                    "source /home/oracle/.bashrc && rman target / cmdfile=/home/oracle/full_backup.rman"
            );


            // redirect error stream to stnadard output
            builder.redirectErrorStream(true);

            // start the process
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
        try{
            ProcessBuilder builder = new ProcessBuilder(
                    "docker", "exec", "oracle-db", "bash", "-c",
                    "source /home/oracle/.bashrc && rman target / cmdfile=/home/oracle/incremental_backup.rman"
            );


            // redirect error stream to stnadard output
            builder.redirectErrorStream(true);

            // start the process
            Process process = builder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while((line = reader.readLine()) != null){
                System.out.println(line);
            }

            int exitCode = process.waitFor();
            if(exitCode == 0){
                System.out.println("Incremental backup completed successfully");
            }
            else{
                System.out.println("Incremental backup failed");
            }
        }catch (Exception e){
            e.printStackTrace();
            throw new SQLException("Error triggering incremental backup");

        }
    }

    public List<String> getBackupHistory() throws SQLException {
        List<String> backupHistory = new ArrayList<>();
        String sql = "SELECT BACKUP_TYPE, SET_COUNT, START_TIME, COMPLETION_TIME FROM V$BACKUP_SET ORDER BY COMPLETION_TIME DESC";

        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(sql)) {
            while (resultSet.next()) {
                String backupType = resultSet.getString("BACKUP_TYPE");
                int setCount = resultSet.getInt("SET_COUNT");
                Timestamp startTime = resultSet.getTimestamp("START_TIME");
                Timestamp completionTime = resultSet.getTimestamp("COMPLETION_TIME");

                // Format the backup details as a string and add to the list
                String backupDetails = String.format(
                        "Type: %s, Set Count: %d, Start Time: %s, Completion Time: %s",
                        backupType, setCount, startTime, completionTime
                );

                backupHistory.add(backupDetails);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new SQLException("Error retrieving backup history", e);
        }

        return backupHistory;
    }


}
