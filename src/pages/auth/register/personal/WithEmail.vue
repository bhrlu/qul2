<template>
  <h6
    class="text-subtitle2"
    style="margin:20px 0 0 0;">Your email address</h6>

  <q-form
    class="q-gutter-y-sm"
    @submit.prevent="submitForm">
    <q-input
      dense
      outlined
      bottom-slots
      no-error-icon
      lazy-rules
      placeholder="example@Company.com"
      :rules="ruleEmail"
      :error-message="statusCode"
      :error="!!statusCode"
      v-model="email">
      <template v-slot:prepend>
        <q-icon
          name="alternate_email"
          color="grey" />
      </template>
    </q-input>

    <q-btn
      type="submit"
      color="secondary"
      label="Continue to sign up"
      class="full-width button-font-weight"
      padding="12px 32px"
      align="center"
      no-caps />
  </q-form>
</template>

<script setup>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { OTP } from 'src/base-url';

const props = defineProps({
  component: {
    type: Number,
    defualt: 1
  },
  userDetail: {
    type: Object,
    default: () => { }
  }
})
const emit = defineEmits(['update:component', 'update:userDetail'])

// SUBMIT FORM
const email = ref('')
const ruleEmail = ref([
  val => (val !== null && val !== '') || 'Please enter your Email',
  (val, rules) => rules.email(val) || 'Please enter a valid email address'
])
const statusCode = ref('')
const submitForm = () => {
  api.post(OTP.emailSendToken, {
    email_address: email.value,
    otp_type: "register"
  })
    .then(res => {
      emit("update:userDetail", { ...props.userDetail, email_address: email.value })
      emit("update:component", 2)
      console.log(res.data);
    })
    .catch(err => {
      if (err.response.status === 403) {
        statusCode.value = err.response.data.detail
      }
      else {
        statusCode.value = err.response.data.msg
      }
      console.log({ ...err });
    })
}
</script>

<style lang="scss" scoped>
:deep(.q-field__marginal) {
  height: 48px;
}

:deep(.q-field__control) {
  height: 48px;
}

:deep(.q-field__prepend) {
  order: 1;
}

:deep(.q-field__bottom) {
  padding-left: 0;
  padding-top: 5px;
}

:deep(.q-icon) {
  margin-right: 0;
}
</style>
