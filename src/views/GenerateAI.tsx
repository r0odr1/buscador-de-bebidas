import type { FormEvent } from "react";
import { useAppStore } from "../store/useAppStore";

export default function GenerateAI() {

  const showNotification = useAppStore(state => state.showNotification)
  const generateRecipe = useAppStore(state => state.generateRecipe)
  const recipe = useAppStore(state => state.recipe)
  const isGenerating = useAppStore(state => state.isGenerating)
  const activeModel = useAppStore(state => state.activeModel)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const prompt = form.get('prompt') as string

    if(prompt.trim() === '') {
      showNotification({
        text: 'La búsqueda no puede ir vacia',
        error: true
      })

      return
    }

    await generateRecipe(prompt)
  }


  return (
    <>
      <div className="text-center mb-5">
          <h1 className="text-6xl font-black bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
            Generar Receta con IA
          </h1>
          <p className="text-lg mt-4">
            Crea cocktails únicos con inteligencia artificial
          </p>
        </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
        <form
          onSubmit={handleSubmit}
          className='flex flex-col space-y-3 py-10'
        >
          <div className="relative">
            <input
              name="prompt"
              id="prompt"
              className="bg-white/10 border border-white/20 text-white placeholder-white/50 p-5 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all duration-300 pr-16"
              placeholder="Describe tu cocktail ideal. Ej: Bebida con Tequila y Fresa, dulce y refrescante"
            />
            <button
              type="submit"
              aria-label="Enviar"
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 ${isGenerating ? "cursor-not-allowed opacity-50 bg-white/10" : "bg-linear-to-r from-purple-500 to-pink-500 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30"}`}
              disabled={isGenerating}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          </div>
        </form>

        {isGenerating && <p className="text-center animate-blink">Generando con {activeModel || 'IA'}...</p>}

        <div className="py-3 whitespace-pre-wrap">
          {recipe && (
            <div className="mt-8 bg-white/10 border border-white/10 rounded-xl p-6 whitespace-pre-wrap leading-relaxed">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                <span className="text-orange-400 font-bold">Receta Generada</span>
              </div>
              {recipe}
            </div>
          )}
        </div>
      </div>

    </>
  )
}