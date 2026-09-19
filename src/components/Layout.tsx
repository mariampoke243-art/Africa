import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';

export const Layout: React.FC = () => {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {!isHomePage && (
        <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
          <div className="font-bold text-lg">Africa</div>

          <LanguageSelector />
        </header>
      )}

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
