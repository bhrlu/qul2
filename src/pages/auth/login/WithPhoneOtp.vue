<template>
  <main>
    <q-form
      class="q-mt-md"
      @submit.prevent="submitForm">
      <h6 class="text-caption">Phone</h6>
      <div class="row no-wrap q-gutter-x-sm">
        <q-select
          dense
          hide-dropdown-icon
          no-error-icon
          outlined
          class="col-3 q-ml-sm"></q-select>

        <q-input
          dense
          outlined
          bottom-slots
          no-error-icon
          lazy-rules
          placeholder="Your phone number"
          :rules="ruleNumber"
          :error-message="statusCode"
          :error="!!statusCode"
          class="col-9"
          v-model="number">
          {{ number }}
          <template v-slot:prepend>
            <q-icon
              name="phone_iphone"
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
        @click="phoneLoginPass">Login with password</q-btn>
    </q-form>
  </main>

  <AuthFooter />
</template>

<script setup>
import { ref } from "vue";
import { api } from "src/boot/axios";
import { LOGIN } from "src/base-url";
import AuthFooter from "../AuthFooter.vue";

const props = defineProps({
  component: {
    type: Number,
    default: 0,
  },
  userDetail: {
    type: Object,
    default: () => { }
  }
});
const emit = defineEmits(["update:component", "update:userDetail"]);
const phoneLoginPass = () => {
  emit('update:component', 0)
}
// SUBMIT FORM
const number = ref('');
const statusCode = ref(null)
const ruleNumber = ref([
  val => (!val == '') || 'Please enter your phone number',
])
const submitForm = () => {
  api.post(LOGIN.otpSmsToken, {
    phone_number: number.value,
    otp_type: 'login',
  })
    .then(res => {
      emit("update:userDetail", { ...props.userDetail, phone_number: number.value })
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
  width: 70.3%;

  body.screen--lg & {
    width: 78.5%;
  }
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
