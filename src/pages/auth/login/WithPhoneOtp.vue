<template>
  <main>
    <q-form
      class="q-gutter-y-md q-mt-lg"
      @submit.prevent="submitForm">
      <div class="row q-col-gutter-x-sm no-wrap">
        <q-select
          dense
          outlined
          hide-dropdown-icon
          no-error-icon
          class="col-4"
          :options="mainStore.countries"
          option-value="dial_code"
          v-model="picked"
          @update:model-value="
            (value) => (picked = value.code + ' ' + value.dial_code)
          ">
          <template v-slot:option="countries">
            <q-item v-bind="countries.itemProps">
              <q-item-section avatar>
                <q-img
                  :src="countries.opt.flag_url"
                  style="width: 24px; height: 16px" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ countries.opt.dial_code }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-input
          dense
          outlined
          bottom-slots
          no-error-icon
          :error-message="statusCode"
          :error="!!statusCode"
          lazy-rules
          :rules="ruleNumber"
          mask="### ### ####"
          unmasked-value
          placeholder="Your phone number"
          class="col-8"
          v-model="number" />
      </div>

      <q-btn
        type="submit"
        color="secondary"
        label="Continue to sign up"
        class="full-width button-font-weight"
        padding="12px 32px"
        align="center"
        no-caps />
    </q-form>

    <q-btn
      flat
      no-caps
      class="text-subtitle1 full-width"
      @click="phoneLoginPass">Login with password</q-btn>
  </main>

  <AuthFooter />
</template>

<!-- eslint-disable vue/return-in-computed-property -->
<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "stores/main-store.js";
import { api } from "src/boot/axios";
import { OTP } from "src/base-url";
import AuthFooter from "../AuthFooter.vue";

const mainStore = useMainStore();

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
const picked = ref("US +1");
const pickedNum = computed(() => {
  switch (picked.value.length) {
    case 5:
      return "00" + picked.value.slice(-1) + number.value;
      break;

    case 6:
      return "00" + picked.value.slice(-2) + number.value;
      break;

    case 7:
      return "00" + picked.value.slice(-3) + number.value;
      break;

    case 8:
      return "00" + picked.value.slice(-4) + number.value;
      break;

    case 9:
      return "00" + picked.value.slice(-5) + number.value;
      break;

    default:
      break;
  }
});
const statusCode = ref(null)
const ruleNumber = ref([
  val => (!val == '') || 'Please enter your phone number',
])
const submitForm = () => {
  api.post(OTP.smsSendToken, {
    phone_number: pickedNum.value,
    otp_type: 'login',
  })
    .then(res => {
      emit("update:userDetail", { ...props.userDetail, phone_number: pickedNum.value })
      emit("update:component", 4)
      console.log(res.data);
    })
    .catch(err => {
      if (err.response.status === 403 && 401 && 422 && 404) {
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

  h6 {
    color: $grey-600;
  }

  :deep(.q-field__control) {
    height: 48px;
  }

  :deep(.q-select) {
    width: 100px;
  }

  :deep(.q-input) {
    width: 70.3%;

    body.screen--lg & {
      width: 78.5%;
    }
  }

  :deep(.q-field__marginal) {
    height: 48px;
  }

  :deep(.q-field__native) {
    justify-content: center;
  }

  :deep(.q-field__bottom) {
    padding: 3px 0 0 0;
  }

  :deep(.q-btn) {
    margin-top: 10px;
  }

  > .q-btn:nth-child(3) {
    margin-top: 15px;
    color: $link
  }
:deep(.q-btn) {
  margin: 10px 0 0 0;
  color: $link;
  text-align: center;
}
</style>
