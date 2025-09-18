import { Routes, Route } from "react-router-dom";
import ProductsList from "./components/ProductsList";
import ProductsDetail from "./components/ProductsDetail";
import ProductsEdit from "./components/ProductsEdit";
import { useTranslation } from "react-i18next";


export default function App() {
  const { i18n } = useTranslation();
  const handleChangeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };
  return (
    <div>
      <select
          value={i18n.language}
          onChange={(e) => handleChangeLang(e.target.value)}
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
