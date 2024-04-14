# WorkWizeBakend
WorkWizeBakend


## About the Project
Workwize est l'application web qui révolutionne votre recherche d'emploi. Centralisez vos candidatures, recevez des alertes, relancez les recruteurs, fixez-vous des objectifs et optimisez vos chances de décrocher le poste de vos rêves.

## Environment Variables

Avant d'exécuter l'application, assurez-vous de configurer les variables d'environnement suivantes :

# General Configuration
PORT=3002                  # Le port sur lequel le serveur doit écouter
API_VERSION='/api/v1'      # La version de l'API

# Database Configuration
DATABASE_URL="mongodb+srv://user:password@cluster0.perfotq.mongodb.net/" # L'URL de la base de données MongoDB
DB_NAME="DBname" # Le nom de la base de données MongoDB

# Mail Configuration
EMAIL='mail@gmail.com'   # L'adresse e-mail à utiliser pour l'envoi d'e-mails
EMAIL_PASSWORD='password'  # Le mot de passe de l'adresse e-mail

# Token
ACCESS_TOKEN_SECRET_KEY='Votre_clé_secrète_pour_les_jetons_d'accès' # La clé secrète utilisée pour signer les jetons d'accès
REFRESH_TOKEN_SECRET_KEY='Votre_clé_secrète_pour_les_jetons_de_réactualisation' # La clé secrète utilisée pour signer les jetons de rafraîchissement
## How To Use

### Utilisation avec Visual Studio Code
Pour cloner et exécuter cette application, vous aurez besoin de Git et de Node.js (qui inclut npm) installés sur votre ordinateur. Depuis votre ligne de commande :


1. **Cloner ce dépôt**
   ```sh
   $ https://github.com/mibanas/WorkWizeBakend.git
   ```

2. **Accéder au dossier du projet**
   ```sh
   $ cd WorkWizeBakend
   ```

3. **Installer les dépendances**
   ```sh
   $ npm install
   ```

4. **Lancer le serveur de développement**
   ```sh
   $ npm start
   ```

5. **Exécuter les tests**
   ```sh
   $ npm test
   ```
## Image Docker 
Voici les instructions sous forme de texte pour tirer une image Docker depuis Docker Hub et exécuter le backend sur le port 3002 :
docker pull ibanas/workwizebackend

#Pull de l'image Docker
   ```sh
   $ docker pull ibanas/workwizebackend:latest
   ```

  docker run --name nom_du_conteneur -p 3002:3002 nom_utilisateur/image_docker:tag
  
   ```sh
   $ docker run --name nom_du_conteneur -p 3002:3002 ibanas/workwizebackend:latest
   ```





