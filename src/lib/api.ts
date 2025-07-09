import type { IProduct } from "@/models/Product";


export async function getAllProducts(): Promise<IProduct[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/shop`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json(); // returns the whole JSON response, likely { success, products }
}
