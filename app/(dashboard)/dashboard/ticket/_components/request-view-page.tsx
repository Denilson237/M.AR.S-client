import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';


type TProductViewPageProps = {
  productId: string;
};

export default async function RequestViewPage({
  productId
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Product';

  if (productId !== 'new') {
    const data = await fakeProducts.getProductById(Number(productId));
    product = data.product as Product;
    if (!product) {
      notFound();
    }
    pageTitle = `Edit Product`;
  }

  return <>ProductForm</>
  //return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
