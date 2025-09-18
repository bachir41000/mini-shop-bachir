import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import productsData from "../jsondata/products.json";
import { useTranslation } from "react-i18next";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
};

function ProductsEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const saved = localStorage.getItem("products");
  const products: Product[] = saved ? JSON.parse(saved) : productsData;

  const product = products.find((p) => p.id === id);
  const [price, setPrice] = useState(product?.price ?? 0);
  const [stock, setStock] = useState(product?.stock ?? 0);
  const [errors, setErrors] = useState<{ price?: string; stock?: string }>({});
  const { t } = useTranslation();

  if (!product) {
    return <p>{t("errors.productNotFound")}</p>;
  }

  const validate = () => {
    const newErrors: { price?: string; stock?: string } = {};
    if (price < 0) newErrors.price = t("errors.pricePositive");
    if (stock < 0) newErrors.stock = t("errors.stockPositive");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const updated = products.map((p) =>
      p.id === id ? { ...p, price, stock } : p
    );
    localStorage.setItem("products", JSON.stringify(updated));
    navigate("/");
  };
  

  return (
    <section>
      <h1>{t("edit")} {product.name}</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div>
          <label>
            {t("price")} :
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </label>
          {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
        </div>

        <div>
          <label>
            {t("stock")} :
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </label>
          {errors.stock && <p style={{ color: "red" }}>{errors.stock}</p>}
        </div>

        <button type="submit">{t("save")}</button>
      </form>

      <Link to={`/product/${id}`}>{t("cancel")}</Link>
    </section>
  );
}

export default ProductsEdit;
