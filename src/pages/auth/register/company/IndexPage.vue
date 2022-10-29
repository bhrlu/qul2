<template>
  <q-page class="q-pa-md">
    <component
      :is="components[component]"
      v-model:component="component"
      v-model:company-detail="companyDetail">
    </component>

    <footer v-if="component !== 4">
      <h6 class="text-subtitle2">
        By creating an account, you agree to our
        <router-link to="#"> Privacy Policy </router-link>
        and
        <span>Electronic communication Policies</span>.
      </h6>
    </footer>
  </q-page>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'

// STEP BY STEP COMPONENTS
const components = {
  0: defineAsyncComponent(() => import('../company/WithEmail.vue')),
  1: defineAsyncComponent(() => import('../company/EmailToken.vue')),
  2: defineAsyncComponent(() => import('../company/CompanyInfo.vue')),
  3: defineAsyncComponent(() => import('../company/SuccessPage.vue')),
  4: defineAsyncComponent(() => import('../company/ValidCompany.vue'))
}
const component = ref(0)
const companyDetail = ref({
  email_address: null,
  email_token: null,
  company_name: null,
  field_of_activity: null,
  country: null,
  state: null,
  company_website: "www.example.com",
  legal_business_name: "Dell's Corporation",
  financial_institution_number: '12345',
})
</script>

<style lang="scss" scoped>
footer {
  h6 {
    line-height: 20px;
    margin-top: 1.5rem;
    color: $grey-300;

    :deep(.router-link-active) {
      color: $link;
      text-decoration: none;
    }

    span {
      color: $grey-400;
    }
  }
}
</style>
