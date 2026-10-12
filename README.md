# ⚛️ BankBank — Frontend React

Interface utilisateur React de l'application bancaire **BankBank**, connectée à l'API REST Spring Boot.

> 🔧 Le backend Spring Boot est disponible sur la branche [`spring`](../spring).
> 📄 La documentation complète est sur la branche [`main`](../main).

---

## ✨ Fonctionnalités

- 🔐 Authentification JWT (login + gestion du token)
- 👤 Interface de gestion des utilisateurs
- 💰 Gestion des comptes bancaires (liste, création, édition, suppression)
- 💸 Opérations bancaires (virements, dépôts, retraits)
- 📄 Téléchargement des relevés PDF
- 📈 Export Excel depuis l'interface

---

## 🛠️ Stack technique

| Élément | Techno |
|---|---|
| Framework | React |
| Bootstrap | Create React App |
| Langage | JavaScript (ES6+) |
| Appels API | Fetch / Axios vers backend Spring Boot |
| Package manager | npm |

---

## 🚀 Lancement

### Prérequis
- Node.js 18+
- npm
- Le **backend Spring Boot** doit tourner sur `http://localhost:8080`

### Étapes

```bash
# 1. Se placer sur la branche master
git clone https://github.com/wassimkhazri1/gestion-des-comptes
cd gestion-des-comptes
git checkout master

# 2. Installer les dépendances
npm install

# 3. Lancer en mode développement
npm start
```

Frontend accessible sur `http://localhost:3000`.

### Build production

```bash
npm run build
```
Le build optimisé sera dans le dossier `build/`.

---

## 📁 Structure

```
src/
├── components/     # Composants réutilisables
├── pages/          # Pages de l'application
├── services/       # Appels API (fetch/axios)
└── ...
public/
package.json
```

---

## 🔗 Backend associé

Le backend Spring Boot est disponible sur la branche `spring` :
👉 [github.com/wassimkhazri1/gestion-des-comptes/tree/spring](https://github.com/wassimkhazri1/gestion-des-comptes/tree/spring)

---

## 👤 Auteur

**Wassim Khazri**
- 📧 wassim_khazri@hotmail.fr
- 💼 [LinkedIn](https://www.linkedin.com/in/wassim-khazri-ab923a14b/)
- 🐙 [GitHub](https://github.com/wassimkhazri1)
