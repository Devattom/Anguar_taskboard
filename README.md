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

# Séquence 4 — Tests Unitaires Angular

  ### 📚 Ce que j'ai appris

  #### 1. Pourquoi tester ?
  - Les tests permettent de rendre le code plus sûr et maintenable dans le temps, ils viennent encadrer des cas concrets et s'assurent du bon fonctionnement du code.
  - Sans tests, le risque est que certaines parties n'est pas le comportement attendu, notamment dans les cas limites. Et que des bugs surviennent de façon imprévue en production.
  - Exemple concret : lors d'une de mes précédentes expériences pro, nous avions imposé un coverage à 100% du code métier. Donc par exemple, nous avions certaines fonction qui jetaient
des exceptions en cas d'erreur, dans nos tests, nous nous assurions que les bonnes exceptions étaient levées avec les bons cas d'erreurs. Comme ceci la gestion d'erreur était robuste et nous pouvions ajouter des nouvelles fonctions avec plus d'assurance.

  #### 2. Outils utilisés
  - **Jasmine** : Jasmine est un framework javascript qui permet l'écriture de test de façon simple.
  - **Karma** : Karma est le runner pour les tests, il lance un navigateur (chrome) afin d'exécuter les tests.
  - **TestBed** : TestBed permet de tester les composants et leur template.

  #### 3. Concepts clés maîtrisés
  - **AAA Pattern** : Arrange, Act, Assert
  - **Mocks** : Cela permet de simuler une class sans devoir instancier la vraie, ce qui permet d'isoler uniquement le composant et de construire des tests plus rapides, tout en décidant ce que le mock doit faire.
  - **Spies** : Cela permet d'espionner une fonction ou une méthode en contrôlant combien de fois, elle a été appelée et comment, puis de simuler son retour. 
  - **Fixture & detectChanges()** : les fixtures sont la représentation d'un composant avec son DOM et ses méthodes de tests, et le detectChanges va forcer Angular à mettre à jour le template après une modification.

  #### 4. Types de tests pratiqués
  - ✅ Test d'une classe simple (sans Angular)
  - ✅ Test d'un service
  - ✅ Test d'un composant avec TestBed
  - ✅ Test des @Input
  - ✅ Test des @Output
  - ✅ Test du DOM

  #### 5. Erreurs courantes rencontrées
  - Oublier `detectChanges()` : La valeur dans le template n'est pas mise à jour et le expect failed.
  - `No provider for...` : Cela veut dire qu'il manque le provider, il faut dans le beforeEach dans la methode de configuration ajouter avec la clefs providers les providers manquants pour le bon fonctionnement du test.
  - Tests qui dépendent les uns des autres : Il faut simplifier les tests en testant des cas uniques avec des fonctionnalités uniques.

  #### 6. Commandes importantes
  ```bash
  ng test                    # Lancer les tests
  ng test --code-coverage    # Avec rapport de couverture
  ng test --include='**/*.specs.ts' # Avec des tests spécifiques
  ```

  #### 7. Code Coverage atteint
  - Objectif : 70-80%
  - Mon résultat : **75%** sur TaskBoard Pro

  #### 8. Difficultés rencontrées et solutions
  | Difficulté | Solution trouvée |
  | no provider found | Ajout du provider manquant |
  | valeur récupérée du DOM mauvaise | mise à jour du test en sélectionnant le bon attribut css |

  #### 9. Points à approfondir
  - [ ] Tests d'intégration
  - [ ] Tests E2E avec Cypress
  - [ ] Mocking avancé pour HttpClient
  - [ ] Tests de services asynchrones

  ### 🎯 Projet : Tests TaskBoard Pro

  #### Tests implémentés
  - [x] TaskService
  - ✅ `addTask()`
  - ✅ `deleteTask()`
  - ✅ `getTasks()`
  - ✅ `editTask()`
  - [x] TaskHighlight Component
  - ✅ Affichage du titre
  - ✅ @Input title
  - ✅ Rendu dans le DOM
  - [x] TaskPage Component
  - ✅ Créer une tâche
  - ✅ Supprimer une tâche
  - [x] TaskEdit Component
  - ✅ Output du nouveau label

  #### Résultats
  - **Tests réussis** : 20 / 20
  - **Code coverage** : 75%
  - **Temps d'exécution** : 0.125 seconde

  ### 💡 Réflexion personnelle
  Même si je connaissais déjà les tests unitaires, pouvoir les revoir en détails sur le projet est quand même un bon rappel, surtout pour la syntaxe et le nom des différentes méthodes.
  Le rappel du coverage est aussi une bonne chose, car cela permet de venir auditer l'ensemble du code et de voir les endroits où il manque des tests.
  Je vais garder cette séquence en mémoire et j'essaierai en entreprise d'implémenter certain test quand je développerai de nouvelle functionality.

  ### 📚 Ressources consultées
  - [Angular Testing Guide](https://angular.io/guide/testing)
  - [Jasmine Documentation](https://jasmine.github.io/)
  - [Notes de cours - Séquence 4]

