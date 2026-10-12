# 🏦 BankBank — Backend Spring Boot

Backend de l'application bancaire **BankBank**, développé avec **Spring Boot 3 / Java 17**.

> ⚛️ Le frontend React est disponible sur la branche [`master`](../master).
> 📄 La documentation complète est sur la branche [`main`](../main).

---

## ✨ Fonctionnalités

- 🔐 Authentification sécurisée **JWT** (Spring Security 6 + JJWT)
- 👤 Gestion des utilisateurs et rôles
- 💰 Gestion des comptes bancaires (CRUD)
- 💸 Opérations bancaires (virements, dépôts, retraits)
- 📄 Génération de relevés **PDF** (iText)
- 📈 Export **Excel** (Apache POI)
- 🖥️ Interface web **Thymeleaf** (Layout Dialect + SpringSecurity6 Extras)
- ✅ Validation des données (Jakarta Validation)

---

## 🛠️ Stack technique

| Couche | Technologies |
|---|---|
| Langage | Java 17 |
| Framework | Spring Boot 3.3.1, Spring Web, Spring Data JPA, Spring Security |
| Templating | Thymeleaf, Thymeleaf Layout Dialect, Thymeleaf Extras SpringSecurity6 |
| Sécurité | JWT (jjwt 0.11.5), Spring Security 6 |
| Base de données | MySQL |
| Génération documents | iText PDF, Apache POI (Excel) |
| Validation | Jakarta Validation |
| Build | Maven |
| Tests | JUnit, Spring Boot Test, Spring Security Test |
| Autres | Lombok, Spring Boot DevTools |

---

## 🚀 Lancement

### Prérequis
- Java 17+
- Maven 3.8+
- MySQL 8+

### Étapes

```bash
# 1. Se placer sur la branche spring
git clone https://github.com/wassimkhazri1/gestion-des-comptes
cd gestion-des-comptes
git checkout spring

# 2. Configurer MySQL dans src/main/resources/application.properties
# spring.datasource.url=jdbc:mysql://localhost:3306/bankbank_db
# spring.datasource.username=VOTRE_USER
# spring.datasource.password=VOTRE_PASSWORD

# 3. Lancer l'application
./mvnw spring-boot:run
```

Backend accessible sur `http://localhost:8080`.

---

## 📁 Structure

```
src/main/java/com/sid/BankBank/
├── controller/     # Contrôleurs MVC + REST
├── service/        # Logique métier
├── repository/     # Accès données JPA
├── entity/         # Entités JPA
├── security/       # Configuration JWT + Spring Security
└── ...
src/main/resources/
├── templates/      # Vues Thymeleaf
├── static/
└── application.properties
```

---

## 🔐 Sécurité

- Authentification **JWT** (JSON Web Token)
- Mots de passe hashés
- Autorisation par rôles (Spring Security 6)
- Intégration Thymeleaf + Spring Security (affichage conditionnel selon les droits)

---

## 👤 Auteur

**Wassim Khazri**
- 📧 wassim_khazri@hotmail.fr
- 💼 [LinkedIn](https://www.linkedin.com/in/wassim-khazri-ab923a14b/)
- 🐙 [GitHub](https://github.com/wassimkhazri1)
