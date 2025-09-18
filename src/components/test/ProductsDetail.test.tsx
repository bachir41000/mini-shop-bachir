import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProductsDetail from "../ProductsDetail";

vi.mock("../../jsondata/products.json", () => ({
  default: [
    { id: "p1", name: "Desk Lamp", category: "Home", price: 29.9, stock: 12 },
  ],
}));

describe("ProductsDetail", () => {
  test("affiche les infos d’un produit existant", () => {
    render(
      <MemoryRouter initialEntries={["/product/p1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductsDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Desk Lamp")).toBeInTheDocument();
    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/29.9/)).toBeInTheDocument();
    expect(screen.getByText(/12 en stock/)).toBeInTheDocument();
  });

  test("affiche un message si le produit n’existe pas", () => {
    render(
      <MemoryRouter initialEntries={["/product/unknown"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductsDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Produit Introuvable/i)).toBeInTheDocument();
  });
});
