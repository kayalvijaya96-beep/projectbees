import { ProductDetailClient } from '@/components/ProductDetailClient';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return <ProductDetailClient slug={params.slug} />;
}
