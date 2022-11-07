import { useToast } from 'vue-toast-notification'

export * from './products'
export * from './basket'

// TODO: Use index.ts only to combine imports, not to add extra code

const url = 'https://euricom-test-api.herokuapp.com/'
const toast = useToast()

export const responseHandling = (response: Response) => {
  if (!response.ok) {
    toast.error('Oops.. something went wrong')
    throw new Error(response.statusText)
  }
  return response.json()
}

export const get = async <T>(path: string): Promise<T> => {
  const response = await fetch(url + path)
  return responseHandling(response)
}

export const post = async <T>(path: string, obj: object): Promise<T> => {
  const response = await fetch(url + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  return responseHandling(response)
}

export const put = async <T>(path: string, obj: object): Promise<T> => {
  const response = await fetch(url + path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  return responseHandling(response)
}

export const patch = async <T>(path: string, obj: object): Promise<T> => {
  const response = await fetch(url + path, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  return responseHandling(response)
}

export const remove = async <T>(path: string): Promise<T> => {
  const response = await fetch(url + path, {
    method: 'DELETE',
  })
  return responseHandling(response)
}
