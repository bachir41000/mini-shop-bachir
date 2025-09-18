import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductList from "../ProductsList";

vi.mock("../../jsondata/products.json", () => ({
  default: [
    { id: "p1", name: "Desk Lamp", category: "Home", price: 29.9, stock: 12 },
    { id: "p2", name: "Wireless Mouse", category: "Tech", price: 19.5, stock: 0 },
    { id: "p3", name: "Notebook A5", category: "Stationery", price: 5.2, stock: 37 },
  ],
}));

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <ProductList />
    </MemoryRouter>
  );
}

describe("ProductList", () => {
  test("affiche les produits et la rupture de stock", () => {
    renderWithRouter();
    expect(screen.getByText(/Desk Lamp/)).toBeInTheDocument();
    expect(screen.getByText(/Wireless Mouse/)).toBeInTheDocument();
    expect(screen.getByText(/Rupture de stock/i)).toBeInTheDocument();
  });

  test("filtre par recherche", () => {
    renderWithRouter();
    const input = screen.getByPlaceholderText(/Rechercher/i);
    fireEvent.change(input, { target: { value: "Note" } });
    expect(screen.getByText(/Notebook A5/)).toBeInTheDocument();
    expect(screen.queryByText(/Desk Lamp/)).toBeNull();
  });

  test("filtre par catégorie", () => {
    renderWithRouter();
    const selectCategory = screen.getByDisplayValue("Toutes les catégories");
    fireEvent.change(selectCategory, { target: { value: "Tech" } });
    expect(screen.getByText(/Wireless Mouse/)).toBeInTheDocument();
    expect(screen.queryByText(/Desk Lamp/)).toBeNull();
  });

  test("tri par prix décroissant", () => {
    renderWithRouter();
    const selectSort = screen.getByDisplayValue("Prix croissant");
    fireEvent.change(selectSort, { target: { value: "desc" } });
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent(/Desk Lamp/);
  });
});
