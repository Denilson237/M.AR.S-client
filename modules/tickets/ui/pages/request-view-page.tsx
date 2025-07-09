import { fakeProducts, Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';



type TProductViewPageProps = {
  requestId: string;
};

export default async function RequestViewPage({
  requestId
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Créer une requête de Coupure/Remise';

  if (requestId !== 'new') {
    const data = await fakeProducts.getProductById(Number(requestId));
    product = data.product as Product;
    if (!product) {
      notFound();
    }
    pageTitle = `Edit Request`;
  }

  return <div>new app</div>
}
