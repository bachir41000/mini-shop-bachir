import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import { axe } from "jest-axe";
import ProductsList from "../ProductsList";

vi.mock("../../utils/storage", () => ({
  loadProducts: vi.fn(() => [
    { id: "p1", name: "Desk Lamp", category: "Home", price: 29.9, stock: 12 },
  ]),
}));

test("liste produits sans violations a11y", async () => {
  const { container } = render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<ProductsList />} />
      </Routes>
    </MemoryRouter>
  );
  expect(await axe(container)).toHaveNoViolations();
});
