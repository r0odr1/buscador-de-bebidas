import { useMemo } from "react"
import { useAppStore } from "../store/useAppStore"
import DrinkCard from "../components/DrinkCard"

export default function IndexPage() {

  const drinks = useAppStore((state) => state.drinks)

  const hasDrinks =  useMemo(() => drinks.drinks.length, [drinks])


  return (
    <>
      <div className="text-center mb-6">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl tracking-tight"
          >
            Recetas
          </h1>
          <p className="text-slate-700 text-lg ax-w-md mx-auto leading-relaxed">
            Descubre cocktails increíbles
          </p>
        </div>

      {hasDrinks ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-6 gap-6">
          {drinks.drinks.map( (drink) => (
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>

      ) : (
        <div className="flex flex-col items-center justify-center py-5">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 shadow-2xl max-w-2xl w-full text-center hover:border-white/20 transition-all duration-300">
              <div className="mb-5 animate-bounce">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.5 7.5L12 10l2.5-2.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 12l2.5 2.5L15 12" />
                </svg>
              </div>

              <p className="text-slate-700 text-3xl font-extrabold mb-3">
                ¿Listo para mezclar?
              </p>

              <p className="text-slate-700 text-lg  max-w-md mx-auto leading-relaxed">
                No hay resultados aún. Usa el formulario de arriba para buscar recetas increíbles.
              </p>

              <div className="mt-8 flex justify-center">
                <div className="w-16 h-1 bg-linear-to-r from-transparent via-orange-400 to-transparent rounded-full" />
              </div>
            </div>
          </div>
      )}
    </>
  )
}
