# Oracle DBA WebApp

![image](https://github.com/user-attachments/assets/ab877b52-7402-4f74-aa9f-ebcf5a85947f)


## 🌐🔧 Application Web d'Administration Oracle

Une application puissante pour l'administration Oracle, conçue pour optimiser la gestion des utilisateurs, des sauvegardes, de la sécurité, et des performances.

### **Fonctionnalités Principales**

- 🔒 **Gestion des Utilisateurs** :
  - Création, modification et suppression de comptes utilisateurs.
  - Gestion des privilèges et des rôles utilisateurs.

- 📂 **Gestion des Sauvegardes** :
  - Planification automatique des sauvegardes.
  - Suivi des sauvegardes et gestion des restaurations.

- 🔐 **Sécurité** :
  - Analyse des vulnérabilités.
  - Configuration des politiques de sécurité pour bases de données sensibles.

- 📊 **Optimisation des Performances** :
  - Surveillance des performances des requêtes SQL.
  - Conseils pour optimiser les temps de réponse des bases de données.

---

## 🛠️ **Technologies Utilisées**

### **Frontend**
- **Framework** : Angular 16
- **Langages** : TypeScript, HTML5, SCSS
- **Outils** :
  - RxJS pour la gestion des données réactives.
  - Angular CLI pour une configuration rapide.

### **Backend**
- **Framework** : Spring Boot 3.1
- **Langages** : Java
- **Services** :
  - API RESTful pour les opérations CRUD.
  - Intégration avec Oracle Database.

### **Base de Données**
- **Technologie** : Oracle Database 21c
- **Outils Additionnels** : PL/SQL pour des procédures et fonctions avancées.

---

## 🚀 **Déploiement Local**

### **Backend**
```bash
# Clonez le dépôt
$ git clone https://github.com/MohamedBarbych/Oracle_DBA_WebApp.git

# Naviguez vers le dossier backend
$ cd Oracle_DBA_WebApp/backend

# Lancez l'application Spring Boot
$ mvn spring-boot:run
```

## **Rôle de chaque entité**
- **User**

Représente un utilisateur du système, avec des informations comme le nom d'utilisateur, le mot de passe, les rôles attribués, et d'autres métadonnées comme la politique de mot de passe et le quota d'espace.
Technique : C'est une entité principale pour la gestion des utilisateurs et des relations avec d'autres entités comme les rôles, les sauvegardes, et les audits.
- **Role**

Définit les rôles utilisateurs, comme "Admin", "User", ou "Viewer". Chaque rôle peut être attribué à plusieurs utilisateurs, établissant une relation many-to-many.
Technique : Cette entité est essentielle pour la gestion des permissions et des droits d'accès.

- **PerformanceMetrics**

Capture les données de performance du système, telles que l'utilisation du CPU, de la mémoire, et des entrées/sorties disque à des moments spécifiques.
Technique : Utile pour le suivi des performances et l'analyse des données historiques.
