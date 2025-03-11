import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-red-500 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-center font-bold">Estamos cerrados</h1>
      </div>
    </nav>
  );
};

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <title>Mi Aplicación</title>
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
} 