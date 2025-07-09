import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectDB();
  try {
    const products = await Product.aggregate([{ $sample: { size: 4 } }]);
    return NextResponse.json(products);
  } catch (error) { // Changed _error to error
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
export const revalidate = 60; // Revalidate every 60 seconds
