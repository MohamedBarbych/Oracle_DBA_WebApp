package ma.fstt.oracleproject.entities;


import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    // Eager fetch type is used to load all the roles at the same time as the user
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    @OneToMany(mappedBy = "triggeredBy")
    private List<Backup> backups;

    @OneToMany(mappedBy = "performedBy")
    private List<Audit> audits;

    @OneToMany(mappedBy = "user")
    private List<PerformanceMetrics> performanceMetrics;

    @Column(name = "quota_space",nullable = true)
    private Long quotaSpace;

    @Column(name = "password_policy",nullable = true)
    private String passwordPolicy;
}

