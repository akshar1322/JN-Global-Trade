import connectToDB from '@/lib/dbConnect';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error('[PRODUCT_GET_ONE_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch product.' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const updates = await req.json();
    const product = await Product.findByIdAndUpdate(params.id, updates, { new: true });
    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error('[PRODUCT_UPDATE_ERROR]', error);
    return NextResponse.json({ error: 'Failed to update product.' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const deletedProduct = await Product.findByIdAndDelete(params.id);
    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[PRODUCT_DELETE_ERROR]', error);
    return NextResponse.json({ error: 'Failed to delete product.' }, { status: 500 });
  }
}
