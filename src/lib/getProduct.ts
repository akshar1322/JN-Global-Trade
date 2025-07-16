// lib/getProduct.ts
export async function getProduct(id: string) {
  try {
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://www.jnglobaltrade.com'; // replace with your domain

    const res = await fetch(`${baseUrl}/api/shop/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Failed to fetch product:', res.statusText);
      return null;
    }

    const data = await res.json();
    return data.product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
