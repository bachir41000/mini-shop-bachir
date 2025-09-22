import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import App from "../../App";

vi.mock("../../utils/storage", () => ({
  loadProducts: vi.fn(() => [
    { id: "p1", name: "Desk Lamp", category: "Home", price: 29.9, stock: 12 },
  ]),
}));

test("toggle FR/EN + persistance localStorage", async () => {
  localStorage.setItem("lang", "fr");

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByRole("heading", { name: /catalogue/i })).toBeInTheDocument();

  const langSelect = screen.getByLabelText(/langue|language/i);
  fireEvent.change(langSelect, { target: { value: "en" } });

  expect(await screen.findByRole("heading", { name: /catalog/i })).toBeInTheDocument();
  expect(localStorage.getItem("lang")).toBe("en");
});
