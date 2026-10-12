# 🏦 BankBank — Application Bancaire Full-Stack

Application bancaire **full-stack** développée avec **Spring Boot 3** (backend) et **React** (frontend),
intégrant authentification JWT, génération de documents PDF/Excel et gestion complète des comptes.

> Développé par **Wassim Khazri** — [LinkedIn](https://www.linkedin.com/in/wassim-khazri-ab923a14b/) | [GitHub](https://github.com/wassimkhazri1)

---

## 📂 Organisation du dépôt

Ce projet est organisé en **branches séparées** pour le backend et le frontend :

| Branche | Contenu | Lien direct |
|---|---|---|
| **`spring`** | 🔧 Backend Spring Boot (Java 17, Spring Boot 3, Spring Security, JWT, Thymeleaf, JPA, MySQL, iText, Apache POI) | [Voir la branche `spring`](../../tree/spring) |
| **`master`** | ⚛️ Frontend React (Create React App) | [Voir la branche `master`](../../tree/master) |
| **`main`** | 📄 Documentation du projet (ce README) | — |

👉 **Pour explorer le code** : cliquez sur la branche correspondante ci-dessus.

---

## ✨ Fonctionnalités

- 🔐 **Authentification sécurisée JWT** (Spring Security 6 + JJWT)
- 👤 Gestion des utilisateurs et des rôles
- 💰 Gestion des comptes bancaires (CRUD complet)
- 💸 Opérations bancaires (virements, dépôts, retraits)
- 📄 **Génération de relevés PDF** (iText)
- 📈 **Export Excel** des données bancaires (Apache POI)
- 🖥️ **Interface web Thymeleaf** (Layout Dialect + SpringSecurity6 Extras)
- ⚛️ **Interface React** (branche `master`)
- ✅ Validation des données (Jakarta Validation)

---

## 🛠️ Stack technique

### Backend (branche `spring`)
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

### Frontend (branche `master`)
| Couche | Technologies |
|---|---|
| Framework | React (Create React App) |
| Langage | JavaScript (ES6+) |
| Communication | API REST Spring Boot |
| Package manager | npm |

---

## 🚀 Lancement

### 1️⃣ Backend

```bash
# Cloner et se placer sur la branche backend
git clone https://github.com/wassimkhazri1/gestion-des-comptes
cd gestion-des-comptes
git checkout spring

# Configurer MySQL dans src/main/resources/application.properties
# spring.datasource.url=jdbc:mysql://localhost:3306/bankbank_db
# spring.datasource.username=VOTRE_USER
# spring.datasource.password=VOTRE_PASSWORD

./mvnw spring-boot:run
```
Backend accessible sur `http://localhost:8080`.

### 2️⃣ Frontend

```bash
# Dans un autre terminal, se placer sur la branche frontend
git checkout master
npm install
npm start
```
Frontend accessible sur `http://localhost:3000`.

---

## 🔐 Sécurité

- Authentification **JWT** (JSON Web Token)
- Mots de passe hashés
- Autorisation par rôles (Spring Security 6)
- Intégration Thymeleaf + Spring Security (affichage conditionnel selon les droits)

---

## 📌 Améliorations futures

- [ ] Dockerisation (Dockerfile + docker-compose)
- [ ] CI/CD GitHub Actions
- [ ] Documentation API avec Swagger/OpenAPI
- [ ] Tests unitaires étendus

---

## 👤 Auteur

**Wassim Khazri**
- 📧 wassim_khazri@hotmail.fr
- 💼 [LinkedIn](https://www.linkedin.com/in/wassim-khazri-ab923a14b/)
- 🐙 [GitHub](https://github.com/wassimkhazri1)
