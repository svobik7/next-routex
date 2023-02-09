import { router } from './router'

type RouterService = typeof router

type InitOptions = {
  router: RouterService
}

class ServerService {
  private routerEngine: RouterService

  constructor({ router }: InitOptions) {
    this.routerEngine = router
  }

  get router() {
    return this.routerEngine
  }

  get currentLocale() {
    return this.router.getLocale() || this.router.getDefaultLocale()
  }

  setFilePath(pathName: string) {
    this.router.setLocale(pathName.split('/app/')[1].split('/').at(0) || '')
  }
}

export const server = new ServerService({
  router,
})
