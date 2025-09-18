import { useParams, Link } from "react-router-dom";
import productsData from "../jsondata/products.json";
import { useTranslation } from "react-i18next";

function ProductsDetail() {
  const { id } = useParams<{ id: string }>();
  const product = productsData.find((p) => p.id === id);
  const { t } = useTranslation();

  if (!product) return <p>{t("errors.productNotFound")}</p>;
  
  return (
    <section>
      <h1>{product.name}</h1>
      <p>{t("category")} : {product.category}</p>
      <p>{t("price")} : {product.price}</p>
      <p>
        {product.stock === 0
          ? t("outOfStock")
          : t("inStock", { count: product.stock })}
      </p>
      <Link to="/">{t("backToCatalogue")}</Link>
    </section>
  );
}

export default ProductsDetail;