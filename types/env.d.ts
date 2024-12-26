declare namespace NodeJS {
  interface ProcessEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_BASE_URL: string
    readonly VITE_USE_MOCK: boolean
    readonly VITE_APP_API_URL: string
  }
}

/** 声明 vite 环境变量的类型（如果未声明则默认是 any） */
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_BASE_URL: string
  readonly VITE_USE_MOCK: boolean
  readonly VITE_APP_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
