// src/app/api/shop/[id]/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Types } from 'mongoose';
import connectDB from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  await connectDB();

  const id = req.nextUrl.pathname.split('/').pop();

  if (!id || !Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid product ID format' }, { status: 400 });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(
      { product },
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      {
        message: 'Server error while fetching product',
        error: (error as Error).message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
