import type { Product } from "@/types/product"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Clock, BookOpen, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductsListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductsListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-600">No se encontraron cursos con los filtros seleccionados</h3>
        <p className="mt-2 text-gray-500">Intenta ajustar los filtros para ver más resultados</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48">
            <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
            <Badge
              className="absolute top-2 right-2"
              variant={
                product.type === "curso"
                  ? "default"
                  : product.type === "masterclass"
                    ? "destructive"
                    : product.type === "ebook"
                      ? "outline"
                      : "secondary"
              }
            >
              {product.type === "curso"
                ? "Curso Online"
                : product.type === "masterclass"
                  ? "Masterclass"
                  : product.type === "ebook"
                    ? "E-Book"
                    : "Asesoría"}
            </Badge>
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-sm text-gray-500">{product.instructor}</p>
              </div>
              <div className="text-lg font-bold text-rose-600">
                {product.price === 0 ? "Gratis" : `€${product.price.toFixed(2)}`}
              </div>
            </div>
            <div className="flex items-center mt-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < product.ratings ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              <span className="ml-1 text-sm text-gray-600">({product.number_ratings})</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 line-clamp-2">{product.description}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {product.duration}
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                {product.lessons} lecciones
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {product.students}+ estudiantes
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/curso/${product.id}`} className="w-full">
              <Button className="w-full bg-rose-600 hover:bg-rose-700">Ver Detalles</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
