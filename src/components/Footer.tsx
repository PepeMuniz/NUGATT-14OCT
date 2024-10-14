import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface text-text-secondary p-6 mt-12 border-t border-gray-200">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Nugatt. Todos los derechos reservados.</p>
        <div className="mt-4">
          <a href="#" className="text-primary hover:text-secondary mx-2 transition-colors">Términos y Condiciones</a>
          <a href="#" className="text-primary hover:text-secondary mx-2 transition-colors">Política de Privacidad</a>
          <a href="#" className="text-primary hover:text-secondary mx-2 transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;