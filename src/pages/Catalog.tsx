import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { formatPrice, calculateDiscountedPrice } from '../utils/priceUtils';
import CategoriesSection from '../components/CategoriesSection';

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  color: string;
}

export const allProducts: Product[] = [
  {
    id: 'NGLG0002-A',
    title: 'Celular LG K22 / 32 Gb Expandible / Ram 2 Gb / Grado A',
    price: 2625,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Smartphone',
    stock: 3,
    color: 'Gris',
  },
  {
    id: 'NGAP0012-A',
    title: 'Celular iPhone 6s / 16 Gb / Ram 2 Gb / Grado A',
    price: 3875,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Smartphone',
    stock: 1,
    color: 'Oro rosa',
  },
  {
    id: 'NGAP00049-A',
    title: 'Celular iPhone 6s / 32 Gb / Ram 2 Gb / Gris Espacial / Grado A',
    price: 4062.5,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Smartphone',
    stock: 3,
    color: 'Gris espacial',
  },
  {
    id: 'NGAP00304-A',
    title: 'Celular iPhone 13 Mini / 128 Gb / Ram 4 Gb / Azul / Grado A',
    price: 11750,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80',
    category: 'Smartphone',
    stock: 2,
    color: 'Azul',
  },
  {
    id: 'NGAP00503-A',
    title: 'Macbook Air 13.3" - 2015 / 256 Gb / Ram 4 Gb / Grado A',
    price: 6875,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2026&q=80',
    category: 'Laptops',
    stock: 1,
    color: 'Plateado',
  },
  {
    id: 'NGOT0001-A',
    title: 'Bocinas Speaker System 4 Ohms / Grado A',
    price: 650,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Bocinas',
    stock: 1,
    color: 'Plateado',
  },
  {
    id: 'NGIN0001-A',
    title: 'Nintendo Nes Mini Anniversary Edition / 2 Controles / Grado A',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    category: 'Consolas de videojuegos',
    stock: 1,
    color: 'Gris',
  },
  {
    id: 'NGAP00014-A',
    title: 'Celular iPhone 7 / 32 Gb / Ram 2 Gb / Negro Mate / Grado A',
    price: 3718.75,
    image: 'https://images.unsplash.com/photo-1603891128711-11b4b03bb138?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2129&q=80',
    category: 'Smartphone',
    stock: 2,
    color: 'Negro mate',
  },
  {
    id: 'NGAP00046-A',
    title: 'Celular iPhone 6s / 32 Gb / Ram 2 Gb / Rosa / Grado A',
    price: 4062.5,
    image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Smartphone',
    stock: 1,
    color: 'Rosa',
  },
  {
    id: 'NGHP0007-A',
    title: 'Computadora Hp Elitedesk 800 G2 / 1 Tb / Ram 8 Gb / Grado A',
    price: 6250,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2031&q=80',
    category: 'Computadoras de escritorio',
    stock: 1,
    color: 'Negro',
  },
  {
    id: 'NGAP00163-A',
    title: 'Celular iPhone XR / 128 Gb / Ram 3 Gb / Rojo (product)red / Grado A',
    price: 8125,
    image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
    category: 'Smartphone',
    stock: 4,
    color: 'Rojo (Product)RED',
  },
  {
    id: 'NGAP00295-A',
    title: 'Celular iPhone SE (2022) / 128 Gb / Ram 4 Gb / Negro / Grado A',
    price: 9812.5,
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
    category: 'Smartphone',
    stock: 2,
    color: 'Negro',
  },
  {
    id: 'NGAP00141-A',
    title: 'Celular iPhone 8 Plus / 256 Gb / Ram 3 Gb / Plata / Grado A',
    price: 6581.25,
    image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    category: 'Smartphone',
    stock: 4,
    color: 'Plata',
  },
  {
    id: 'NGSG00018-A',
    title: 'Celular Samsung Galaxy Note 10 / 256 Gb / Ram 8 Gb / Negro / Grado A',
    price: 7750,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Smartphone',
    stock: 1,
    color: 'Negro',
  },
];

const Catalog: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setFilteredProducts(allProducts.filter(product => product.category.toLowerCase() === category.toLowerCase()));
    } else {
      setFilteredProducts(allProducts);
    }
  }, [location]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de Productos</h1>
      
      <CategoriesSection />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">Categoría: {product.category}</p>
              <p className="text-gray-600 mb-2">Color: {product.color}</p>
              <p className="text-gray-600 mb-2">Stock: {product.stock}</p>
              <p className="text-lg font-bold text-blue-600">
                <span className="line-through text-gray-400 mr-2">${formatPrice(product.price)}</span>
                ${formatPrice(calculateDiscountedPrice(product.price))}
              </p>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600 mt-8">No hay productos disponibles en esta categoría.</p>
      )}
    </div>
  );
};

export default Catalog;