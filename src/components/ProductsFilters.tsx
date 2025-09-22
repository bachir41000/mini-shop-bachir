import { useTranslation } from "react-i18next";

type Props = {
  search: string;
  onSearch: (v: string) => void;
  category: string;
  onCategory: (v: string) => void;
  sortOrder: "asc" | "desc";
  onSortOrder: (v: "asc" | "desc") => void;
  categories: string[];
};

export default function ProductsFilters({
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
      <label htmlFor="search" style={{ position: "absolute", left: -9999 }}>
        {t("searchByName")}
      </label>
      <input
        id="search"
        type="text"
        placeholder={t("searchByName")}
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />

      <label htmlFor="category">{t("filterByCategory")}</label>
      <select
        id="category"
        aria-label={t("filterByCategory")}
        value={category}
        onChange={(e) => onCategory(e.target.value)}
      >
        <option value="all">{t("allCategories")}</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <label htmlFor="sort">{t("sortByPrice")}</label>
      <select
        id="sort"
        aria-label={t("sortByPrice")}
        value={sortOrder}
        onChange={(e) => onSortOrder(e.target.value as "asc" | "desc")}
      >
        <option value="asc">{t("ascendingPrice")}</option>
        <option value="desc">{t("decreasingPrice")}</option>
      </select>
    </div>
  );
}
