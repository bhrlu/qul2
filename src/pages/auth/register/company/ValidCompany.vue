<template>
  <main>
    <div>
      <q-icon
        name="verified_user"
        color="positive"
        size="85px" />
    </div>

    <div class="row justify-between">
      <div
        class="col-3"
        v-for="tab in tabs"
        :key="tab">
        <h6 class="text-caption">{{ tab }}</h6>
        <div></div>
      </div>
    </div>

    <div class="q-mt-lg q-pa-md">
      <div class="row items-center q-mb-sm">
        <q-icon
          name="pending_actions"
          size="24px" />
        <h6 class="text-h5 q-pl-xs">Validating</h6>
      </div>
      <p class="text-subtitle1">
        We are checking and validating your company information, and we are trying to complete this process as soon as
        possible, we will contact you if we need more information.
      </p>
    </div>

    <div class="row items-center justify-center q-mt-md">
      <q-icon
        name="logout"
        size="24px"
        color="negative" />
      <h6 class="text-h6 text-negative q-pl-xs">Logout</h6>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const tabs = ref(['sign up', 'verify', 'complete info', 'review'])
</script>

<style lang="scss" scoped>
main {
  margin: 0 auto;

  > div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 152px;
    height: 152px;
    background-color: $grey-2;
    border-radius: 9999%;
  }

  > div:nth-child(2) {
    margin-top: 10px;

    :deep(.col-3) {
      width: 24%;
    }

    div {
      h6 {
        color: $success-300;
        text-align: center;

        body.screen--lg & {
          font-size: 14px;
        }
      }

      > :nth-child(2) {
        width: 100%;
        border: 2px solid $success-200;
      }
    }

    :last-child {
      h6 {
        color: $warning;
      }

      > :nth-child(2) {
        border-color: $warning;
      }
    }
  }

  > div:nth-child(3) {
    background-color: $warning-300;
    color: $warning-400;
    border-radius: 7px;
  }
}
</style>
