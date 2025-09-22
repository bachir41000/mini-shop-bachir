import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProduct } from "../utils/storage";
import { formatCurrency } from "../utils/currency";


function ProductsDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();

  if (!id) return <p>{t("errors.productNotFound")}</p>;

  const product = getProduct(id);
  if (!product) return <p>{t("errors.productNotFound")}</p>;

  return (
    <section>
      <h1>{product.name}</h1>
      <p>{t("category")} : {product.category}</p>
      <p>{t("price")} : {formatCurrency(product.price, i18n.language)}</p>
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
