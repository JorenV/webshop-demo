import { render as renderTL } from '@testing-library/vue'
import type { RenderOptions, RenderResult } from '@testing-library/vue'
import { createI18n } from 'vue-i18n'
import { VueQueryPlugin } from '@tanstack/vue-query'

export type CustomRenderOptions = RenderOptions & {
  myOption?: string
  i18n?: ReturnType<typeof createI18n>
}

export * from '@testing-library/vue'

export function render(
  TestComponent: any,
  options?: CustomRenderOptions,
): RenderResult {
  const i18n = options?.i18n || createI18n({
    legacy: false,
    missingWarn: false,
    fallbackWarn: false,
    messages: {
      en: {},
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { myOption, global, ...restOptions } = options || {}
  const customRenderOptions = {
    ...restOptions,
    global: {
      ...global,
      plugins: [...(global?.plugins || []), i18n, VueQueryPlugin],
    },
  }
  return renderTL(TestComponent as any, { ...customRenderOptions })
}

