// shop/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/dbConnect';
import Product from '@/models/Product';

// GET /api/shop → Get all products
export async function GET() {
  await connectDB();

  try {
    const products = await Product.find({});
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching products', error },
      { status: 500 }
    );
  }
}

// POST /api/shop → Add new product (optional, admin use only)
export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const newProduct = await Product.create(body);
    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating product', error },
      { status: 500 }
    );
  }
}
