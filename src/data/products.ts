export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  productType: string;
  category: string;
  subCategory: string;
  highlights: string[];
  specifications: {
    material: string;
    weight: string;
    dimensions: string;
    gemstone?: string;
    careInstructions: string;
    madeIn: string;
  };
  subSpecifications?: {
    metalPurity?: string;
    claspType?: string;
    warranty?: string;
    packaging?: string;
  };
  images: string[];
  inStock: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export const products: Product[] = [
  {
    id: 'necklace-001',
    name: 'Elegant Gold Necklace',
    description: 'A luxurious 22K gold necklace perfect for weddings and special occasions.',
    price: 1499.99,
    currency: 'USD',
    productType: 'Necklace',
    category: 'Jewelry',
    subCategory: 'Gold',
    highlights: ['22K Gold', 'Handcrafted', 'Elegant Design'],
    specifications: {
      material: '22K Gold',
      weight: '35 grams',
      dimensions: '18 inches',
      careInstructions: 'Clean with soft cloth, store in dry place',
      madeIn: 'India',
    },
    subSpecifications: {
      metalPurity: '22K',
      claspType: 'Lobster Claw',
      warranty: '1 Year',
      packaging: 'Velvet box included',
    },
    images: [
      '/images/products/necklace-001-front.png',
      '/images/products/necklace-001-side.png',
    ],
    inStock: true,
    tags: ['gold', 'wedding', 'handcrafted'],
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2025-06-28T12:00:00Z',
  },
  {
    id: 'ring-002',
    name: 'Diamond Engagement Ring',
    description: 'A stunning solitaire diamond ring in white gold, perfect for proposals.',
    price: 2499.99,
    currency: 'USD',
    productType: 'Ring',
    category: 'Jewelry',
    subCategory: 'Diamond',
    highlights: ['Solitaire Diamond', '18K White Gold', 'Elegant Box'],
    specifications: {
      material: '18K White Gold',
      weight: '5 grams',
      dimensions: 'Size 7',
      gemstone: '1ct Diamond',
      careInstructions: 'Avoid chemicals, store separately',
      madeIn: 'Italy',
    },
    subSpecifications: {
      metalPurity: '18K',
      warranty: 'Lifetime',
      packaging: 'Luxury ring box included',
    },
    images: [
      '/images/products/DSC08994.JPG',
      '/images/products/DSC08994.JPG',
    ],
    inStock: false,
    tags: ['diamond', 'engagement', 'white-gold'],
    createdAt: '2025-05-10T09:00:00Z',
    updatedAt: '2025-06-20T15:30:00Z',
  },

  {
    id: 'necklace-001',
    name: 'Elegant Gold Necklace',
    description: 'A luxurious 22K gold necklace perfect for weddings and special occasions.',
    price: 1499.99,
    currency: 'USD',
    productType: 'Necklace',
    category: 'Jewelry',
    subCategory: 'Gold',
    highlights: ['22K Gold', 'Handcrafted', 'Elegant Design'],
    specifications: {
      material: '22K Gold',
      weight: '35 grams',
      dimensions: '18 inches',
      careInstructions: 'Clean with soft cloth, store in dry place',
      madeIn: 'India',
    },
    subSpecifications: {
      metalPurity: '22K',
      claspType: 'Lobster Claw',
      warranty: '1 Year',
      packaging: 'Velvet box included',
    },
    images: [
      '/images/products/necklace-001-front.png',
      '/images/products/necklace-001-side.png',
    ],
    inStock: true,
    tags: ['gold', 'wedding', 'handcrafted'],
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2025-06-28T12:00:00Z',
  },
  {
    id: 'ring-002',
    name: 'Diamond Engagement Ring',
    description: 'A stunning solitaire diamond ring in white gold, perfect for proposals.',
    price: 2499.99,
    currency: 'USD',
    productType: 'Ring',
    category: 'Jewelry',
    subCategory: 'Diamond',
    highlights: ['Solitaire Diamond', '18K White Gold', 'Elegant Box'],
    specifications: {
      material: '18K White Gold',
      weight: '5 grams',
      dimensions: 'Size 7',
      gemstone: '1ct Diamond',
      careInstructions: 'Avoid chemicals, store separately',
      madeIn: 'Italy',
    },
    subSpecifications: {
      metalPurity: '18K',
      warranty: 'Lifetime',
      packaging: 'Luxury ring box included',
    },
    images: [
      '/images/products/ring-002-front.png',
      '/images/products/ring-002-side.png',
    ],
    inStock: false,
    tags: ['diamond', 'engagement', 'white-gold'],
    createdAt: '2025-05-10T09:00:00Z',
    updatedAt: '2025-06-20T15:30:00Z',
  },
];
