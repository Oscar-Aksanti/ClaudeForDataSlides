# Maîtrisez l'Analyse des Données avec Claude

Support de présentation interactif de la formation professionnelle de 5 jours
"Maîtrisez l'Analyse des Données avec Claude" (Formations4data / Eurêka Services).

Application Next.js statique, sans backend ni base de données — le contenu est piloté
par les fichiers JSON de `/content`.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

```
/app                    routes de présentation (/jour/[day]/[slide]), accueil, impression
/components/slides      les 15 composants de slide de la bibliothèque (brief section 7)
/components/deck        orchestrateur du deck (clavier, clic, swipe, transitions)
/components/ui          briques UI partagées (barre de progression, palette de commande…)
/content                jour-1.json … jour-5.json — tout le texte des slides, sans exception
/lib/types.ts           schéma TypeScript discriminé par `type` de slide
/lib/slide-registry.tsx mapping type → composant
```

## Ajouter ou modifier une slide

Éditer le fichier `content/jour-N.json` correspondant — aucune modification de code
n'est nécessaire pour ajouter, retirer ou réordonner une slide. Le champ `type` doit
correspondre à un des 15 types définis dans `lib/types.ts`.

## Navigation

- Flèches ← → : slide précédente / suivante (passe au jour suivant en fin de liste)
- Échap ou Ctrl/⌘+K : plan de navigation avec recherche
- P : notes du présentateur (masquables)
- F : plein écran
- Clic gauche/droite de l'écran, ou swipe sur mobile

Sous 768px de largeur, le deck bascule automatiquement en mode lecture (slides
empilées, défilement vertical) — même URL, même contenu.

## Déploiement

1. Pousser ce dépôt sur GitHub
2. Importer le dépôt sur [vercel.com/new](https://vercel.com/new)
3. Aucune variable d'environnement requise — déploiement immédiat
