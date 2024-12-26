package ma.fstt.oracleproject.services.impl;

import lombok.RequiredArgsConstructor;
import ma.fstt.oracleproject.dto.PerformanceMetricsDTO;
import ma.fstt.oracleproject.entities.PerformanceMetrics;
import ma.fstt.oracleproject.repositories.PerformanceMetricsRepository;
import ma.fstt.oracleproject.services.PerformanceMetricsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PerformanceMetricsImpl implements PerformanceMetricsService {
        private final PerformanceMetricsRepository metricsRepository;



    @Override
    public List<PerformanceMetricsDTO> findAll() {
        return metricsRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

    }

    private PerformanceMetricsDTO convertToDTO(PerformanceMetrics metrics) {
        PerformanceMetricsDTO dto = new PerformanceMetricsDTO();
        dto.setId(metrics.getId());
        dto.setCpuUsage(metrics.getCpuUsage());
        dto.setMemoryUsage(metrics.getMemoryUsage());
        dto.setDiskIO(metrics.getDiskIO());
        dto.setCollectedAt(metrics.getCollectedAt());
        return dto;
    }

    @Override
    public PerformanceMetricsDTO findById(Long id) {
        PerformanceMetrics metrics = metricsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Performance Metrics not found"));
        return convertToDTO(metrics);
    }

    @Override
    public PerformanceMetricsDTO save(PerformanceMetricsDTO dto) {
        PerformanceMetrics metrics = convertToEntity(dto);
        PerformanceMetrics savedMetrics = metricsRepository.save(metrics);
        return convertToDTO(savedMetrics);
    }

    @Override
    public void deleteById(Long id) {
        metricsRepository.deleteById(id);
    }

    private PerformanceMetrics convertToEntity(PerformanceMetricsDTO dto) {
        PerformanceMetrics metrics = new PerformanceMetrics();
        metrics.setId(dto.getId());
        metrics.setCpuUsage(dto.getCpuUsage());
        metrics.setMemoryUsage(dto.getMemoryUsage());
        metrics.setDiskIO(dto.getDiskIO());
        metrics.setCollectedAt(dto.getCollectedAt());
        return metrics;
    }
}
