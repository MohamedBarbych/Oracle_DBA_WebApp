# Oracle_DBA_WebApp

![Oracle DBA WebApp Logo](https://via.placeholder.com/100x100.png?text=Logo)

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
