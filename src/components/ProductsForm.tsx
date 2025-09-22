import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getCurrencySymbol } from "../utils/currency";

type Props = {
  initialPrice: number;
  initialStock: number;
  onSubmit: (data: { price: number; stock: number }) => void;
};

export default function ProductForm({ initialPrice, initialStock, onSubmit }: Props) {
  const { t, i18n } = useTranslation();
  const symbol = getCurrencySymbol(i18n.language);
  const [price, setPrice] = useState<number>(initialPrice ?? 0);
  const [stock, setStock] = useState<number>(initialStock ?? 0);
  const [errors, setErrors] = useState<{ price?: string; stock?: string }>({});

  const validate = () => {
    const e: { price?: string; stock?: string } = {};
    if (price < 0) e.price = t("errors.pricePositive");
    if (stock < 0) e.stock = t("errors.stockPositive");
    if (!Number.isInteger(stock)) e.stock = t("errors.stockInteger");

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ price, stock });
  };

  return (
    <form onSubmit={submit}>
      <div>
        <label htmlFor="price">{t("price")} ({symbol})</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          aria-invalid={!!errors.price}
        />
        {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
      </div>

      <div>
        <label htmlFor="stock">{t("stock")}</label>
        <input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          aria-invalid={!!errors.stock}
        />
        {errors.stock && <p style={{ color: "red" }}>{errors.stock}</p>}
      </div>

      <button type="submit">{t("save")}</button>
    </form>
  );
}
