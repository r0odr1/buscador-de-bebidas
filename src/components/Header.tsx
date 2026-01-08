import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../store/useAppStore"

export default function Header() {

  const [searchFilters, setSearchFilters] = useState({
    ingredient: '',
    category: ''
  })

  const categories = useAppStore((state) => state.categories)
  const searchRecipies = useAppStore((state) => state.searchRecipies)
  const showNotification = useAppStore((state) => state.showNotification)

  const { pathname } = useLocation()
  const isHome = useMemo(() => pathname === '/', [pathname])

  const fetchCategories = useAppStore((state) => state.fetchCategories)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(Object.values(searchFilters).includes('')) {
      showNotification({
        text: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    //Consultar las recetas
    searchRecipies(searchFilters)
  }

  return (
    <header className={ isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-900' }>
      <div className="mx-auto container px-5 py-16 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="logotipo" />
          </div>

          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={({isActive}) => `px-4 py-2 rounded-full font-bold uppercase tracking-wide transition-all duration-300 ${isActive
                  ? 'bg-white/20 text-orange-400 shadow-lg'
                  : 'text-white hover:bg-white/10 hover:text-orange-300'
                }`
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/favoritos"
              className={({isActive}) => `px-4 py-2 rounded-full font-bold uppercase tracking-wide transition-all duration-300 ${isActive
                  ? 'bg-white/20 text-orange-400 shadow-lg'
                  : 'text-white hover:bg-white/10 hover:text-orange-300'
                }`
              }
            >
              Favoritos
            </NavLink>

            <NavLink
              to="/generate"
              className={({isActive}) => `px-4 py-2 rounded-full font-bold uppercase tracking-wide transition-all duration-300 ${isActive
                  ? 'bg-white/20 text-orange-400 shadow-lg'
                  : 'text-white hover:bg-white/10 hover:text-orange-300'
                }`
              }
            >
              Generar con IA
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 my-32 p-10 rounded-lg shadow space-y-6 w-full max-w-xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:shadow-orange-500/20 hover:border-white/30"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white/90 uppercase font-extrabold text-lg tracking-wide"
              >
                Nombre o Ingredientes
              </label>

              <input
                id="ingredient"
                type="text"
                name="ingredient"
                className="bg-white/10 border border-white/20 text-white placeholder-white/60 p-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all duration-300"
                placeholder="Ej. Vodka, Tequila, Café"
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white/90 uppercase font-bold text-sm tracking-wide"
              >
                Categoria
              </label>

              <select
                id="category"
                name="category"
                className="bg-white/10 border border-white/20 text-white p-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all duration-300 appearance-none cursor-pointer"
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value="" className="bg-slate-800 text-white">-- Seleccione --</option>
                {categories.drinks.map(category => (
                  <option
                    value={category.strCategory}
                    key={category.strCategory}
                    className="bg-slate-800 text-white"
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold py-4 rounded-xl uppercase tracking-wide shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/30"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Buscar Recetas
              </span>
            </button>
          </form>
        )}
      </div>
    </header>
  )
}
