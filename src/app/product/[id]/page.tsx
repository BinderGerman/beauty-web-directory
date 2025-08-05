import Link from "next/link";
import Image from "next/image";

//Types and functions
import { Product } from "@/types/product";
import { fetchSheetData } from "@/data/products"

//Components
import NotFound from "@/app/not-found";
import MarketingWheelButton from "@/components/marketing-wheel-button";

//UI
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Badge, BookOpen, CheckCircle, Clock, Star, Users } from "lucide-react";


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
    title,
    description,
    instructor,
    price,
    ratings,
    number_ratings,
    image,
    duration,
    lessons,
    students,
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

                <MarketingWheelButton
                  originalPrice={price}
                  currency="USD"
                  affiliateLink="https://www.google.com"
                  discountLinks={{
                    '10': 'https://www.google.com',
                  }}
                />
              
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
      
      {/* Contenido del curso */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="contenido" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="contenido">Contenido del curso</TabsTrigger>
              <TabsTrigger value="requisitos">Requisitos</TabsTrigger>
              <TabsTrigger value="para-quien">¿Para quién es?</TabsTrigger>
              <TabsTrigger value="reseñas">Reseñas</TabsTrigger>
            </TabsList>

            <TabsContent value="contenido">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Contenido del curso</h2>
                <p className="text-gray-600 mb-6">
                  {lessons} lecciones • {duration} de contenido total
                </p>

                <div className="space-y-4">
                  {content.map((leccion, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between items-center">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            <BookOpen className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">{leccion.titulo}</h3>
                            <p className="text-sm text-gray-600">{leccion.duracion}</p>
                          </div>
                        </div>
                        {leccion.gratis && (
                          <Badge className="text-green-600 border-green-600">
                            Gratis
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="requisitos">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Requisitos</h2>
                <ul className="space-y-2">
                  {requeriments.map((requeriment, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-rose-600 mr-2 shrink-0 mt-0.5" />
                      <span>{requeriment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="para-quien">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">¿Para quién es este curso?</h2>
                <ul className="space-y-2">
                  {forWhom.map((person, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-rose-600 mr-2 shrink-0 mt-0.5" />
                      <span>{person}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="reseñas">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                {/* <ReseñasCurso cursoId={params.id} /> */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}