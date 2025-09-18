import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProductsEdit from "../ProductsEdit";

vi.mock("../../jsondata/products.json", () => ({
  default: [
    { id: "p1", name: "Desk Lamp", category: "Home", price: 29.9, stock: 12 },
  ],
}));

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem(
    "products",
    JSON.stringify([
      { id: "p1", name: "Desk Lamp", category: "Home", price: 29.9, stock: 12 },
    ])
  );
});

describe("ProductsEdit", () => {
  test("empêche valeurs négatives et affiche une erreur", () => {
    render(
      <MemoryRouter initialEntries={["/product/p1/edit"]}>
        <Routes>
          <Route path="/product/:id/edit" element={<ProductsEdit />} />
        </Routes>
      </MemoryRouter>
    );

    const priceInput = screen.getByDisplayValue("29.9") as HTMLInputElement;
    const stockInput = screen.getByDisplayValue("12") as HTMLInputElement;

    // Mettre valeurs négatives
    fireEvent.change(priceInput, { target: { value: "-5" } });
    fireEvent.change(stockInput, { target: { value: "-10" } });

    // Cliquer sur "Enregistrer"
    fireEvent.click(screen.getByRole("button", { name: /Enregistrer/i }));

    // Vérifie messages d'erreur
    expect(screen.getByText(/prix doit être positif/i)).toBeInTheDocument();
    expect(screen.getByText(/stock doit être positif/i)).toBeInTheDocument();

    // Vérifie que localStorage n'a pas changé
    const saved = JSON.parse(localStorage.getItem("products") || "[]");
    expect(saved[0].price).toBe(29.9);
    expect(saved[0].stock).toBe(12);
  });
});
