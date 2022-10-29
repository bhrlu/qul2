<template>
  <main>
    <q-icon
      name="check_circle_outline"
      color="positive" />

    <h5 class="text-h5">Your account has been created successfully</h5>

    <h6 class="text-subtitle1">
      Your account information has been sent to <br />
      <span>{{props.userDetail.phone_number}}</span>
      <span>{{props.userDetail.email_address}}</span>
      <br />
      and you can log in to your account
    </h6>

    <q-btn
      color="secondary"
      to="/login"
      label="Login"
      class="full-width button-font-weight"
      padding="12px 32px"
      align="center"
      no-caps />
  </main>
</template>

<script setup>
const props = defineProps({
  component: {
    type: Number,
    default: 4,
  },
  userDetail: {
    type: Object,
    default: () => { }
  }
})

const emit = defineEmits(["update:component"])
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;

  .q-icon {
    font-size: 96px;

    body.screen--lg & {
      font-size: 128px;
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

    span {
      color: $link;
    }

    br {
      body.screen--lg & {
        display: none;
      }
    }
  }
}
</style>
