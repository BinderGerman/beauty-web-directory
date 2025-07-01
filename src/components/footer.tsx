export default function Footer() {
  return (
    <footer className="mt-16 py-8 border-t border-line-light">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
        <div>
          <h3 className="text-2xl text-primary font-serif font-bold mb-4">BeautyEdu</h3>
          <p className="text-sm text-muted-foreground font-sans">Tu directorio para los mejores cursos online de belleza y estética.</p>
        </div>
        <div>
          <h4 className="text-primary text-lg font-serif font-semibold mb-4">Enlaces rápidos</h4>
          <ul className="space-y-2">
            <li><a href="/courses" className="text-muted-foreground">Todos los Cursos</a></li>
            <li><a href="/categories" className="text-muted-foreground">Categorías</a></li>
            <li><a href="/featured" className="text-muted-foreground">Cursos Destacados</a></li>
            <li><a href="/new" className="text-muted-foreground">Nuevas Adiciones</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-primary text-lg font-serif font-semibold mb-4">Categorías</h4>
          <ul className="space-y-2">
            <li><a href="/categories/nails" className="text-muted-foreground">Arte de Uñas y Diseño</a></li>
            <li><a href="/categories/makeup" className="text-muted-foreground">Maquillaje</a></li>
            <li><a href="/categories/skincare" className="text-muted-foreground">Cuidado de la Piel</a></li>
            <li><a href="/categories/hair" className="text-muted-foreground">Estilismo de Cabello</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-primary text-lg font-serif font-semibold mb-4">Contáctanos</h4>
          <ul className="space-y-2">
            <li><a href="/contact" className="text-muted-foreground">Contacto</a></li>
            <li><a href="/about" className="text-muted-foreground">Acerca de</a></li>
            <li><a href="/privacy" className="text-muted-foreground">Política de Privacidad</a></li>
            <li><a href="/terms" className="text-muted-foreground">Términos de Servicio</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-4 border-t border-line-light text-center">
        <p className="text-[12px] font-mono text-muted-foreground">&copy; {new Date().getFullYear()} BeautyEdu. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}