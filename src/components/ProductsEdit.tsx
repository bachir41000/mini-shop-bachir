import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getProduct, updateProduct } from "../utils/storage";
import ProductsForm from "./ProductsForm";

export default function ProductsEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [status, setStatus] = useState("");

  if (!id) return <p>{t("errors.productNotFound")}</p>;

  const product = getProduct(id);
  if (!product) return <p>{t("errors.productNotFound")}</p>;

  const handleSubmit = ({ price, stock }: { price: number; stock: number }) => {
    updateProduct({ id, price, stock });
    setStatus(t("saved"));
    navigate("/");
  };

  return (
    <section>
      <h1>
        {t("edit")} {product.name}
      </h1>
      <ProductsForm
        initialPrice={product.price}
        initialStock={product.stock}
        onSubmit={handleSubmit}
      />
      <Link to={`/product/${id}`}>{t("cancel")}</Link>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}
      >
        {status}
      </div>
    </section>
  );
}
