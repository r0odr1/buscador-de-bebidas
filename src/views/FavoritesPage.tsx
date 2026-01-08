import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../store/useAppStore"

export default function FavoritesPage() {

  const favorites = useAppStore((state) => state.favorites)
  const hasFavorites = useMemo(() => favorites.length, [favorites])

  return (
    <>
      <h1
        className="text-6xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-orange-400 to-pink-500"
      >
        Favoritos
      </h1>

      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">

          {favorites.map( (drink) => (
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <path stroke="url(#heart-gradient)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"  />
              </svg>
          </div>
          <p className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-orange-400 to-pink-500">Los favoritos se mostrarán aquí</p>
          <p className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-orange-400 to-pink-500">¡Empieza a explorar recetas!</p>
        </div>
      )}
    </>
  )
}
