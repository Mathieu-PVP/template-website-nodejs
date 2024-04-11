# template-website-nodejs

[![JavaScript](https://img.shields.io/badge/--F7DF1E?logo=javascript&logoColor=000)](https://www.javascript.com/)
[![Node.js](https://img.shields.io/badge/--fff?logo=node.js&logoColor=#68a063)](https://nodejs.org/en/)
[![Minimum node.js version](https://badgen.net/npm/node/express)](https://npmjs.com/package/express)
[![GitHub license](https://img.shields.io/github/license/Mathieu-PVP/template-website-nodejs.svg)](https://github.com/Mathieu-PVP/template-website-nodejs/blob/master/LICENSE)
[![GitHub commits](https://badgen.net/github/commits/Mathieu-PVP/template-website-nodejs)](https://GitHub.com/Mathieu-PVP/template-website-nodejs/commit/)
[![GitHub latest commit](https://badgen.net/github/last-commit/Mathieu-PVP/template-website-nodejs)](https://GitHub.com/Mathieu-PVP/template-website-nodejs/commit/)
[![GitHub contributors](https://badgen.net/github/contributors/Mathieu-PVP/template-website-nodejs)](https://GitHub.com/Mathieu-PVP/template-website-nodejs/graphs/contributors/)
[![GitHub issues](https://badgen.net/github/issues/Mathieu-PVP/template-website-nodejs/)](https://GitHub.com/Mathieu-PVP/template-website-nodejs/issues/)

Un template de site internet développé dans le but de gagner du temps lors du développement de projets écrits avec Node.js

## Installation

1. Clonez le dépôt :
   ```
   git clone https://github.com/Mathieu-PVP/template-website-nodejs.git
   ```
3. Installez les dépendances :
   ```
   npm install
   ```
5. Démarrez le serveur web :
   ```
   node app.js
   ```

## Structure

- `./config` : Configurations pour la base de données, l'authentification etc...
- `./controllers` : Contrôleurs des routes
- `./middlewares` : Middlewares des routes
- `./models` : Modèles pour la base de données
- `./routes` : Routes de l'API
- `./services` : Services pour les contrôleurs
- `./utils` : Classes et fonctions utilitaires
- `./views` : Vues utilisées dans le projet

## Dernières modifications

- Ajout d'un système de réinitialisation de mot de passe
- Prise en charge de l'envoi de mail

## License

Ce projet est sous [licence GPL-3.0](https://github.com/Mathieu-PVP/template-website-nodejs/blob/main/LICENSE)
