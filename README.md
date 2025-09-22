# Mini Shop - Bachir

## Setup
1. Cloner le projet  
   ```bash
   git clone <repo-url>
   cd mini-shop-bachir
   ```
2. Installer les dépendances  
   ```bash
   npm install
   ```
3. Lancer le projet en mode développement  
   ```bash
   npm run dev
   ```
4. Lancer les tests  
   ```bash
   npm run test
   ```

---

## Scripts
- `npm run dev` : démarre le serveur de développement Vite  
- `npm run test` : lance les tests unitaires et d’intégration (Vitest + Testing Library)  
- `npm run lint` : vérifie la qualité du code avec ESLint

---

## Choix techniques
- **Vite** choisi pour sa rapidité et sa simplicité c'était l'idée pour ce projet. 
- **React Router** pour la navigation entre liste, détail et édition des produits.  
- **i18next** pour la gestion des langues (FR/EN).  
- **localStorage** pour simuler une base de données simple et garder les modifications.  
- **Testing Library + Vitest** pour tester les interractions des utilisateurs et la logique métier.  
- **jest-axe** pour un test d’accessibilité automatisé (bonus).

---

## Limites
- Pas de gestionnaire d’état global car inutile pour un petit projet mais nécessaire en réel.  
- Pas de design system : les composants sont écrits simplement mais dans un vrai projet je créerais une librairie de composants UI réutilisables ou alors j'utiliserai une librairie externe comme Chakra UI ou autres.
- Pas d’API distante : les données sont simulées avec un JSON et `localStorage`.  
- Le style est minimaliste (manque un CSS framework).

---

## Temps passé
Environ **5 heures** pour l'implémentation, tests, i18n, ajustements... .  

---

## Architecture

```
src/
  components/
    ProductsList.tsx       # liste
    ProductsFilters.tsx    # recherche / catégorie / tri
    ProductsDetail.tsx     # page détail
    ProductsEdit.tsx       # page édition
    ProductsForm.tsx       # formulaire prix/stock + validations
  utils/
    storage.ts             # localStorage + fallback JSON
    currency.ts            # format monétaire + symbole par langue
  types/
    product.ts             # type Product centralisé
  jsondata/
    products.json          # fichier de donnée json
  i18n.ts                  # config i18next
  App.tsx                  # routes + sélecteur de langue
```
