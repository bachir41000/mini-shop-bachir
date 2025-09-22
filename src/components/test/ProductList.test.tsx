import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import ProductsList from "../ProductsList";

vi.mock("../../utils/storage", () => ({
  loadProducts: vi.fn(() => [
    { id: "p1", name: "Desk Lamp", category: "Home", price: 29.9, stock: 12 },
    { id: "p2", name: "Wireless Mouse", category: "Tech", price: 19.5, stock: 0 },
    { id: "p3", name: "Notebook A5", category: "Stationery", price: 5.2, stock: 37 },
  ]),
}));

function renderList() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<ProductsList />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProductList", () => {
  test("affiche les produits et la rupture de stock", () => {
    renderList();
    expect(screen.getByText(/Desk Lamp/)).toBeInTheDocument();
    expect(screen.getByText(/Wireless Mouse/)).toBeInTheDocument();
    expect(screen.getByText(/Rupture de stock|Out of stock/i)).toBeInTheDocument();
  });

  test("filtre par recherche", async () => {
    renderList();
    fireEvent.change(screen.getByPlaceholderText(/Rechercher|Search/i), {
      target: { value: "Note" },
    });

    expect(screen.getByText(/Notebook A5/)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Desk Lamp/)).toBeNull();
    });
  });

  test("filtre par catégorie", () => {
    renderList();
    const categorySelect = screen.getByLabelText(/filtrer par catégorie|filter by category/i);
    fireEvent.change(categorySelect, { target: { value: "Tech" } });
    expect(screen.getByText(/Wireless Mouse/)).toBeInTheDocument();
    expect(screen.queryByText(/Desk Lamp/)).toBeNull();
  });

  test("tri par prix décroissant", () => {
    renderList();
    const sortSelect = screen.getByLabelText(/trier par prix|sort by price/i);
    fireEvent.change(sortSelect, { target: { value: "desc" } });
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent(/Desk Lamp/);
  });
});
