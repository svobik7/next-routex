import path from 'path'
import { File, Rewrite } from '../../types'
import { getPathDepth, getPathName } from '../utils/pathUtils'

export function getFiles(rewrites: Rewrite[]): File[] {
  const parentMatcher = ({ lintelPath }: Rewrite) => {
    const expectedParentTo = path.dirname(lintelPath)
    return (fileRewrite: File) => fileRewrite.to === expectedParentTo
  }

  const toFile = (acc: File[], rewrite: Rewrite) => {
    const findParent = parentMatcher(rewrite)
    const parentFile = acc.find(findParent)

    const file = {
      source: rewrite.originPath,
      from: getPathName(
        parentFile
          ? rewrite.originPath.replace(parentFile.source, parentFile.to)
          : rewrite.originPath
      ),
      to: rewrite.lintelPath,
    }

    return [...acc, file]
  }

  const sortedRewrites = rewrites.sort(
    ({ originPath: a }, { originPath: b }) => getPathDepth(a) - getPathDepth(b)
  )

  return sortedRewrites.reduce(toFile, [] as File[])
}
