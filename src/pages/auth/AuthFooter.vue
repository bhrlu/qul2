<template>
  <footer
    class="q-mt-md"
    v-if="component !== 2">
    <div class="flex items-center justify-between no-wrap">
      <q-separator />
      <span class="q-px-xs text-overline">OR</span>
      <q-separator />
    </div>

    <q-btn
      color="negative"
      label="Sing up with google"
      class="full-width button-border-radius button-font-weight"
      size="14px"
      padding="12px 32px"
      align="center"
      no-caps
      outline>
      <q-icon
        name="mail"
        class="self-end" />
    </q-btn>

    <div>
      <h6 class="text-subtitle2">
        By creating an account, you agree to our
        <router-link to="#"> Privacy Policy </router-link>
        and
        <span>Electronic communication Policies</span>.
      </h6>
    </div>
  </footer>
</template>

<script setup>
const props = defineProps({
  component: {
    type: Number
  }
})
</script>

<style lang="scss" scoped>
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

  > div:nth-child(3) {
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
}
</style>
