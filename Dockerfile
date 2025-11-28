# Utilisation de la version 24 LTS (Alpine pour la légèreté)
FROM node:24-alpine

# Définir le dossier de travail
WORKDIR /app

# Installation de la CLI Angular globalement
RUN npm install -g @angular/cli@20

# On expose le port 4200 par défaut (documentation)
EXPOSE 4200
