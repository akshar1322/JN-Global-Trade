import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import mongoose from 'mongoose';

// Define strict types for route parameters
type RouteParams = {
  params: {
    id: string;
  };
  // Add other expected properties here if needed
  searchParams?: URLSearchParams;
  // etc...
};

export async function GET(
  request: NextRequest,
  context: RouteParams
): Promise<NextResponse> {
  await dbConnect();

  const { id } = context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
