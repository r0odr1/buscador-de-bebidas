import type { Drink } from "../types"
import { useAppStore } from "../store/useAppStore"

type DrinkCardProps = {
  drink: Drink
}
export default function DrinkCard({drink} : DrinkCardProps) {

  const selectRecipe = useAppStore((state) => state.selectRecipe)

  // Proxy para evitar el bloqueo 403 de hotlinking
  const imageUrl = `https://images.weserv.nl/?url=${encodeURIComponent(drink.strDrinkThumb)}&default=placeholder.jpg`;

  return (
    <div className="group relative bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 hover:border-white/30">
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={`Imagen de ${drink.strDrink}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          decoding="async"
          className="hover:scale-125 transition-transform hover:rotate-2 duration-600"
        />
      </div>

      <div className="p-5 space-y-4">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
        <button
          type="button"
          className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 transform group-hover:scale-105 hover:scale-105"
          onClick={() => selectRecipe(drink.idDrink)}
        >
          <span className="flex items-center justify-center gap-2 uppercase">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Ver Receta
          </span>
        </button>
      </div>
    </div>
  )
}
