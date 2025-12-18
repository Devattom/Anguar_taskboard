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

# Sequence 3

## Lazy loading

Le lazy loading permet de venir charger des bouts de l'application 
uniquement au moment ou nous devons y accéder. Pour ce faire on peut soit passer par 
loadComponent afin de charger un component de façon asynchrone, si une route à aussi des enfants
ici dans l'exemple les tasks on peut utiliser loadChildren, ici on va chercher un fichier de routes
intégrer au niveau du composant puis on injecte ces routes dans le main router de façon asynchrone au besoin.
Cette approche nous permet de reduire le bundle initial et donc d'accélerer le chargement initial de l'app.
Cependant en contre partie la navigation peut-être un peu moins fluide entre chaque page, car Angular doit charger
le chunk correspondant avant de pouvoir afficher les données.

## Dossier features

Le fait de créer un dossier features, nous permet de venir organiser notre code en fonction des features (fonctionnalitées) de notre
application et non pas en fonction de nos fichiers. Cela permet donc de découper de façon cohérente l'architecture de fichier de notre application.

## Composants dynamiques

Les composants dynamiques nous permettent de venir injecter directement un composant sans que celui-ci soit présent initialement dans le template et cela
de façon dynamique. On peut donc choisir sous qu'elle conditions injecter se composant. Cela est très utile par exemple pour les modals, ou les
message d'alertes type Toast.

## ViewContainer + createComponent()

Le ViewContainer nous permet de créer un endroit dans notre template où l'on viendra injecter le composant que l'on veut afficher dynamiquement.
Pour cela on vient créer une ref dans le template avec le #, ensuite grâce au décorateur @ViewChild ont peut lier notre container dans le template à une variable
dans notre TS. Puis quand on le souhaite, par exemple au clic sur un bouton, on peut demander depuis le containerRef de créer un composant avec la méthode createComponent().
Cette méthode prend en entrée le composant qu'elle doit créer et va ensuite le rendre dans le container situé dans le template.

