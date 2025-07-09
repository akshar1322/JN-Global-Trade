import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Types } from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = context.params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid product ID' }, { status: 400 });
  }

  try {
    await dbConnect();

    const product = await Product.findById(id).lean(); // lean() returns a plain JS object

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('[PRODUCT_FETCH_ERROR]', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
