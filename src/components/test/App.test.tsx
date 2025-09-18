import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

vi.mock("../../jsondata/products.json", () => ({
  default: [
    { id: "p1", name: "Desk Lamp", category: "Home", price: 29.9, stock: 12 },
  ],
}));

describe("Navigation globale", () => {
  test("catalogue → édition → retour catalogue", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Catalogue/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Modifier/));
    expect(screen.getByRole("button", { name: /Enregistrer/ })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Enregistrer/ }));

    expect(screen.getByText(/Catalogue/i)).toBeInTheDocument();
  });
});
