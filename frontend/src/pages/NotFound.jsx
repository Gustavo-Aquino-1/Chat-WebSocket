import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <div className="text-center text-white space-y-6">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <p className="text-2xl">Página não encontrada</p>
        <p className="text-gray-400 max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida. Verifique o endereço ou volte para a página inicial.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition duration-300"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
