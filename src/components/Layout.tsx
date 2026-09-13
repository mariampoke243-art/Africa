import React from 'react';
import { Outlet } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <div className="font-bold text-lg">Africa</div>
        <LanguageSelector />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
