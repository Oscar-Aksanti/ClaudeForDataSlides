# BRIEF POUR CLAUDE CODE
## Application web interactive — "Maîtrisez l'Analyse des Données avec Claude"

---

## 0. LE PROMPT À COLLER DANS CLAUDE CODE

Copie-colle exactement ce bloc comme premier message dans Claude Code, dans le dossier de ton projet vide :

```
Lis entièrement le fichier BRIEF.md à la racine de ce projet avant d'écrire une seule
ligne de code. C'est la spécification complète d'une application web que tu dois
construire : le support de présentation interactif d'une formation professionnelle
de 5 jours sur l'analyse de données avec Claude.

Tu es un développeur front-end senior ET un designer UI/UX senior. Le brief contient
un design system complet (couleurs, typographies, composants) que tu dois suivre
au token près — n'improvise pas de nouvelles couleurs ou polices.

Contraintes non-négociables :
- Contenu piloté par des fichiers de données (JSON), pas de texte codé en dur dans les composants
- Chaque slide est un composant réutilisable, pas une page unique écrite à la main
- Navigation clavier + clic + URL profonde (chaque slide a sa propre URL)
- Animations d'entrée soignées, sobres, jamais gratuites — respecter prefers-reduced-motion
- Responsive : utilisable sur mobile en lecture, optimisé pour la présentation sur grand écran
- Déployable directement sur Vercel depuis GitHub, sans backend ni base de données

Commence par : (1) me proposer la structure de dossiers, (2) construire le design
system en tokens CSS/Tailwind, (3) construire les composants de slides un par un en
suivant la bibliothèque décrite dans le brief, (4) migrer le contenu du Jour 1 fourni
dans /content, (5) scaffolder la structure vide des Jours 2 à 5 pour qu'on les remplisse
ensuite. Montre-moi ton plan avant de commencer à écrire du code.
```

---

## 1. CONTEXTE DU PROJET

Formation professionnelle de 5 jours, "Maîtrisez l'Analyse des Données avec Claude", donnée par Oscar Aksanti (formations4data / Eurêka Services) à des apprenants francophones d'Afrique, du 13 au 17 juillet 2026. Format : vidéo YouTube quotidienne (1h30–2h) suivie d'un live Teams le soir.

**Ce qu'on construit :** pas un PowerPoint. Une vraie application web qui contient l'intégralité des slides des 5 jours, pensée comme un produit — navigable, interactive, mémorable, que les apprenants pourront eux-mêmes revisiter après la formation comme ressource.

**Ce que ce n'est PAS :** pas un site marketing pour vendre la formation, pas un LMS avec comptes utilisateurs. C'est uniquement le support de présentation, en version web interactive.

---

## 2. OBJECTIF PRODUIT EN UNE PHRASE

Une application de slides que le formateur pilote en live pendant l'enregistrement vidéo, où chaque idée a son propre moment visuel, où on navigue aussi bien au clavier qu'en cliquant sur un plan de la formation, et qui ne ressemble à aucun template de présentation générique.

---

## 3. STACK TECHNIQUE RECOMMANDÉE

