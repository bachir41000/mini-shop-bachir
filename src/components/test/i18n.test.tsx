import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductList from "../ProductsList";
import i18n from "../../components/i18n";

vi.mock("../../jsondata/products.json", () => ({
  default: [
    { id: "p1", name: "Desk Lamp", category: "Home", price: 29.9, stock: 0 },
  ],
}));

test("bascule FR/EN sur les libellés", async () => {
  render(
    <MemoryRouter>
      <ProductList />
    </MemoryRouter>
  );
 
  expect(screen.getByText(/Rupture de stock/)).toBeInTheDocument();
  expect(screen.getByText(/Modifier/)).toBeInTheDocument();

  await i18n.changeLanguage("en");
  expect(await screen.findByText(/Out of stock/)).toBeInTheDocument();
  expect(screen.getByText(/Edit/)).toBeInTheDocument();
});
