export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  price: number
  valuations: number
  number_valuations: number
  image: string
  category: string
  type: "curso" | "masterclass" | "ebook" | "asesoria"
  duration: string
  lessons: number
  students: number
  outstanding: boolean
}