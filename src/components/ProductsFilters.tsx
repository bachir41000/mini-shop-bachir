import { useTranslation } from "react-i18next";

type Props = {
  search: string;
  onSearch: (value: string) => void;
  category: string;
  onCategory: (value: string) => void;
  sortOrder: "asc" | "desc";
  onSortOrder: (value: "asc" | "desc") => void;
  categories: string[];
};

function ProductsFilters({
  search,
  onSearch,
  category,
  onCategory,
  sortOrder,
  onSortOrder,
  categories,
}: Props) {
    
    const { t } = useTranslation();
  return (
    <div>
      <input
        type="text"
        placeholder={t("searchByName")}
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <select value={category} onChange={(e) => onCategory(e.target.value)}>
        <option value="all">{t("allCategories")}</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={sortOrder}
        onChange={(e) => onSortOrder(e.target.value as "asc" | "desc")}
      >
        <option value="asc">{t("ascendingPrice")}</option>
        <option value="desc">{t("decreasingPrice")}</option>
      </select>
    </div>
  );
}

export default ProductsFilters;