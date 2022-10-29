<template>
  <main>
    <q-icon
      name="task_alt"
      color="positive" />

    <h5 class="text-h5">Your request is under review</h5>

    <h6 class="text-subtitle1">Your company account creation request is being reviewed
      And after confirmation, you can access your management panel, login to your account to view the status</h6>

    <q-btn
      color="secondary"
      label="Login"
      class="full-width button-font-weight"
      padding="12px 32px"
      align="center"
      no-caps
      @click="lastPage" />
  </main>
</template>

<script setup>
const props = defineProps({
  component: {
    type: Number,
    default: 3,
  }
})

const emit = defineEmits(["update:component"])
const lastPage = () => {
  emit("update:component", 4)
}
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;

  .q-icon {
    font-size: 86px;
    background-color: $grey-3;
    border-radius: 99%;
    padding: 10px;

    body.screen--lg & {
      font-size: 118px;
    }
  }

  h5 {
    margin: 25px 0 0 0;
    color: #343c44;
    line-height: 1.4rem;
    text-align: center;
  }

  h6 {
    line-height: 1.4rem;
    margin: 20px 0 25px 0;
    text-align: center;
    color: #85949f;
    letter-spacing: 0.6px;
  }
}
</style>
