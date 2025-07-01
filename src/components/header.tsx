import Link from "next/link";

export default function Header() {
  return (
    <header className="py-6">
      <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl text-primary font-serif font-bold hover:text-accent"
          >
            BeautyEdu
          </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="font-serif text-lg text-foreground hover:text-accent font-semibold transition"
          >
            Inicio
          </Link>
          <Link
            href="/courses"
            className="font-serif text-lg text-foreground hover:text-accent font-semibold transition"
          >
            Cursos
          </Link>
          <Link
            href="/categories"
            className="font-serif text-lg text-foreground hover:text-accent font-semibold transition"
          >
            Categorías
          </Link>
          <Link
            href="/submit"
            className="font-serif text-lg text-foreground hover:text-accent font-semibold transition"
          >
            Enviar Curso
          </Link>
          <Link
            href="/about"
            className="font-serif text-lg text-foreground hover:text-accent font-semibold transition"
          >
            Acerca de
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <button
            id="menuButton"
            className="font-serif text-lg text-foreground hover:text-accent "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
      <div
        id="mobileMenu"
        className="hidden md:hidden pt-4 pb-2 border-t border-line-light mt-4"
      >
        <Link
          href="/"
          className="block py-2 font-serif text-lg text-foreground hover:text-accent font-semibold"
        >
          Inicio
        </Link>
        <Link
          href="/courses"
          className="block py-2 font-serif text-lg text-foreground hover:text-accent font-semibold"
        >
          Cursos
        </Link>
        <Link
          href="/categories"
          className="block py-2 font-serif text-lg text-foreground hover:text-accent font-semibold"
        >
          Categorías
        </Link>
        <Link
          href="/submit"
          className="block py-2 font-serif text-lg text-foreground hover:text-accent font-semibold"
        >
          Enviar Curso
        </Link>
        <Link
          href="/about"
          className="block py-2 font-serif text-lg text-foreground hover:text-accent font-semibold"
        >
          Acerca de
        </Link>
      </div>
    </header>
  );
}
