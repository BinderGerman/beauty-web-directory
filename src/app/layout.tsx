import type { Metadata } from "next";
import { Inter, Merriweather, Roboto_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "sonner"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
}); 

export const metadata: Metadata = {
  title: "BeautyEdu - Directorio de Cursos de Belleza",
  description: "El directorio más completo de cursos y recursos de belleza en español",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${merriweather.variable} ${robotoMono.variable} antialiased container min-h-screen grid grid-rows-[auto_1fr_auto] m-auto bg-background `}
      >
        <Header />
        {children}
        <Footer />
        <Toaster position="bottom-right" richColors />  
      </body>
    </html>
  );
}
