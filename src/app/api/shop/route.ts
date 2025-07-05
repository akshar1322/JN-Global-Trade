import connectToDB from '@/lib/dbConnect';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();

    const {
      name,
      description,
      price,
      currency,
      productType,
      category,
      subCategory,
      specifications,
      images,
    } = body;

    if (
      !name || !description || !price || !currency ||
      !productType || !category || !subCategory ||
      !Array.isArray(images) || images.length === 0 ||
      typeof specifications !== 'object'
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid required fields.' },
        { status: 400 }
      );
    }

    const product = await Product.create(body);
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error('[PRODUCT_POST_ERROR]', error);
    return NextResponse.json({ error: 'Failed to create product.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error('[PRODUCT_GET_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch products.' }, { status: 500 });
  }
}
