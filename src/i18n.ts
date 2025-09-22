import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLang = localStorage.getItem("lang") || "fr";

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: {
        catalogue: "Catalogue",
        backToCatalogue: "Retour au catalogue",
        searchByName: "Rechercher par nom",
        allCategories: "Toutes les catégories",
        ascendingPrice: "Prix croissant",
        decreasingPrice: "Prix décroissant",
        edit: "Modifier",
        save: "Enregistrer",
        cancel: "Annuler",
        category: "Catégorie",
        price: "Prix",
        stock: "Stock",
        inStock: "{{count}} en stock",
        outOfStock: "Rupture de stock",
        filterByCategory: "Filtrer par catégorie",
        sortByPrice: "Trier par prix",
        language: "Langue",
        saved: "Modifications enregistrées",
        errors: {
          pricePositive: "Le prix doit être positif",
          stockPositive: "Le stock doit être positif",
          productNotFound: "Produit Introuvable",
          stockInteger: "Le stock doit être un entier"
        },
      },
    },
    en: {
      translation: {
        catalogue: "Catalog",
        backToCatalogue: "Back to catalog",
        searchByName: "Search by name",
        allCategories: "All categories",
        ascendingPrice: "Ascending Price",
        decreasingPrice: "Decreasing Price",
        edit: "Edit",
        save: "Save",
        cancel: "Cancel",
        category: "Category",
        price: "Price",
        stock: "Stock",
        inStock: "{{count}} in stock",
        outOfStock: "Out of stock",
        filterByCategory: "Filter by category",
        sortByPrice: "Sort by price",
        language: "Language",
        saved: "Changes saved",
        errors: {
          pricePositive: "Price must be positive",
          stockPositive: "Stock must be positive",
          productNotFound: "Product not found",
          stockInteger: "Stock must be an integer"
        },
      },
    },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
