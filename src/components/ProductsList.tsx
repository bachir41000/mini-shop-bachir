import { useState, useEffect } from "react";
import productsData from "../jsondata/products.json";
import ProductsFilters from "./ProductsFilters";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { t } = useTranslation();

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(productsData);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category === "all" ? true : p.category === category))
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  return (
    <section>
      <h1>{t("catalogue")}</h1>

      <ProductsFilters
        search={search}
        onSearch={setSearch}
        category={category}
        onCategory={setCategory}
        sortOrder={sortOrder}
        onSortOrder={setSortOrder}
        categories={categories}
      />

      <ul>
        {filteredProducts.map((p) => (
          <li key={p.id}>
            <Link to={`/product/${p.id}`}>{p.name}</Link> - {p.price}€ -{" "}
            {p.stock === 0 ? t("outOfStock") : t("inStock", { count: p.stock })} -{" "}
            <Link to={`/product/${p.id}/edit`}>{t("edit")}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductsList;
