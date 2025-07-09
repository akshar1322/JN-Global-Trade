// app/shop/[id]/page.tsx
import dynamic from 'next/dynamic';

interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Dynamically load the client component (no SSR)
const ProductPage = dynamic(() => import('./ProductPage'), {
  ssr: false,
});

export default function Page({ params, searchParams }: PageProps) {
  return <ProductPage params={params} searchParams={searchParams} />;
}
