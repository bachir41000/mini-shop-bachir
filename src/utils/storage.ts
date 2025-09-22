import productsData from "../jsondata/products.json";
import type { Product } from "../types/product";

const STORAGE_KEY = "products";

export function loadProducts(): Product[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Product[]) : (productsData as Product[]);
  } catch {
    return productsData as Product[];
  }
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getProduct(id: string): Product | undefined {
  return loadProducts().find((p) => p.id === id);
}

export function updateProduct(update: { id: string; price?: number; stock?: number }): Product[] {
  const products = loadProducts();
  const next = products.map((p) => (p.id === update.id ? { ...p, ...update } : p));
  saveProducts(next);
  return next;
}