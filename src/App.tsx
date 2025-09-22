import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductsList from "./components/ProductsList";
import ProductsDetail from "./components/ProductsDetail";
import ProductsEdit from "./components/ProductsEdit";

export default function App() {
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved);
    }
  }, [i18n]);

  return (
    <div>
      <label htmlFor="lang-select" style={{ marginRight: 8 }}>
        {t("language")}
      </label>
      <select
        id="lang-select"
        aria-label={t("language")}
        value={i18n.language}
        onChange={(e) => {
          i18n.changeLanguage(e.target.value);
          localStorage.setItem("lang", e.target.value);
        }}
      >
        <option value="fr">FR</option>
        <option value="en">EN</option>
      </select>

      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/product/:id" element={<ProductsDetail />} />
        <Route path="/product/:id/edit" element={<ProductsEdit />} />
      </Routes>
    </div>
  );
}
