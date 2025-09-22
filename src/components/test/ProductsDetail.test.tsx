import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import ProductsDetail from "../ProductsDetail";

vi.mock("../../utils/storage", () => ({
  getProduct: vi.fn((id: string) =>
    id === "p2"
      ? { id: "p2", name: "Wireless Mouse", category: "Tech", price: 19.5, stock: 0 }
      : undefined
  ),
}));

test("détail /product/p2 affiche rupture de stock", () => {
  render(
    <MemoryRouter initialEntries={["/product/p2"]}>
      <Routes>
        <Route path="/product/:id" element={<ProductsDetail />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText(/Rupture de stock|Out of stock/i)).toBeInTheDocument();
});
