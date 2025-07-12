'use client'

import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { useEffect, useState } from "react";
import {fetchSheetData} from "../data/products";
import { Product } from "@/types/product";
import ProductList from "@/components/product-list"
import ProductFIlters from "./product-filters";
import { categories } from "@/data/categories"
import { toast } from 'sonner';
 

const defaultFilters = {
  category: "",
  typeProduct: "",
  minimumPrice: 0,
  maximumPrice: 1000,
  rating: 0,
  search: "",
};

export default function ProductsCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState(defaultFilters)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Recupera filtros guardados y pregunta si aplicarlos (sin el campo search)
  useEffect(() => {
    const savedFilters = localStorage.getItem("productFilters");
  
    if (!savedFilters) return;
  
    try {
      const parsed = JSON.parse(savedFilters);
      console.log("Filtros parseados:", parsed);
      const { search = "", ...restFilters } = parsed;
  
      const hasChanged = Object.entries(restFilters).some(
        ([key, value]) => value !== (defaultFilters as any)[key]
      );
      console.log("¿Han cambiado los filtros?", hasChanged);
      if (!hasChanged) return;
  
      requestAnimationFrame(() => {
        toast("¿Querés restaurar los filtros anteriores?", {
          action: {
            label: "Restaurar",
            onClick: () => {
              setFilters((prev) => ({
                ...defaultFilters,
                ...restFilters,
                search: "",
              }));
            },
          },
          cancel: {
            label: "No",
            onClick: () => {
              // Opcional: limpiar localStorage si rechaza
              localStorage.removeItem("productFilters");
            },
          },
          duration: 10000, // 10 segundos para dar tiempo a decidir
          className: 'bg.primary border border-border',
        });
      })
    } catch (e) {
      console.error("Error parseando filtros guardados", e);
    }
  }, []);
  
  // Obtener los productos desde Google Sheets
  useEffect(() => {
    fetchSheetData()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [])


  // Aplica filtros.
  useEffect(() => {
    const results = products.filter((product) => {
      
      // Filtro por búsqueda
      const searchMatch = filters.search ? product.title.toLowerCase().includes(filters.search.toLowerCase()) || product.description.toLowerCase().includes(filters.search.toLowerCase()) : true

      // Filtro por categoría
      const categoryMatch = filters.category ? product.category === filters.category : true

      // Filtro por tipo de producto
      const typeMatch = filters.typeProduct ? product.type === filters.typeProduct : true

      // Filtro por precio
      const priceMatch = product.price >= filters.minimumPrice && product.price <= filters.maximumPrice

      // Filtro por valoración
      const ratingMatch = product.ratings >= filters.rating

      return searchMatch && categoryMatch && typeMatch && priceMatch && ratingMatch

    })

    setFilteredProducts(results)
    
  }, [filters, products]);

  // Guarda filtro en localStorage
  useEffect(() => {
    const { search, ...restFilters } = filters;
  
    // Comparamos solo los filtros persistibles
    const hasChanged = Object.entries(restFilters).some(
      ([key, value]) => value !== (defaultFilters as any)[key]
    );
  
    if (hasChanged) {
      localStorage.setItem("productFilters", JSON.stringify(restFilters));
    } else {
      localStorage.removeItem("productFilters"); // limpia si vuelve al estado base
    }
  }, [filters]);
  

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters({...filters, ...newFilters})
  }

  const cleanFilters = () => {
    setFilters({
      category: "",
      typeProduct: "",
      minimumPrice: 0,
      maximumPrice: 1000,
      rating: 0,
      search: "",
    })
  }

  if (loading) return <p>Cargando datos...</p>;

  console.log(products)
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="font-serif text-4xl font-bold text-primary">BeautyEdu</h1>
        <p className="font-sans text-lg text-foreground">El directorio más completo de cursos y recursos de belleza en español</p>
      </div>
      
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input 
          type="text"
          placeholder="Buscar cursos. masterclass, ebooks..."
          className="pl-10 py-6 text-lg text-foreground font-sans border-accent focus:border-primary focus:outline-none"
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        <div className="lg:w-3/4 order-2 lg:order-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-sans font-semibold text-destructive">
              {filteredProducts.length} Resultados encontrados
            </h2>
          </div>
          <ProductList products={filteredProducts} />
        </div>

        <div className="lg:w-1/4 order-1 lg:order-2 ">
          <ProductFIlters
            filters={filters}
            updateFilters={updateFilters}
            cleanFilters={cleanFilters}
            categories={categories}
          />
        </div>

      </div>
    </div>
  )
}