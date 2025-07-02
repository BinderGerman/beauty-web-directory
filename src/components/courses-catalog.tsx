'use client'

import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { useEffect, useState } from "react";
import {fetchSheetData} from "../data/courses";
import { Course } from "@/types/course";

export default function CoursesCatalog() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSheetData()
      .then(setRows)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="font-serif text-4xl font-bold text-primary">BeautyEdu</h1>
        <p className="font-sans text-lg text-foreground">El directorio más completo de cursos y recursos de belleza en español</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input 
          type="text"
          placeholder="Buscar cursos. masterclass, ebooks..."
          className="pl-10 py-6 text-lg text-foreground font-sans border-accent focus:border-primary focus:outline-none"
          value=''
          onChange={() => {}}
        />
      </div>

      <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Datos desde Google Sheets</h2>
      <table className="table-auto border border-gray-300">
        <thead>
          <tr>
            {Object.keys(rows[0] || {}).map((key) => (
              <th key={key} className="border px-2 py-1 bg-gray-100">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j} className="border px-2 py-1">{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </div>
  )
}