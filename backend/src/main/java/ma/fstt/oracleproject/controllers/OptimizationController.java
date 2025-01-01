package ma.fstt.oracleproject.controllers;

import ma.fstt.oracleproject.services.OptimizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/optimization")
public class OptimizationController {

    @Autowired
    private OptimizationService optimizationService;

    // endpoint pour recuperer les requetes lentes
    @GetMapping("/slow-queries")
    public ResponseEntity<List<Map<String,Object>>> getSlowQueries() {
        try{
            List<Map<String,Object>> slowQueries = optimizationService.getSlowQueries();
            return ResponseEntity.ok(slowQueries);
        }catch (Exception e){
            return ResponseEntity.status(500).body(List.of(Map.of("Error", "Error fetching slow queries: " + e.getMessage())));
        }
    }



    // Endpoint pour optimiser une requête spécifique (par sql_id)

    @GetMapping("/optimize-query/{sqlId}")
    public ResponseEntity<List<Map<String, Object>>> getRecommendations(@PathVariable String sqlId) {
        try {
            // Appel au service pour obtenir les recommandations d'optimisation
            List<Map<String, Object>> recommendations = optimizationService.optimizeQuery(sqlId);

            if (recommendations.isEmpty()) {
                return ResponseEntity.status(404).body(List.of(Map.of("Message", "No recommendations found")));
            }

            // Retourne les recommandations sous forme de réponse OK
            return ResponseEntity.ok(recommendations);
        } catch (SQLException e) {
            // Gérer les erreurs liées à la base de données
            return ResponseEntity.status(500).body(List.of(Map.of("Error", "Error fetching recommendations: " + e.getMessage())));
        } catch (Exception e) {
            // Gérer toute autre erreur
            return ResponseEntity.status(500).body(List.of(Map.of("Error", "Unexpected error: " + e.getMessage())));
        }
    }



}
