<template>
  <q-page class="q-pa-md">
    <header v-if="component !== 4">
      <h4 class="text-h4">Wellcom back!</h4>
      <h6 class="text-caption">Sign in to access your account.</h6>
      <h6 class="text-caption q-mb-lg">Not registered? <router-link to="/personal-auth">Create an account</router-link>
      </h6>

      <TabChange v-model:component="component" />
    </header>

    <main>
      <component
        :is="components[component]"
        v-model:component="component"
        v-model:userDetail="userDetail"></component>
    </main>

    <AuthFooter v-model:component="component" />
  </q-page>
</template>

<script setup>
import { defineAsyncComponent, ref, shallowRef } from 'vue';
import TabChange from '../TabChange.vue';
import AuthFooter from '../AuthFooter.vue';

const component = ref(0)
const components = shallowRef({
  0: defineAsyncComponent(() => import('./PhoneLogin.vue')),
  1: defineAsyncComponent(() => import('./EmailLogin.vue')),
  2: defineAsyncComponent(() => import('./WithPhoneOtp.vue')),
  3: defineAsyncComponent(() => import('./WithEmailOtp.vue')),
  4: defineAsyncComponent(() => import('./OtpLogin.vue'))
})
const userDetail = ref({
  username: null,
  password: null,
  phone_number: null,
  email: null
})

const tab = ref(['Phone', 'Email']);
</script>

<style lang="scss" scoped>
header {
  text-align: center;

  h4 {
    font-size: 2rem;
    margin: 20px 0;
  }
}

footer {
  > div:nth-child(1) {
    body.screen--lg & {
      margin-bottom: 15px;
    }

    :deep(.q-separator) {
      overflow: hidden;
      width: 100%;
      flex-shrink: 1;
      background-color: $grey-100;
    }

    span {
      color: $grey-300;
      letter-spacing: 0;
    }
  }

  :deep(.q-icon) {
    order: -1;
  }

  :deep(.q-btn__content) span {
    flex: 1;
  }
}
</style>
