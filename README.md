# Mini Shop – Bachir

## Installation

### 1. Prérequis
- **Node.js 20+** (Vite ne fonctionne pas avec les versions antérrieur de Node).  
- **npm** (ou yarn ou pnpm mais le projet est configuré avec npm).  

### 2. Installation des dépendances
```bash
npm install
```

### 3. Lancer l’application
```bash
npm run dev
```
Par défaut l’application sera disponible sur [http://localhost:5173](http://localhost:5173).

---

## Lancer les tests

Les tests sont écrits avec **Vitest** et **Testing Library**.

```bash
npm run test
```

### Couverture fonctionnelle
- `ProductList.test.tsx` → affichage, recherche, filtres, tri.  
- `ProductsEdit.test.tsx` → formulaire pré-rempli, validation et mise à jour.  
- `i18n.test.tsx` → vérification de l’internationalisation.  
- `App.test.tsx` → navigation catalogue, édition, retour.  
- `ProductsDetail.test.tsx` → affichage d’un produit + gestion produit introuvable.  

---

## Choix techniques

- **React + Vite + TypeScript** → plus rapide, typage sûr.  
- **React Router** → gestion des pages et navigation.  
- **i18next / react-i18next** → internationalisation FR/EN.  
- **localStorage** → persistance simple côté front.  
- **Vitest + Testing Library** → natif à Vite.  

---

## Améliorations possibles
- Centraliser l’état avec **React Context** au lieu de `localStorage`.  
- Améliorer le **design** avec TailwindCSS ou un autre.
- Améliorer l'UX. 
