import { Dialog, Transition } from '@headlessui/react';
import { Fragment, type JSX } from 'react';
import { useAppStore } from '../store/useAppStore';
import type { Recipe } from '../types';

export default function Modal() {

  const modal = useAppStore((state) => state.modal)
  const closeModal = useAppStore((state) => state.closeModal)
  const selectedRecipe = useAppStore((state) => state.selectedRecipe)
  const handleClickFavorite = useAppStore((state) => state.handleClickFavorite)
  const favoriteExists = useAppStore((state) => state.favoriteExists)

  const renderIngredients = () => {
    const ingredients : JSX.Element[] = []

    for(let i = 1; i <= 15; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]
      const mesure = selectedRecipe[`strMeasure${i}` as keyof Recipe]

      if(ingredient && mesure) {
        ingredients.push(
          <li key={i} className='list-disc ml-6 text-lg font-normal'>
            {ingredient} - {mesure}
          </li>
        )
      }

    }

    return ingredients
  }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-slate-800/95 backdrop-blur-xl border border-white/20 px-4 pt-5 pb-4 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-8" >

                  {selectedRecipe && (
                    <>
                      <div className=''>
                        <Dialog.Title as="h3" className="text-white text-4xl font-extrabold my-5 text-center">
                            {selectedRecipe.strDrink}
                        </Dialog.Title>

                        <img
                          src={selectedRecipe.strDrinkThumb}
                          alt={`Imagen de ${selectedRecipe.strDrink}`}
                          className='mx-auto w-96 object-cover rounded-xl shadow-2xl border border-white/10 mb-6'
                        />

                        <div className="bg-white/5 rounded-xl p-6 mb-6">
                          <Dialog.Title as="h3" className="text-2xl font-extrabold text-orange-400 mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Ingredientes y Cantidades
                          </Dialog.Title>
                          <p className='text-white space-y-2'> {renderIngredients()} </p>
                        </div>

                        <div className='mb-6'>
                          <Dialog.Title as="h3" className="text-2xl font-extrabold text-orange-400 mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Instrucciones
                          </Dialog.Title>
                          <p className='text-white/90 text-lg leading-relaxed bg-white/5 rounded-xl p-6'>{selectedRecipe.strInstructions}</p>
                        </div>

                        <div className='mt-5 flex gap-4'>
                          <button
                            type='button'
                            className='flex-1 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2'
                            onClick={closeModal}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cerrar
                          </button>

                          <button
                            type='button'
                            className='flex-1 rounded-xl bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2'
                            onClick={() => handleClickFavorite(selectedRecipe)}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {favoriteExists(selectedRecipe.idDrink)
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              }
                            </svg>
                            {favoriteExists(selectedRecipe.idDrink) ? 'Eliminar Favorito' : 'Agregar Favorito'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}