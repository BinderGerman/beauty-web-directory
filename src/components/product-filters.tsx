"use client"
import type { Category } from "@/types/category"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Star, FilterX } from "lucide-react"


interface FilterProps {
  filters: {
    category: string,
    typeProduct: string,
    minimumPrice: number,
    maximumPrice: number,
    rating: number,
    search: string,
  }
  updateFilters: (filters: Partial<FilterProps["filters"]>) => void
  cleanFilters: () => void
  categories: Category[]
}

export default function ProductFIlters({ filters, updateFilters, cleanFilters, categories }: FilterProps) {
  const typeProduct = [
    { id: "curso", name: "Curso Online" },
    { id: "masterclass", name: "Masterclass" },
    { id: "ebook", name: "E-Book" },
    { id: "asesoria", name: "Asesoría Personalizada" },
  ]

  return (
    <div className="font-sans bg-background p-6 rounded-lg shadow-md sticky top-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Filtros</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={cleanFilters}
          className="text-destructive hover:text-primary-foreground hover:bg-secondary"
        >
          <FilterX className="mr-2 h-4 w-4" />
          Limpiar
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categoria", "tipo", "precio", "valoracion"]} className="space-y-4">
        <AccordionItem value="categoria" className="border-b">
          <AccordionTrigger className="text-lg font-medium">Categoría</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`categoria-${category.id}`}
                    checked={filters.category === category.id}
                    onCheckedChange={() =>
                      updateFilters({
                        category: filters.category === category.id ? "" : category.id,
                      })
                    }
                  />
                  <label
                    htmlFor={`categoria-${category.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tipo" className="border-b">
          <AccordionTrigger className="text-lg font-medium">Tipo de Producto</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {typeProduct.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tipo-${type.id}`}
                    checked={filters.typeProduct === type.id}
                    onCheckedChange={() =>
                      updateFilters({
                        typeProduct: filters.typeProduct === type.id ? "" : type.id,
                      })
                    }
                  />
                  <label
                    htmlFor={`tipo-${type.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="precio" className="border-b">
          <AccordionTrigger className="text-lg font-medium">Precio</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <Slider
                defaultValue={[filters.maximumPrice]}
                max={1000}
                step={10}
                onValueChange={(value) => updateFilters({ maximumPrice: value[0] })}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">U$S0</span>
                <span className="text-sm font-medium">U$S{filters.maximumPrice}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="valoracion" className="border-b">
          <AccordionTrigger className="text-lg font-medium">Valoración</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`valoracion-${value}`}
                    checked={filters.rating === value}
                    onCheckedChange={() =>
                      updateFilters({
                        rating: filters.rating === value ? 0 : value,
                      })
                    }
                  />
                  <label
                    htmlFor={`valoracion-${value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    {Array(value)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    {Array(5 - value)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-gray-300" />
                      ))}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
