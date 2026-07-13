# Jour 2 — Excel & Power BI boostés par Claude

## Le prompt de nettoyage type

*Chapitre 1*

```
Tu es un data analyst senior.
Voici un extrait de mon fichier (colonnes : centre, date, region, montant).

1. Identifie les doublons, valeurs manquantes et formats incohérents.
2. Propose une version corrigée, colonne par colonne.
3. Explique chaque correction en une phrase, sans jargon technique.

Réponds en français, dans un tableau clair.
```

## SI imbriqués et SOMME.SI.ENS, expliqués simplement

*Chapitre 1*

```
J'ai une colonne taux_rupture. Écris-moi une formule qui affiche :
"Critique" si le taux dépasse 20%,
"À surveiller" s'il est entre 10% et 20%,
"OK" sinon.

Explique chaque partie de la formule en une ligne, comme si je ne connaissais pas encore SI.
```

## Le prompt de nettoyage pour ce cas précis

*Chapitre 2 — Le cas du jour*

```
Tu es un data analyst senior spécialisé en programmes humanitaires.
Voici mon fichier de suivi (colonnes : id_menage, region, montant, statut).

1. Identifie les doublons d'ID ménage.
2. Repère les montants qui dépassent 2x la médiane de la région.
3. Uniformise l'orthographe des régions.
4. Explique chaque anomalie en une phrase, pour un responsable programme non-technique.
```

## La synthèse exécutive en 3 phrases

*Chapitre 2 — Le cas du jour*

```
À partir de ce tableau croisé, rédige une synthèse de 3 phrases maximum pour la direction :
1. Ce qui fonctionne bien.
2. Le point d'attention principal.
3. Une recommandation concrète et actionnable.

Langage business, zéro terme technique.
```

## Une première mesure DAX, expliquée

*Chapitre 3*

```
Écris une mesure DAX qui calcule le montant total transféré par région,
filtré sur les paiements au statut "Payé".

Explique la mesure ligne par ligne, comme si j'apprenais DAX pour la première fois.
```

## Personnaliser le dashboard avec Claude

*Chapitre 4 — Le cas du jour*

```
J'aimerais que le dashboard utilise ces couleurs : [tes couleurs, en gardant un bon contraste].
Peux-tu adapter le design en gardant la structure des 3 visuels, et vérifier que les couleurs restent lisibles pour une personne daltonienne ?
```

## Le rapport décisionnel qui accompagne le dashboard

*Chapitre 4 — Le cas du jour*

```
Rédige le rapport qui accompagne ce dashboard, en une page :
1. Contexte du programme, en 2 phrases.
2. Ce que montrent les 3 visuels.
3. Une recommandation pour le responsable programme.

Langage business, aucune référence technique à Power BI ou DAX.
```

