<template>
  <main>
    <q-form
      class="q-mt-md"
      @submit.prevent="submitForm">

      <div>
        <h6 class="text-caption">Email</h6>
        <q-input
          dense
          outlined
          bottom-slots
          no-error-icon
          lazy-rules
          :rules="ruleEmail"
          placeholder="example@Company.com"
          v-model="email">
          <template v-slot:prepend>
            <q-icon
              name="alternate_email"
              color="grey" />
          </template>
        </q-input>
      </div>

      <q-btn
        type="submit"
        color="secondary"
        label="Login"
        class="full-width button-font-weight"
        padding="12px 32px"
        align="center" />

      <q-btn
        flat
        no-caps
        class="text-subtitle1 full-width"
        @click="emailLoginPass">Login with password</q-btn>
    </q-form>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { api } from "src/boot/axios";
import { LOGIN } from "src/base-url";

const props = defineProps({
  component: {
    type: Number,
    default: 3,
  },
  userDetail: {
    type: Object,
    default: () => { }
  }
});
const emit = defineEmits(["update:component", "update:userDetail"]);
const emailLoginPass = () => {
  emit('update:component',1)
}
// SUBMIT FORM
const  email = ref('');
const ruleEmail = ref([
  val => (val !== null && val !== '') || 'Please enter your Email',
  (val, rules) => rules.email(val) || 'Please enter a valid email address'
])
const statusCode = ref(null)
const submitForm = () => {
  api.post(LOGIN.otpEmailToken, {
    email: email.value,
    otp_type: 'login',
  })
    .then(res => {
      emit("update:userDetail", { ...props.userDetail, email: email.value })
      emit("update:component", 1)
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
  :deep(.q-input) {
    width: 100%
  }

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

  :deep(.q-field__append) {
    margin-right: 6px;
  }

  :deep(.q-icon) {
    margin-right: 0;
  }

  :deep(.q-btn) {
    margin: 10px 0 0 0;
    color: $link;
    text-align: center;
  }
</style>

