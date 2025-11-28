'use client';

import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <>
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="px-7 py-6">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;