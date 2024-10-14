import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Recycle, Star } from 'lucide-react';
import CategoriesSection from '../components/CategoriesSection';
import TypeWriter from '../components/TypeWriter';

const Home: React.FC = () => {
  const deviceTypes = [
    'smartphones',
    'laptops',
    'tablets',
    'smartwatches',
    'cámaras',
    'consolas',
    'bocinas',
    'computadoras'
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-100 text-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Compra y vende <TypeWriter words={deviceTypes} /> de forma inteligente
          </h1>
          <p className="text-xl mb-8 text-gray-600">Dispositivos reacondicionados de alta calidad con garantía</p>
          <div className="space-x-4">
            <Link to="/catalog" className="bg-primary text-white font-bold py-3 px-6 rounded-full inline-flex items-center hover:bg-primary-dark transition-colors">
              Comprar
              <ArrowRight className="ml-2" />
            </Link>
            <Link to="/quoter" className="bg-white border-2 border-primary text-primary font-bold py-3 px-6 rounded-full inline-flex items-center hover:bg-gray-100 transition-colors">
              Vender
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <CategoriesSection />

      {/* Why Choose Us */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir Nugatt?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Garantía de 12 meses</h3>
              <p className="text-gray-600">Todos nuestros dispositivos están cubiertos por una garantía completa.</p>
            </div>
            <div className="text-center">
              <Star className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Calidad asegurada</h3>
              <p className="text-gray-600">Cada dispositivo pasa por un riguroso proceso de inspección y reacondicionamiento.</p>
            </div>
            <div className="text-center">
              <Recycle className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Sostenibilidad</h3>
              <p className="text-gray-600">Contribuye al medio ambiente dando una segunda vida a los dispositivos.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Cómo funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Elige tu dispositivo</h3>
              <p className="text-gray-600">Explora nuestra amplia selección de dispositivos reacondicionados.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Realiza tu pedido</h3>
              <p className="text-gray-600">Proceso de compra sencillo y seguro con múltiples opciones de pago.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Recibe tu dispositivo</h3>
              <p className="text-gray-600">Envío rápido y gratuito directamente a tu puerta.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;