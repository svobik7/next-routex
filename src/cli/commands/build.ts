import { getConfig } from '../config'
import { buildStructure } from '../builders/buildStructure'

export const build = async () => {
  const config = getConfig()
  buildStructure(config)
}
