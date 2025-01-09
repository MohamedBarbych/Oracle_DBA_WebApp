# Application Web d'Administration Oracle 
<p align="center">
  <img src="https://github.com/user-attachments/assets/ab877b52-7402-4f74-aa9f-ebcf5a85947f" alt="Oracle DBA" width="400"/>
</p>

## ✍️ Superviseur
- Professeur Mohamed BEN AHMED


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

## 🏗️ Architecture du Projet
![workflow_oracle](https://github.com/user-attachments/assets/8525f4e2-9645-41a1-ba4d-82fcb2a2cf97)


## 🛠️ **Technologies Utilisées**

![Java](https://img.shields.io/badge/Java-17-blue)  
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.1-green)  
![Angular](https://img.shields.io/badge/Angular-16-red)  
![Oracle Database](https://img.shields.io/badge/Oracle%20Database-21c-orange)  
![Hibernate](https://img.shields.io/badge/Hibernate-ORM-brightgreen)

## 🗂️ Arborescence du Projet :
```
# 📁 Oracle_DBA_WebApp
├── 📂 backend
│   ├── 📂 src
│   │   ├── 📂 main
│   │   │   ├── 📂 java
│   │   │   │   └── ma.fstt.oracleproject
│   │   │   │       ├── 📂 controllers 
│   │   │   │       ├── 📂 entities
│   │   │   │       ├── 📂 services
│   │   │   │       └── 📂 config
│   │   │   └── 📂 resources
│   └── 📄 pom.xml
└── 📂 frontend
    ├── 📂 src
    │   └── 📂 app
    └── 📄 angular.json
```


## 🚀 **Déploiement Local**

### **Prérequis**

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

*   Java 17
*   Maven
*   Node.js et npm (ou yarn)
*   Angular CLI (via `npm install -g @angular/cli`)
*   Oracle Database 21c

### **Backend**
```bash
# Clonez le dépôt
$ git clone https://github.com/MohamedBarbych/Oracle_DBA_WebApp.git

# Naviguez vers le dossier backend
$ cd Oracle_DBA_WebApp/backend

# Lancez l'application Spring Boot
$ mvn spring-boot:run
```
### **Frontend**
```
# Naviguez vers le dossier frontend
$ cd Oracle_DBA_WebApp/frontend

# Installez les dépendances
$ npm install # Ou yarn install

# Lancez le serveur de développement Angular
$ ng serve
```


