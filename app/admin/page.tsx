"use client";

import { useState, useEffect } from "react";
import { getProductPrice, updateProductPrice } from "@/lib/firebase";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const products = [
  { id: "andador-ruedas", name: "Andador con Ruedas" },
  { id: "silla-ruedas-estandar", name: "Silla de Ruedas Estándar" },
  { id: "silla-ruedas-transporte", name: "Silla de Ruedas de Transporte" },
  { id: "andador-plegable", name: "Andador Plegable" },
  { id: "ferula-walker", name: "Férula Walker" },
  { id: "inodoro-portatil", name: "Inodoro Portátil" },
  { id: "grua-traslado", name: "Grúa de Traslado" },
  { id: "muletas-regulables", name: "Muletas Regulables" },
  { id: "cama-manual", name: "Cama Ortopédica Manual" },
  { id: "cama-electrica", name: "Cama Ortopédica Eléctrica" }
];

export default function AdminPage() {
  const [prices, setPrices] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const pricesData: { [key: string]: string } = {};
        const loadingStates: { [key: string]: boolean } = {};
        
        for (const product of products) {
          loadingStates[product.id] = true;
          const price = await getProductPrice(product.id);
          pricesData[product.id] = price?.toString() || "";
          loadingStates[product.id] = false;
        }
        
        setPrices(pricesData);
        setLoading(loadingStates);
      } catch (error) {
        console.error("Error al obtener los precios:", error);
        setMessage({ text: "Error al cargar los precios", type: "error" });
      }
    };

    fetchPrices();
  }, []);

  const handleSave = async (productId: string) => {
    try {
      setLoading(prev => ({ ...prev, [productId]: true }));
      const newPrice = parseFloat(prices[productId]);
      
      if (isNaN(newPrice)) {
        throw new Error("El precio debe ser un número válido");
      }

      const success = await updateProductPrice(productId, newPrice);
      
      if (success) {
        setMessage({ text: "Precio actualizado correctamente", type: "success" });
      } else {
        throw new Error("No se pudo actualizar el precio");
      }
    } catch (error) {
      console.error("Error al guardar el precio:", error);
      setMessage({ text: error.message || "Error al actualizar el precio", type: "error" });
    } finally {
      setLoading(prev => ({ ...prev, [productId]: false }));
      
      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto flex h-14 items-center">
          <Link href="/" className="flex items-center space-x-2 ml-6">
            <ArrowLeft className="h-5 w-5 text-zinc-600" />
          </Link>
          <h1 className="flex-1 text-center font-bold text-xl text-zinc-900">Panel de Administración</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {message && (
          <div
            className={`mb-4 p-4 rounded-md ${
              message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-gray-500 text-sm mr-2">$</span>
                        <input
                          type="number"
                          value={prices[product.id] || ""}
                          onChange={(e) => setPrices(prev => ({
                            ...prev,
                            [product.id]: e.target.value
                          }))}
                          className="w-24 px-2 py-1 text-right border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleSave(product.id)}
                        disabled={loading[product.id]}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#00a0e3] hover:bg-[#0088c2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
                      >
                        {loading[product.id] ? "..." : "Guardar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
} 