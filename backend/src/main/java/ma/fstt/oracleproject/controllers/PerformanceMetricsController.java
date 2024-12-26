package ma.fstt.oracleproject.controllers;

import lombok.RequiredArgsConstructor;
import ma.fstt.oracleproject.dto.PerformanceMetricsDTO;
import ma.fstt.oracleproject.services.PerformanceMetricsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metrics")
@RequiredArgsConstructor
public class PerformanceMetricsController {

    private final PerformanceMetricsService metricsService;

    @GetMapping
    public ResponseEntity<List<PerformanceMetricsDTO>> getAllMetrics() {
        List<PerformanceMetricsDTO> metrics = metricsService.findAll();
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PerformanceMetricsDTO> getMetricsById(@PathVariable Long id) {
        PerformanceMetricsDTO metrics = metricsService.findById(id);
        return ResponseEntity.ok(metrics);
    }

    @PostMapping
    public ResponseEntity<PerformanceMetricsDTO> createMetrics(@RequestBody PerformanceMetricsDTO metricsDTO) {
        PerformanceMetricsDTO savedMetrics = metricsService.save(metricsDTO);
        return ResponseEntity.ok(savedMetrics);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PerformanceMetricsDTO> updateMetrics(@PathVariable Long id, @RequestBody PerformanceMetricsDTO metricsDTO) {
        metricsDTO.setId(id); // Assigner l'ID
        PerformanceMetricsDTO updatedMetrics = metricsService.save(metricsDTO);
        return ResponseEntity.ok(updatedMetrics);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMetrics(@PathVariable Long id) {
        metricsService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
