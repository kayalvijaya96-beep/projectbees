import { ProductsClient } from '@/components/ProductsClient';

interface ProductsPageProps {
  searchParams: {
    q?: string;
    class?: string;
    class_group?: string;
    board?: string;
    category?: string;
    sort?: string;
  };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return <ProductsClient initialParams={searchParams} />;
}
