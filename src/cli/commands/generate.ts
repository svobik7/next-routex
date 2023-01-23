import { getConfig } from '../config'
import { createStructure } from '../utils/createStructure'

export const generate = async () => {
  const config = getConfig()
  createStructure(config)
}