- **Framework :** Next.js (App Router) — pour le routing par URL de chaque slide et un déploiement Vercel natif en un clic
- **Styling :** Tailwind CSS, configuré avec les tokens du design system ci-dessous (pas de couleurs/tailles arbitraires hors config)
- **Animation :** Framer Motion pour les transitions de slides et les animations d'entrée des éléments
- **Contenu :** fichiers JSON dans `/content`, un fichier par jour, typés en TypeScript (voir section 6)
- **Icônes :** lucide-react (cohérent avec les schémas déjà utilisés, pas d'émojis en production)
- **Déploiement :** GitHub → Vercel, zéro variable d'environnement, zéro backend

Si tu (Claude Code) juges qu'un autre stack est objectivement meilleur pour ces contraintes précises, propose-le et justifie — mais Next.js + Tailwind + Framer Motion est le choix par défaut attendu.

---

## 4. DESIGN SYSTEM — À SUIVRE AU TOKEN PRÈS

### Couleurs
```
--ink:          #121821   /* fond sombre, texte principal */
--ink-soft:     #1B232E   /* variante fond sombre */
--fog:          #EEF1F0   /* fond clair */
--fog-dim:      #DFE4E2   /* bordures sur fond clair */
--signal:       #D97757   /* accent principal — terracotta Claude */
--signal-bright:#F0A48D   /* variante claire du signal, fonds sombres */
--spark:        #F2A93B   /* accent secondaire — ambre */
--slate:        #5B6472   /* texte secondaire */
--white:        #FFFFFF
```

### Typographie
- **Titres :** Space Grotesk (500/600/700)
- **Corps de texte :** Plus Jakarta Sans (400/500/600/700)
- **Code, prompts, données, labels techniques :** IBM Plex Mono (400/500)

### Principes de design (hérités des maquettes déjà validées)
- Fond clair (`--fog`) pour les slides de contenu pédagogique, fond sombre (`--ink`) réservé aux moments démo/code et aux slides de transition majeures (cover, clôture)
- Cartes à coins arrondis (12–16px), bordures fines `--fog-dim`, jamais d'ombre lourde
- L'accent `--signal` est réservé aux éléments qui comptent vraiment (élément actif, mise en évidence) — ne jamais le diluer en décoration
- Repère de marque permanent, discret, en bas à gauche de chaque slide (nom de la formation + jour courant)
- Une barre de progression des 5 jours, réutilisée comme composant, visible sur les slides de transition de jour

### Fichiers de référence à consulter
Les fichiers suivants (déjà produits) contiennent des maquettes HTML validées du design system — Claude Code doit les inspecter avant de coder les composants, et en extraire fidèlement les patterns visuels (pas juste s'en inspirer vaguement) :
- `charte-graphique-demo.html`
- `Jour-1-Slides.html`

---

## 5. LA VRAIE CONTRAINTE DE FOND : LE RYTHME DES SLIDES

**Ne fige pas un nombre de slides.** Le problème n'est pas "30 slides ou 60 slides", c'est le temps d'affichage par slide. Règle à appliquer systématiquement en construisant le contenu :

- **Une idée = une slide.** Si un chapitre couvre 4 points, ce sont 4 slides successives (avec transition), pas une slide à 4 puces qui reste affichée 6 minutes.
- **Les sections de démo à l'écran** (là où le formateur montre Claude en direct) n'ont besoin que d'une slide de repère (titre + contexte), pas d'un pavé de slides — l'écran de démo prend le relais visuellement.
- **Cible réaliste :** pour une session de 2h, viser 25 à 35 slides selon le contenu, jamais un chiffre arbitraire fixé à l'avance.

Le système de contenu (section 6) doit donc rendre **trivial** l'ajout ou la suppression d'une slide sans toucher au code des composants.

---

## 6. MODÈLE DE CONTENU (JSON piloté)

Chaque jour est un fichier `/content/jour-N.json` avec cette structure :

```json
{
  "day": 1,
  "title": "Découverte complète de l'écosystème Claude",
  "date": "2026-07-13",
  "slides": [
    {
      "id": "cover",
      "type": "cover",
      "eyebrow": "Jour 01 · Formations4data",
      "title": ["Découverte complète de", "l'écosystème Claude"],
      "highlight": "l'écosystème Claude",
      "subtitle": "...",
      "meta": "MAÎTRISEZ L'ANALYSE DES DONNÉES AVEC CLAUDE"
    },
    {
      "id": "principes-prompt",
      "type": "principle-list",
      "eyebrow": "Chapitre 5",
      "title": "Les 4 principes d'un bon prompt d'analyse",
      "lead": "...",
      "items": [
        { "num": "01", "title": "...", "detail": "..." }
      ]
    }
  ]
}
```

**Chaque `type` correspond à un composant de la bibliothèque (section 7).** Claude Code doit définir un type TypeScript discriminé par `type` pour chaque schéma de slide, afin que l'ajout de contenu soit sûr et auto-complété dans l'éditeur.

---

## 7. BIBLIOTHÈQUE DE COMPOSANTS DE SLIDES À CONSTRUIRE

| Type | Usage | Éléments dynamiques |
|---|---|---|
| `cover` | Ouverture de session / clôture | Titre animé lettre par lettre ou mot par mot à l'entrée |
| `speaker-intro` | Présentation du formateur | Photo, stats animées (compteur qui monte : 20 000+) |
| `day-map` | Vue d'ensemble des 5 jours | Barre de progression, ligne active surlignée au survol |
| `principle-list` | Liste de principes/méthode (contenu dense) | Cartes qui apparaissent en cascade (stagger) |
| `comparison` | Comparatif 2 colonnes (Claude vs autre) | Colonne "gagnante" avec léger effet de mise en avant |
| `ecosystem-grid` | Grille d'éléments (écosystème Claude) | Grille qui apparaît en cascade, hover = détail |
| `decision-table` | Tableau "je veux X → j'utilise Y" | Lignes qui se surlignent au survol |
| `workflow-flow` | Schéma séquentiel avec flèches | Ligne qui se dessine (animation de tracé SVG) entre les nœuds |
| `before-after` | Comparaison avant/après données | Transition animée avant → après au clic |
| `data-table` | Tableau de données avec alertes | Lignes critiques qui pulsent légèrement une fois à l'entrée |
| `code-card` | Prompt/code façon éditeur | Texte qui s'affiche en effet machine à écrire, bouton copier fonctionnel |
| `agent-boxes` | Concepts côte à côte (Agents/MCP) | Cartes qui se retournent (flip) ou glissent à l'entrée |
| `step-list` | Étapes numérotées (publication) | Numéros qui se remplissent progressivement |
| `deliverable-checklist` | Livrables à rendre | Cases cochables interactivement (état visuel seulement, pas de sauvegarde nécessaire) |
| `quote-stat` | Chiffre clé mis en avant | Chiffre qui s'anime en comptant jusqu'à la valeur finale |

**Chaque composant doit être fait pour être réutilisé sur les 5 jours**, pas seulement pour le Jour 1.

---

## 8. NAVIGATION ET INTERACTIVITÉ

- **Clavier :** flèches gauche/droite pour naviguer, `Échap` pour ouvrir le plan de navigation, `F` pour plein écran
- **Souris/tactile :** zones de clic gauche/droite, swipe sur mobile
- **URL profonde :** chaque slide a sa propre route, ex. `/jour-1/12` — permet de reprendre exactement où on s'est arrêté, ou de partager un lien vers une slide précise
- **Plan de navigation global :** un panneau (accessible via une icône ou `Échap`) qui liste les 5 jours et permet de sauter directement à n'importe quelle slide de n'importe quel jour, avec recherche texte simple
- **Mode présentateur (optionnel mais fortement souhaité) :** un second panneau, masquable, affichant les notes de script correspondant à la slide active (le texte du script de formation), pour que le formateur puisse lire ses repères sans changer de fenêtre
- **Barre de progression du jour en cours** toujours visible discrètement (pas juste des points de navigation)

---

## 9. ANIMATIONS — PRINCES ET LIMITES

- Animation d'entrée systématique mais sobre : léger déplacement + fondu (translateY 12px + opacity), jamais de zoom/rotation exagérée
- Un seul élément "signature" animé de façon plus marquée par slide au maximum (ex : le tracé SVG du schéma workflow, le compteur de stats) — ne pas tout faire bouger en même temps
- `prefers-reduced-motion: reduce` doit désactiver toutes les animations non essentielles
- Transition entre slides : glissement horizontal fluide (250–400ms), cohérent sur toute l'application
- Aucune animation ne doit bloquer la lecture — si le formateur avance vite au clavier, les animations en cours doivent s'interrompre proprement, pas s'empiler

---

## 10. STRUCTURE DE PROJET ATTENDUE

```
/app
  /jour/[day]/[slide]/page.tsx      → route de présentation
  /page.tsx                          → page d'accueil (plan des 5 jours)
/components
  /slides/                           → un fichier par type de slide (section 7)
  /ui/                                → boutons, badges, barre de progression, etc.
/content
  jour-1.json
  jour-2.json  (structure vide, à remplir)
  jour-3.json  (structure vide, à remplir)
  jour-4.json  (structure vide, à remplir)
  jour-5.json  (structure vide, à remplir)
/lib
  types.ts                           → types TypeScript des schémas de slides
  slide-registry.ts                  → mapping type → composant
/styles
  globals.css / tailwind.config.ts   → tokens du design system
```

---

## 11. CONTENU SOURCE À MIGRER (JOUR 1)

Le contenu complet du Jour 1 — script de formation détaillé, chapitrage minute par minute, et exemples concrets (cas des centres de santé) — existe déjà dans le fichier `Jour-1-Script-Complet.md` fourni dans ce projet. Claude Code doit :
1. Lire ce fichier en entier
2. En extraire la structure en slides individuelles selon la règle de la section 5 (une idée = une slide)
3. Produire le `content/jour-1.json` correspondant, avec le texte du script associé à chaque slide (pour le mode présentateur)

Le plan global des 5 jours (objectifs, livrables, contenu prévu pour chaque jour) existe dans `Programme-Complet-Formation-Claude-Data-13-17-Juillet.md`. Utilise-le pour scaffolder la structure (titres de sections, nombre approximatif de slides) des jours 2 à 5, même si le contenu détaillé n'est pas encore rédigé — je le remplirai progressivement.

---

## 12. CE QU'IL NE FAUT PAS FAIRE

- Ne pas utiliser de texte "lorem ipsum" ou d'exemples génériques — tout le contenu placeholder doit être clairement marqué `// TODO: contenu Jour X à rédiger`, pas inventé
- Ne pas insérer de vraies photos trouvées sur internet — utiliser des zones réservées clairement identifiées ("emplacement photo formateur")
- Ne pas dévier du design system de la section 4 sans le signaler explicitement et demander validation
- Ne pas construire un système avec compte utilisateur, authentification, ou base de données — ce n'est pas un LMS
- Ne pas figer un nombre de slides arbitraire — laisser le contenu dicter le nombre, selon la règle de la section 5

---

## 13. DÉFINITION DU "TERMINÉ" POUR LA PREMIÈRE LIVRAISON

- [ ] Design system en place (tokens Tailwind, polices chargées)
- [ ] Tous les composants de la section 7 construits et fonctionnels avec des données de test
- [ ] Navigation clavier + clic + URL profonde opérationnelle
- [ ] Contenu du Jour 1 entièrement migré et navigable de bout en bout
- [ ] Structure vide des Jours 2 à 5 en place (scaffoldée, prête à être remplie)
- [ ] Mode présentateur (notes de script) fonctionnel au moins pour le Jour 1
- [ ] Déployé et accessible via un lien Vercel
- [ ] Responsive testé sur mobile (lecture) et desktop (présentation)
