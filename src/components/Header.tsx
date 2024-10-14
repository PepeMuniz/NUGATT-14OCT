import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Smartphone } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-surface text-primary p-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Smartphone className="mr-2 text-secondary" />
          Nugatt
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/catalog" className="hover:text-secondary transition-colors">Catálogo</Link></li>
            <li><Link to="/quoter" className="hover:text-secondary transition-colors">Vender</Link></li>
            <li><Link to="/cart" className="hover:text-secondary transition-colors"><ShoppingCart /></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;