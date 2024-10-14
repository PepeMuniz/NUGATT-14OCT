import React from 'react';
import { useParams } from 'react-router-dom';
import { formatPrice, calculateDiscountedPrice } from '../utils/priceUtils';
import { allProducts, Product } from './Catalog';
import { ShoppingCart } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Producto no encontrado</div>;
  }

  const discountedPrice = calculateDiscountedPrice(product.price);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.title} className="w-full rounded-lg shadow-md" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl text-blue-600 font-semibold mb-4">
            <span className="line-through text-gray-400 mr-2">${formatPrice(product.price)}</span>
            ${formatPrice(discountedPrice)}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full inline-flex items-center hover:bg-blue-700 transition-colors">
            <ShoppingCart className="mr-2" />
            Añadir al carrito
          </button>
          
          {product.features && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Características</h2>
              <ul className="space-y-2">
                {Object.entries(product.features).map(([key, value]) => (
                  <li key={key} className="flex">
                    <span className="font-medium w-1/3">{key}:</span>
                    <span className="w-2/3">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;