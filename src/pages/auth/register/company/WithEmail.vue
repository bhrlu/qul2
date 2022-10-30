<template>
  <main>
    <q-btn
      no-caps
      flat
      to="/personal-auth"
      label="Back"
      icon="arrow_back" />

    <div>
      <q-img src="../../../../assets/images/company.png" />
      <h5 class="text-h5">Company registration</h5>
      <h6 class="text-caption">Already have an account? <router-link to="#">Sign in</router-link>
      </h6>
    </div>

    <h6
      class="text-subtitle2"
      style="margin-top:20px; margin-bottom: 10px;">Company Email</h6>
    <q-form
      class="q-gutter-y-sm"
      @submit.prevent="submitForm">
      <q-input
        no-error-icon
        outlined
        dense
        placeholder="example@Company.com"
        lazy-rules
        :rules="ruleEmail"
        :error-message="statusCode"
        :error="!!statusCode"
        v-model="email">
        <template v-slot:prepend>
          <q-icon
            name="login"
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
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import { OTP } from 'src/base-url';

const props = defineProps({
  component: {
    type: Number,
    default: 0
  },
  companyDetail: {
    type: Object,
    default: () => { }
  }
})
const emit = defineEmits(["update:component", "update:companyDetail"])

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
      emit("update:companyDetail", { ...props.companyDetail, email_address: email.value })
      emit("update:component", 1)
      console.log(res.data);
    })
    .catch(err => {
      statusCode.value = err.response.data.msg
      console.log({ ...err });
    })
}
</script>

<style lang="scss" scoped>
main {
  > .q-btn:nth-child(1) {
    padding: 0;
    color: $link;
    font-size: 16px;

    :deep(.q-icon) {
      margin-right: 0;
    }
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;

    .q-img {
      background-color: $grey-3;
      width: 126px;
      border-radius: 99%;

      :deep(.q-img__image) {
        object-fit: none !important;
      }
    }

    h6 {
      margin: 10px 0 10px 0;
    }

    .router-link-active {
      color: $link;
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
}
</style>

<!-- http://tnc2.netall.live/docs#  === API -->
<!-- https://docs.google.com/spreadsheets/d/1Y9JR_GFfFbtTrywROZ9xYzE6C04If9NWR2oDT25fVGc/edit#gid=155837721 === Test-Case -->
<!-- https://www.figma.com/file/tInMJjKwGIimKFZbQrd7Rn/Desk%2FOffice?node-id=1138%3A7943 === Design -->
