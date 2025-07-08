import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import mongoose from 'mongoose';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = params;

  // ✅ Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (_error: unknown) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
