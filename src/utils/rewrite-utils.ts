import type { Rewrite } from '~/cli/types'

export function isDynamicRewrite(rewrite: Rewrite) {
  return !!rewrite.originPath.match(/\[\w+\]/g)
}
