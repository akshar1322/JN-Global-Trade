import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
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
  images: string[]; // URLs from Cloudinary or local paths (e.g., /uploads/image.png)
  inStock: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'USD' },

    productType: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },

    highlights: { type: [String], default: [] },

    specifications: {
      material: { type: String, required: true },
      weight: { type: String, required: true },
      dimensions: { type: String, required: true },
      gemstone: { type: String },
      careInstructions: { type: String, required: true },
      madeIn: { type: String, required: true },
    },

    subSpecifications: {
      metalPurity: { type: String },
      claspType: { type: String },
      warranty: { type: String },
      packaging: { type: String },
    },

    images: { type: [String], required: true }, // Cloudinary or local paths
    inStock: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Prevent model overwrite during hot-reload in dev
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
