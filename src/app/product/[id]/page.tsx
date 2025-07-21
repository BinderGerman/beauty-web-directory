
import { Product } from "@/types/product";
import NotFound from "@/app/not-found";
import { fetchSheetData } from "@/data/products"
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Clock, ShoppingCart, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductPageProps {
  params: { id: string }
}


export default async function ProductPage({ params }: ProductPageProps) {
  
  const products: Product[] = await fetchSheetData();
  const product: Product | undefined = products.find(p => p.id === params.id);

  if (!product) {
    return <NotFound />
  }

  const {
    id,
    title,
    description,
    instructor,
    price,
    ratings,
    number_ratings,
    image,
    category,
    type,
    duration,
    lessons,
    students,
    outstanding,
  } = product

  // Contenido del curso (simulado)
  const content = [
    { titulo: "Introducción al curso", duracion: "15 min", gratis: true },
    { titulo: "Materiales necesarios", duracion: "20 min", gratis: true },
    { titulo: "Técnicas básicas", duracion: "45 min", gratis: false },
    { titulo: "Prácticas guiadas", duracion: "1h 30min", gratis: false },
    { titulo: "Técnicas avanzadas", duracion: "2h", gratis: false },
    { titulo: "Resolución de problemas comunes", duracion: "1h", gratis: false },
    { titulo: "Proyecto final", duracion: "3h", gratis: false },
  ]

  // Requisitos del curso (simulado)
  const requeriments = [
    "Conocimientos básicos de belleza",
    "Materiales específicos (detallados en la primera lección)",
    "Dedicación y práctica constante",
  ]

  // A quién va dirigido (simulado)
  const forWhom = [
    "Principiantes que quieren iniciarse en el mundo de la belleza",
    "Profesionales que desean actualizar sus conocimientos",
    "Entusiastas que quieren aprender nuevas técnicas",
  ]

  

  console.log(product)
  return (
    <main className="bg-card">
      {/* Barra de navegación superior */}
      <div className="bg-primary-foreground py-3">
        <div className="container mx-auto px-4">
          <Link href='/' className="font-sans font-bold text-accent hover:text-primary flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al catálogo
          </Link>
        </div>
      </div>

      {/* Cabecera del curso */}
      <section className="container mx auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="font-sans text-3xl font-bold mb-4">{title}</h1>

            <div className="flex items-center mb-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < ratings ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                  />
              ))}
              <span className="font-sans ml-2 text-muted">({number_ratings} Valoraciones)</span>
            </div>

            <div className="flex items-center font-sans text-foreground mb-6">
              <div className="flex items-center mr-4">
                <Clock className="h-4 w-4 mr-1" />
                {duration}
              </div>
              <div className="flex items-center mr-4">
                <BookOpen className="h-4 w-4 mr-1" />
                {lessons} Lecciones
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {students}+ Estudiantes
              </div>  
            </div>

            <div className="mb-6 font-sans">
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="text-foreground">{description}</p>
              <p className="text-foreground">
                Este curso completo te llevará desde los conceptos básicos hasta las técnicas más avanzadas. Aprenderás
                de manera práctica y con ejemplos reales que podrás aplicar inmediatamente en tu trabajo
              </p>
            </div>

            <div className="mb-6 font-sans">
              <h2 className="text-xl font-semibold mb-2">Instuctor</h2>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-foreground mr-4">
                  {instructor.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium">{instructor}</h3>
                  <p className="text-foreground">Profesional con más de 10 años de experiencia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta de compra */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg overflow-hidden sticky top-4">
              <div className="relative h-48">
                <Image src={image || '/placeholder.svg'} alt={title} fill className="object-cover" />
              </div>

              {/* Pasar esto a un componente interactivo */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-3xl font-sans font-bold text-destructive">
                    {`U$S ${price.toFixed(2)}`}
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-chart-4 to-chart-5 hover:from-ring hover:to-chart-1 text-primary-foreground py-3 text-lg font-semibold shadow-lg transform transition hover:scale-105"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />🎯 Comprá con descuento!
                </Button>

                {/* Hasta acá componente interactivo */}

                <div className="font-sans text-sm text-foreground mt-6">
                  <p className="mb-2">✓ Acceso de por vida</p>
                  <p className="mb-2">✓ Certificado de finalización</p>
                  <p className="mb-2">✓ Soporte del instructor</p>
                  <p className="mb-2">✓ Garantía de 30 días</p>
                  <p className="text-destructive font-medium">🎲 ¡Girá la ruleta y participá por un descuento!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <h2>Página de producto</h2>
    </main>
  )
}