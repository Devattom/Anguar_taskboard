# Sequence 1

## Commandes utilisées

Création des composants

``` ng g c Home```

``` ng g c About```

## Routing
```
Home => /
About => /about
```

# Sequence 2

## 1 . Structure du flux
 - Le behaviorSubject utilisé dans le Tasks Service permet de stocker l'état des tâches
 - On part de ce BehavioSubject pour construire un Observable
 - Dans le composant Home on s'abonne à cet Observable via le | async afin d'afficher la liste des tâche

## 2 - Mise à jour des données
 - La méthode addTask dans le service permet d'ajouter une nouvelle tâche puis appelle next() afin d'émettre la nouvelle valeur
 - La méthode addTask dans le composant Home vient appeler la méthode dans le service
 - La vue est recalculée grâce au | async qui s'abonne au flux

## 3 - Points clés
 - Pas besoin de gérer l'abonnement et le désabonnement grâce au | async
 - Le BehaviorSubject stocke et renvoi la dernière valeur qu'il a reçu
