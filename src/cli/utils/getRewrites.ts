import { formatPath } from '~/utils/path-utils'
import type { Origin, Rewrite } from '../types'

export function getRewrites(origin: Origin): Rewrite[] {
  return origin.localizations.map((l) => ({
    originPath: origin.path,
    localizedPath: formatPath(l.locale, l.path),
  }))
}
