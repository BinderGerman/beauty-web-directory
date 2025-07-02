/* export default async function getCourses() {
  const csv = await fetch(
    process.env.GOOGLE_SHEET_URL! 
  )
   .then((res) => res.text())
  const products = csv
    .split("\n")
    .slice(1)
    .map((row: string) => {
      const [id, title, description, instructor, price, valuations, number_valuations, image, category, type, duration, lessons, students, outstanding] = row.split(",");
      return {
        id, title, description, instructor, price: Number(price), valuations: Number(valuations), number_valuations: Number(number_valuations), image, category, type, duration, lessons, students, outstanding
      }
    })
    
  return products;
} */

// lib/fetchSheetData.ts
import Papa from 'papaparse';

export async function fetchSheetData() {
  const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTXBeCHwoZlEf0-ovfxFwz2iOfmaR1VocpsEZV3XlyYI6iTU-IJZcMdGFkChmWW_aRKTt6bYOmRU8cY/pub?output=csv');

  if (!res.ok) throw new Error('No se pudo obtener el CSV');

  const csvText = await res.text();

  const { data, errors } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (errors.length) {
    console.error(errors);
    throw new Error('Error al parsear el CSV');
  }

  return data as Record<string, string>[];
}
