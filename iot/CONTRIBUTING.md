# Fonctionnement

## Labels

- `Type/Amélioration`: Issue/PR lié à une amélioration d'une fonctionalité
- `Type/Bug`: Issue/PR lié à un bug présent dans le logiciel a corriger
- `Type/Documentation`: Issue/PR lié à un changement dans la documentation technique et/ou le design UI/UX
- `Type/Fonctionnalité`: Issue/PR lié à une nouvelle fonctionnalité
- `Type/Sécurité`: Issue/PR lié a la sécurité du logiciel
- `Type/Tests`: Issue/PR lié a des tests

- `Status/Besoin d'infos`: Feedback nécessaire pour avancer
- `Status/Bloqué`: Issue/PR bloqué par quelque chose

- `Tech/Logiciel`: issue ou PR qui est liée a du logiciel (Code)
- `Tech/Mécatronique`:Issue qui est dans le hard (Éléctronique, Mécanique)

- `Priorité/Critique`: issue critique dans l'usage du logiciel
- `Priorité/Haute`: issue importante
- `Priorité/Moyenne`: issue moyenement importante
- `Priorité/Basse`: Issue non/peu importante

- `Revue/Confirmé`: Issue validé qui est à faire
- `Revue/Dupliqué`: Issue fermé car elle est déjà éxistante
- `Revue/Invalide`: Issue invalide (raison en commentaire)
- `Revue/Non Corrigable`: Issue non corrigable (raison en commentaire)

## Workflow d'un issue

- Ajout d'une issue
- trie selon le type de l'issue avec les labels
- Affectassion a un milestone si possible
- travail sur l'issue
- fermeture de l'issue avec une liaison avec un commit/PR si relié

## Branches/Tags

_Basé sur `Git Flow` mais en plus simplifié_

- `branch/master`: Branche principal qui contient le code mergé final et fonctionnel
- `branch/blablabla`: Branche liée a une **Pull Request** qui contient du code non stable selon l'avancement
- `tags/*.*.*`: Chaque tag est sa version et doit Respecter le format `semver` alias `MAJOR.MINOR.PATCH` toute les versions en dessous de `1.0.0` seront considéré comme non-stable

## Commits/PR

_basé sur `Conventional Commits` mais en plus simplifié_

Globalement c'est recommendé d'utiliser sa pour **TOUT** les commits _mais_ au minimum a utiliser pour nommer la **PR** pour garder la branche principal clean

architecture: `prefix: description`
trois partis pour un commit/pr:
- prefix
  - `feat`: grosso modo c'est le label `fonctionnalité`
  - `fix`: c'est le label `bug` ou un amélioration de perfs
  - `docs`: Changement au niveau de la documentation technique
  - `chore`: Changement autre (dépendances, CI/CD)
- `description`: texte en anglais commencant par un verbe indiquant ce qui a été fait (ex: `allow`,`send`, `change`, etc)
