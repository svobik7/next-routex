import fs from 'fs'
import path from 'path'
import { isDirectory } from '~/utils/fs-utils'
import { formatPath } from '~/utils/path-utils'
import type { Origin, RootTranslation } from '../types'

const I18N_FILE_NAMES = ['i18n.mjs', 'i18n.js']

/**
 * Loads and parses i18n from given file
 * @param fileName
 * @returns
 */
async function parse18nFile(
  fileName: string
): Promise<RootTranslation[] | undefined> {
  try {
    const { routeNames, generateRouteNames } = await import(fileName).then(
      (module) => (module.default ? module.default : module)
    )
    return generateRouteNames ? await generateRouteNames() : routeNames
  } catch (err) {
    // console.warn(err)
    return undefined
  }
}

/**
 * Lists all possible i18n files that can be search through when finding translations
 * @param originFileName
 * @returns
 */
function getI18nFileNames(originFileName: string) {
  return I18N_FILE_NAMES.map((fileName) => path.join(originFileName, fileName))
}

/**
 * Loads i18n for current origin file.
 * @param originFileName
 * @returns
 */
async function getI18n(
  originFileName: string
): Promise<RootTranslation[] | undefined> {
  const i18nFileNames = getI18nFileNames(originFileName)
  let i18n = undefined as RootTranslation[] | undefined

  for (const fileName of i18nFileNames) {
    i18n = i18n || (await parse18nFile(fileName))
  }

  return i18n
}

/**
 * Finds origin files that can be localized and copied to app folder
 * @param dirName
 * @returns
 */
function getOriginFiles(dirName: string) {
  return (
    fs
      .readdirSync(dirName)
      // do not include i18n files to copied into app folder
      .filter((itemName) => !itemName.match(/^i18n\.(m?js)$/))
  )
}

type GetOriginsParams = {
  dirName: string
  locales: string[]
  defaultLocale: string
  parentOrigin?: Origin
}

export async function getOrigins({
  dirName,
  locales,
  defaultLocale,
  parentOrigin,
}: GetOriginsParams) {
  const originFiles = getOriginFiles(dirName)
  const origins: Origin[] = []

  for (const fileName of originFiles) {
    const originFileName = path.join(dirName, fileName)

    const origin: Origin = {
      path: formatPath(parentOrigin?.path || '', fileName),
      localizations: locales.map((tl) => ({
        locale: tl,
        path: formatPath(
          parentOrigin?.localizations.find((t) => t.locale === tl)?.path || '',
          fileName
        ),
      })),
    }

    if (isDirectory(originFileName)) {
      const i18n = await getI18n(originFileName)

      const children = await getOrigins({
        defaultLocale,
        locales,
        parentOrigin: {
          ...origin,
          localizations: origin.localizations.map((t) => ({
            ...t,
            path: t.path.replace(
              fileName,
              i18n?.find(({ locale }) => t.locale === locale)?.path || fileName
            ),
          })),
        },
        dirName: originFileName,
      })

      origins.push(...children)
    } else {
      origins.push(origin)
    }
  }

  return origins
}
