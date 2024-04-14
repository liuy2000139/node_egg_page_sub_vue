// 正常工作。
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $qiankun: {
      [key: string]: any
    }
  }
}
