package ma.fstt.oracleproject.controllers;

import ma.fstt.oracleproject.services.PerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*") // Apply CORS globally to the controller
@RestController
@RequestMapping("/api/performance")
public class PerformanceController {

    @Autowired
    private PerformanceService performanceService;

    // Endpoint to get AWR (Automatic Workload Repository) report
    @GetMapping("/awr-report")
    public ResponseEntity<List<Map<String, Object>>> getAWRReport() {
        try {
            List<Map<String, Object>> awrReport = performanceService.getAWRReport();
            return ResponseEntity.ok(awrReport);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Endpoint to get ASH (Active Session History) report
    @GetMapping("/ash-report")
    public ResponseEntity<List<Map<String, Object>>> getASHReport() {
        try {
            List<Map<String, Object>> ashReport = performanceService.getASHReport();
            return ResponseEntity.ok(ashReport);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Endpoint to get real-time resource usage (CPU, I/O, Memory)
    @GetMapping("/resource-usage")
    public ResponseEntity<List<Map<String, Object>>> getResourceUsage() {
        try {
            List<Map<String, Object>> resourceUsage = performanceService.getResourceUsage();
            return ResponseEntity.ok(resourceUsage);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Endpoint to get real-time statistics
    @GetMapping("/realtime-stats")
    public ResponseEntity<List<Map<String, Object>>> getRealtimeStats() {
        try {
            List<Map<String, Object>> realtimeStats = performanceService.getRealtimeStats();
            return ResponseEntity.ok(realtimeStats);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
