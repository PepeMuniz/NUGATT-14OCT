import React from 'react';
import { Trash2 } from 'lucide-react';

// Simulación de datos del carrito
const cartItems = [
  { id: 1, name: 'iPhone 12', price: 599, quantity: 1 },
  { id: 2, name: 'Samsung Galaxy S21', price: 649, quantity: 1 },
];

const Cart: React.FC = () => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4 last:border-b-0">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="w-16 text-center border rounded-md mr-4"
                    readOnly
                  />
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Total: ${total}</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
              Proceder al pago
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;