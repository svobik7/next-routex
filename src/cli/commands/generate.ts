import { getConfig } from '~/cli/config'
import { queue } from '~/utils/baseUtils'
import { generateFileRoutes } from '../generators/generateFileRoutes'
import { generateLibFiles } from '../generators/generateLibFiles'

/**
 * Runs generator
 */
export const generate = async () => {
  const config = getConfig()
  queue(generateFileRoutes, generateLibFiles)(config)
}
