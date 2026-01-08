import { MODELS, type AIModel } from '../config/models'

export function getModels(): readonly AIModel[] {
  return MODELS
}
