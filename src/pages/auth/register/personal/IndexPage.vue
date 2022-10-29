<template>
  <q-page class="q-pa-md">
    <header
      class="q-mb-lg"
      v-if="component === 0 || component === 1">
      <h5 class="text-h5">Sign up for an account</h5>
      <h6 class="text-subtitle2">
        Already have an accout?
        <router-link to="#">Sign in</router-link>
      </h6>

      <TabChange v-model:component="component" />
    </header>

    <component
      :is="components[component]"
      v-model:component="component"
      v-model:user-detail="userDetail"></component>

    <AuthFooter v-model:component="component" />
  </q-page>
</template>

<script setup>
import { ref, defineAsyncComponent, shallowRef } from "vue";
import TabChange from "../../TabChange.vue";
import AuthFooter from '../../AuthFooter.vue'

// STEP BY STEP COMPONENTS
const component = ref(0);
const components = shallowRef({
  0: defineAsyncComponent(() => import("./WithPhone.vue")),
  1: defineAsyncComponent(() => import('./WithEmail.vue')),
  2: defineAsyncComponent(() => import("./OtpToken.vue")),
  3: defineAsyncComponent(() => import("./SuccessPage.vue"))
});

const userDetail = ref({
  phone_number: null,
  email_address: null,
  otp_token: null,
});
</script>

<style lang="scss" scoped>
header {
  :deep(.router-link-active) {
    color: $link;
  }

  h5 {
    margin: 0 0 25px 0;
    text-align: left;

    body.screen--lg & {
      font-size: 2rem;
      margin: 0 0 30px 0;
    }
  }

  h6 {
    margin: 0 0 20px 0;
  }
}
</style>

