import Papa from 'papaparse';
import { Product } from '@/types/product'; // ajustá el path según tu proyecto

function toBoolean(value: string): boolean {
  return value.trim().toLowerCase() === 'true' || value === '1';
}

function toNumber(value: string): number {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}

export async function fetchSheetData(): Promise<Product[]> {
  const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTXBeCHwoZlEf0-ovfxFwz2iOfmaR1VocpsEZV3XlyYI6iTU-IJZcMdGFkChmWW_aRKTt6bYOmRU8cY/pub?output=csv');
  if (!res.ok) throw new Error('No se pudo obtener el CSV');

  const csvText = await res.text();
  const { data, errors } = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (errors.length) {
    console.error(errors);
    throw new Error('Error al parsear el CSV');
  }

  return data.map((row): Product => ({
    id: row.id,
    title: row.title,
    description: row.description,
    instructor: row.instructor,
    price: toNumber(row.price),
    ratings: toNumber(row.ratings),
    number_ratings: toNumber(row.number_ratings),
    image: row.image,
    category: row.category,
    type: row.type,
    duration: row.duration,
    lessons: toNumber(row.lessons),
    students: toNumber(row.students),
    outstanding: toBoolean(row.outstanding),
  }));
}

