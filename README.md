
# Bibliotheque Altempo

## Pré-requis

- Installer la dernière version de NodeJS (npm >= 2.10)
- Installer compass (Installer ruby puis exécuter `gem install compass`)
- Lancer les commandes suivantes:
  - [sudo] npm install -g npm gulp bower

## Récupération et préparation du projet


- Lancer les commandes suivantes:
  - npm install
  - bower install
  - gulp
- Le projet va récupérer les dépendances, compiler le projet, etc.
- Configurer éventuellement l'endroit ouù il faut topper l'API dans le fichier config.yml
  - Pour le travail en local : utiliser `development`
  - Pour les tests : utiliser `test`
  - Pour la production : utiliser `production`

## Génération avec Gulp

- Travailler en temps réel avec rafraichissement automatique dans le navigateur: `gulp serve`
- Exécuter les tests unitaires : `gulp test`
- Compiler le projet (Tests, Build, Package) : `gulp` (Le ZIP du projet complet sera sous ./dist/*projet*-*version*.zip)
