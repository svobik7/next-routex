import type { Route } from '~/types'
import { queue } from '~/utils/queue'
import { generateDeclarationFileFactory } from '../generators/generateDeclarationFile'
import { generateLocalizedFilesFactory } from '../generators/generateLocalizedFiles'
import { generateRouterSchemaFileFactory } from '../generators/generateRouterSchemaFile'
import type { Config, Rewrite } from '../types'
import { getOrigins } from '../utils/getOrigins'
import { getRewrites } from '../utils/getRewrites'
import { getRoute, isRoute } from '../utils/getRoute'
import { getRouterSchema } from '../utils/getRouterSchema'

type ExecuteParams = { rewrites: Rewrite[]; routes: Route[] }

export function generateFactory(config: Config) {
  const { defaultLocale, locales, getOriginAbsolutePath } = config

  const generateLocalizedFiles = generateLocalizedFilesFactory(config)
  const generateDeclarationFile = generateDeclarationFileFactory(config)
  const generateRouterFile = generateRouterSchemaFileFactory(config)

  return async () => {
    // eslint-disable-next-line no-console
    console.log('\x1b[33mnext-roots', '\x1b[37m- generator in progress ...')

    const origins = await getOrigins({
      locales,
      defaultLocale,
      dirName: getOriginAbsolutePath(),
    })

    const rewrites = origins.flatMap(getRewrites)
    const routes = rewrites.flatMap(getRoute).filter(isRoute)

    const routerSchema = getRouterSchema({ routes, defaultLocale, locales })

    const execute = queue<void>(
      () => generateLocalizedFiles(rewrites),
      () => generateDeclarationFile(routerSchema),
      () => generateRouterFile(routerSchema)
    )

    return execute()
  }
}
