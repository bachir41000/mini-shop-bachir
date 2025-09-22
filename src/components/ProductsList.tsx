import { useState, useEffect, useMemo } from "react";
import ProductsFilters from "./ProductsFilters";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Product } from "../types/product";
import { loadProducts } from "../utils/storage";
import { formatCurrency } from "../utils/currency";

function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [debounced, setDebounced] = useState("");
  const { t,i18n } = useTranslation();

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(search), 250);
    return () => clearTimeout(id);
  }, [search]);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const byName = products.filter((p) =>
      p.name.toLowerCase().includes(debounced.toLowerCase())
    );
    const byCategory =
      category === "all" ? byName : byName.filter((p) => p.category === category);
    const sorted = [...byCategory].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
    return sorted;
  }, [products, debounced, category, sortOrder]);

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
            <Link to={`/product/${p.id}`}>{p.name}</Link> - {formatCurrency(p.price, i18n.language)} -{" "}
            {p.stock === 0 ? t("outOfStock") : t("inStock", { count: p.stock })} -{" "}
            <Link to={`/product/${p.id}/edit`}>{t("edit")}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductsList;
