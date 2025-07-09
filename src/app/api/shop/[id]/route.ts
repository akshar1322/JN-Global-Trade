import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import mongoose from 'mongoose';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const { id } = params;

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
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
