import { afterAll, afterEach, beforeAll } from 'vitest'
import { setupServer } from 'msw/node'
import 'whatwg-fetch'

export const server = setupServer()

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen({
    onUnhandledRequest: 'error',
  })
})
afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close()
})

afterEach(() => {
  // Make sure all previous handlers are resetted at end
  server.resetHandlers()
})
