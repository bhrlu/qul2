import { boot } from 'quasar/wrappers'
import { useMainStore } from 'stores/main-store'

export default boot(({ router, redirect }) => {
  const store = useMainStore()

  router.beforeEach(async (to, from) => {
    if (to.meta.requiresAuth && !store.token) {
      redirect({ name: 'Login' })
    }
  })
})
