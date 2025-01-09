package ma.fstt.oracleproject.controllers;

import ma.fstt.oracleproject.services.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/security")
@CrossOrigin(origins = "*")
public class SecurityController {

    @Autowired
    private SecurityService securityService;

    // Endpoint to configure Transparent Data Encryption (TDE)
    @PostMapping("/configure-tde")
    public ResponseEntity<String> configureTDE(@RequestParam String walletPassword) {
        try {
            securityService.configureTDE(walletPassword);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Endpoint to enable security auditing
    @PostMapping("/enable-audit")
    public ResponseEntity<String> enableSecurityAudit() {
        try {
            securityService.enableSecurityAudit();
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Endpoint to create a Virtual Private Database (VPD) policy
    @PostMapping("/create-vpd-policy")
    public ResponseEntity<String> createVPDPolicy() {
        try {
            securityService.createVPDPolicy();
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    // Endpoint to create a function for the VPD policy
    @PostMapping("/create-vpd-policy-function")
    public ResponseEntity<String> createVPDPolicyFunction() {
        try {
            securityService.createVPDPolicyFunction();
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
       }
 }

