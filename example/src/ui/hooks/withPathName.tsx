import type { ComponentType } from 'react'

export interface WithFilePathProps {
  filePath: string
}

export function withFileName<T extends WithFilePathProps = WithFilePathProps>(
  WrappedComponent: ComponentType<T>
) {
  // TODO: adjust this so that it can be used even in nested layouts like /en/account/layout.ts
  const filePath = __filename

  const ParentComponent = (props: Omit<T, keyof WithFilePathProps>) => {
    return <WrappedComponent {...(props as T)} filePath={filePath} />
  }

  ParentComponent.displayName = `withPathName(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`

  return ParentComponent
}
