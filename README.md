# Casa Ferretti — lancement local

Le site est servi par Flask. La page `/compte` permet de créer un compte ou de se connecter. Les données sont enregistrées dans MySQL et les mots de passe sont stockés sous forme hachée.

## Préparer MySQL

1. Démarre le service MySQL dans WAMP ou dans ton installation locale.
2. Crée la base si elle n’existe pas encore :

   ```sql
   CREATE DATABASE IF NOT EXISTS databass
       CHARACTER SET utf8mb4
       COLLATE utf8mb4_unicode_ci;
   ```

3. Vérifie les paramètres dans `DataBass.SQL` (`host`, `port`, `user`, `password`, `database`). Le fichier est configuré pour MySQL local avec la base `databass`.

## Installer et lancer

Dans PowerShell, depuis ce dossier :

```powershell
python -m pip install -r requirements.txt
python database.py
python app.py
```

Ouvre ensuite <http://127.0.0.1:5000>. La page `/api/health` indique si l’API peut joindre MySQL. Une inscription réussie renvoie HTTP 201; une adresse e-mail déjà enregistrée renvoie HTTP 409. La connexion utilise une session protégée par cookie.

Pour conserver une clé de session stable entre les redémarrages, définis `FLASK_SECRET_KEY` dans l’environnement avant de lancer l’application. La clé générée automatiquement convient uniquement aux essais locaux et invalide les sessions au redémarrage.

Le script `python.py` est un utilitaire indépendant qui filtre `mon_fichier.xlsx`; place ce fichier à côté du script, puis lance `python python.py`. Il n’est pas utilisé par le formulaire du site.

## Vérification

```powershell
python -m unittest discover -s tests
```
