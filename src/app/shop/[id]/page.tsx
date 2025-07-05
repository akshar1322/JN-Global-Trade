import ProductCard from '@/components/Elements/ProductCard';
import { getAllProducts } from '@/lib/api'; // fetch from MongoDB
import { IProduct } from '@/models/Product';

export default async function ProductsPage() {
  const products: IProduct[] = await getAllProducts(); // Add filtering logic as needed

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6">
      {/* Sidebar Filters */}
      <aside className="col-span-1">
        <h2 className="font-semibold text-lg mb-4">Browse by</h2>
        <ul className="space-y-2 text-gray-700">
          <li>All Products</li>
          <li>Rings</li>
          <li>Earrings</li>
          <li>Necklaces</li>
          <li>Bracelets</li>
          <li>New In</li>
          <li>Best Sellers</li>
        </ul>

        {/* Price Filter Example */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Price</h3>
          {/* Add price slider or min/max inputs */}
        </div>
      </aside>

      {/* Products Grid */}
      <section className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            currency={product.currency}
            image={product.images[0]}
          />
        ))}
      </section>
    </div>
  );
}
