import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi, beforeEach } from "vitest";
import ProductsEdit from "../ProductsEdit";

type UpdateArgs = { id: string; price: number; stock: number };
const updateProductMock = vi.fn<(args: UpdateArgs) => void>();

vi.mock("../../utils/storage", () => ({
  getProduct: vi.fn((id: string) =>
    id === "p2"
      ? { id: "p2", name: "Wireless Mouse", category: "Tech", price: 19.5, stock: 0 }
      : undefined
  ),
  updateProduct: (args: UpdateArgs) => updateProductMock(args),
}));

beforeEach(() => {
  updateProductMock.mockClear();
});

function renderEdit() {
  return render(
    <MemoryRouter initialEntries={["/product/p2/edit"]}>
      <Routes>
        <Route path="/product/:id/edit" element={<ProductsEdit />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProductsEdit", () => {
  test("prérempli et met à jour un produit", () => {
    renderEdit();

    const price = screen.getByLabelText(/prix|price/i) as HTMLInputElement;
    const stock = screen.getByLabelText(/stock/i) as HTMLInputElement;

    expect(price.value).toMatch(/19\.5|19,5/);
    expect(stock.value).toBe("0");

    fireEvent.change(price, { target: { value: "25" } });
    fireEvent.change(stock, { target: { value: "7" } });
    fireEvent.click(screen.getByRole("button", { name: /enregistrer|save/i }));

    expect(updateProductMock).toHaveBeenCalledWith({ id: "p2", price: 25, stock: 7 });
  });

  test("validation: prix négatif", () => {
    renderEdit();

    const price = screen.getByLabelText(/prix|price/i);
    fireEvent.change(price, { target: { value: "-10" } });

    fireEvent.click(screen.getByRole("button", { name: /enregistrer|save/i }));

    expect(screen.getByText(/prix.*positif|price.*positive/i)).toBeInTheDocument();
    expect(updateProductMock).not.toHaveBeenCalled();
  });

  test("validation: stock entier", () => {
    renderEdit();

    const stock = screen.getByLabelText(/stock/i);
    fireEvent.change(stock, { target: { value: "3.5" } });

    fireEvent.click(screen.getByRole("button", { name: /enregistrer|save/i }));

    expect(screen.getByText(/entier|integer/i)).toBeInTheDocument();
    expect(updateProductMock).not.toHaveBeenCalled();
  });
});
