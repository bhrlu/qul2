import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: '/api' })

function GET_TOKEN (key) {
  return LocalStorage.getItem(key) || null
}

api.interceptors.request.use(config => {
  const TOKEN = GET_TOKEN('token')

  // Do something before request is sent
  config.headers.common.Authorization = `bearer ${TOKEN}`

  return config
}, error => {
  // Do something with request error

  return Promise.reject(error)
})


export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios

  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
