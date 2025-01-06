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

    // Endpoint pour optimiser une requête spécifique (par sql_id)


    @GetMapping("/optimize-query/{sqlId}")
    public String optimizeQuery(@PathVariable String sqlId) {
        // Créer une tâche de tuning
        String taskName = optimizationService.createTuningTask(sqlId);

        // Exécuter la tâche de tuning
        optimizationService.executeTuningTask(taskName);

        // Extraire la requête optimisée
        String optimizedQuery = optimizationService.getOptimizedQuery(taskName);

        return optimizedQuery; // Retourner la requête optimisée au client
    }


    @GetMapping("/slow-queries")
    public ResponseEntity<List<Map<String,Object>>> getSlowQueries() {
// endpoint pour recuperer les requetes lentes
        try{
            List<Map<String,Object>> slowQueries = optimizationService.getSlowQueries();
            return ResponseEntity.ok(slowQueries);
        }catch (Exception e){
            return ResponseEntity.status(500).body(List.of(Map.of("Error", "Error fetching slow queries: " + e.getMessage())));
        }

    }

}


/*    @GetMapping("/optimize-query/{sqlId}")
    public ResponseEntity<Map<String, String>> optimizeQuery(@PathVariable String sqlId) {
            try {
            // Récupérer le rapport d'optimisation en tant que texte brut
            String report = optimizationService.getOptimizationReport(sqlId);

            // Retourner le rapport dans la réponse
            return ResponseEntity.ok(Map.of("report", report));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("Error", "Error fetching optimization report: " + e.getMessage()));
        }
    }*/

    // Endpoint pour optimiser une requête spécifique (par sql_id)

//    @GetMapping("/optimize-query/{sqlId}")
//    public ResponseEntity<String> optimizeQuery(@PathVariable String sqlId) {
//        try {
//            String optimizedQuery = optimizationService.executeTuningTaskAndGetOptimizedQuery(sqlId);
//            return ResponseEntity.ok(optimizedQuery);
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Error while optimizing query: " + e.getMessage());
//        }
//    }*/

    /*
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

*/



