# Jour 3 — Coding : SQL, Python, R

## Comparer un mois au précédent avec LAG

*Chapitre 1*

```
-- Demande à Claude :
"Écris une requête qui calcule la variation du montant en retard
(colonne montant_retard) par rapport au mois précédent, pour chaque agence.
Utilise LAG() et explique la clause OVER."
```

## Dédoublonner avec ROW_NUMBER

*Chapitre 1*

```
-- Demande à Claude :
"J'ai des doublons dans ma table prêts (même id_pret plusieurs fois).
Écris une requête qui garde une seule ligne par id_pret
(la plus récente selon date_maj), avec ROW_NUMBER et un CTE."
```

## Faire expliquer une requête qu'on ne comprend pas

*Chapitre 1*

```
Voici une requête que je ne comprends pas entièrement :
[coller la requête]

Explique-la clause par clause, dans l'ordre d'exécution réel
(pas l'ordre d'écriture). Signale si une clause te semble risquée.
```

## La requête PAR30 par agence

*Chapitre 2 — Le cas du jour*

```
-- Demande à Claude :
"Écris une requête qui calcule le PAR30 par agence :
montant total en retard de plus de 30 jours divisé par montant total du portefeuille.
Table prets (agence, montant, jours_retard). Explique chaque partie."
```

## Regrouper et agréger avec pandas

*Chapitre 3*

```
Sur mon dataframe prets (colonnes : agence, montant, jours_retard),
écris le code pandas qui calcule le PAR30 par agence,
la même métrique que ce matin en SQL. Utilise .loc, pas d'indexation chaînée.
```

## Un premier graphique avec seaborn

*Chapitre 3*

```
Trace un graphique en barres du PAR30 par agence avec seaborn,
en utilisant une palette adaptée au daltonisme (viridis ou équivalent),
et trie les agences de la plus risquée à la moins risquée.
```

## Statistiques descriptives en R

*Chapitre 4*

```
Sur mon dataframe prets (colonnes : agence, montant, jours_retard),
écris le code R qui donne moyenne, médiane et écart-type de jours_retard
par agence, avec dplyr. Explique chaque fonction utilisée.
```

## Un test statistique simple, expliqué

*Chapitre 4*

```
Je veux savoir si le retard moyen diffère significativement entre les agences
de Goma et Bukavu. Écris un test t en R et explique en une phrase
ce que signifie le résultat, sans jargon statistique.
```

## Trouve l'erreur glissée dans ce code

*Chapitre 6 — Exercice*

```
par30 = prets[prets.jours_retard > 30]
taux = len(par30) / len(prets) * 100
print(f"PAR30 : {taux}%")

# Le calcul du PAR30 utilise normalement le montant
# en retard, pas le nombre de prêts en retard.
```

## Importer et typer correctement

*Chapitre 7 — Le cas du jour*

```
Importe prets.csv avec pandas.
Vérifie que jours_retard et montant sont bien de type numérique,
pas du texte. Signale toute valeur manquante avant de continuer.
```

## Recalculer le PAR30 et vérifier contre le SQL du matin

*Chapitre 7 — Le cas du jour*

```
Calcule le PAR30 par agence avec pandas (même définition que ce matin :
montant en retard >30j / montant total). Compare ton résultat au tableau
SQL du matin : [coller les chiffres SQL]. Signale tout écart.
```

