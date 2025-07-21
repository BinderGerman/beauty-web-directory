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
        <h3 className="font-serif text-xl font-medium text-foreground">No se encontraron cursos con los filtros seleccionados</h3>
        <p className="font-sans mt-2 text-foreground">Intenta ajustar los filtros para ver más resultados</p>
      </div>
    )
  }

  return (
    <div className="font-sans grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="font-sans flex justify-between items-start">
              <div>
                <h3 className="font-serif text-lg font-bold">{product.title}</h3>
                <p className="text-sm text-foreground">{product.instructor}</p>
              </div>
              <div className="text-lg font-bold text-destructive">
                {product.price === 0 ? "Gratis" : `U$S ${product.price.toFixed(2)}`}
              </div>
            </div>
            <div className="flex items-center mt-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < product.ratings ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                  />
                ))}
              <span className="ml-1 text-sm text-muted">({product.number_ratings})</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground line-clamp-2">{product.description}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-foreground">
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
            <Link href={`/product/${product.id}`} className="w-full">
              <Button className="w-full bg-destructive hover:bg-primary">Ver Detalles</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
