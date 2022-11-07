import { render as renderTL } from '@testing-library/vue'
import type { RenderOptions, RenderResult } from '@testing-library/vue'
import { createI18n } from 'vue-i18n'

export type CustomRenderOptions = RenderOptions & {
  myOption?: string
}

const i18n = createI18n({
  legacy: false,
  missingWarn: false,
  fallbackWarn: false,
  messages: {
    en: {},
  },
})

export * from '@testing-library/vue'

export function render(
  TestComponent: any,
  options?: CustomRenderOptions,
): RenderResult {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { myOption, global, ...restOptions } = options || {}
  const customRenderOptions = {
    ...restOptions,
    global: {
      ...global,
      plugins: [...(global?.plugins || []), i18n],
    },
  }
  return renderTL(TestComponent as any, { ...customRenderOptions })
}

