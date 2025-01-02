package ma.fstt.oracleproject.services;

import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

@Service
public class PerformanceService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Method to get AWR (Automatic Workload Repository) report
    public List<Map<String, Object>> getAWRReport() {
        String sql = "SELECT * FROM DBA_HIST_SYSSTAT WHERE STAT_NAME = 'DB Time'";
        return jdbcTemplate.queryForList(sql);
    }

    // Method to get ASH (Active Session History) report
    public List<Map<String, Object>> getASHReport() {
        String sql = "SELECT * FROM V$ACTIVE_SESSION_HISTORY WHERE SAMPLE_TIME > SYSDATE - 1/24";
        return jdbcTemplate.queryForList(sql);
    }

    // Method to get real-time resource usage (CPU, I/O, Memory)
    public List<Map<String, Object>> getResourceUsage() {
        String sql = "SELECT * FROM V$SYSSTAT WHERE NAME IN ('CPU used by this session', 'Physical reads', 'Physical writes')";
        return jdbcTemplate.queryForList(sql);
    }

    // Method to fetch real-time statistics from Oracle
    public List<Map<String, Object>> getRealtimeStats() {
        String sql = "SELECT * FROM V$SYSSTAT WHERE NAME IN ('User calls', 'DB time', 'Redo size')";
        return jdbcTemplate.queryForList(sql);
    }
}
