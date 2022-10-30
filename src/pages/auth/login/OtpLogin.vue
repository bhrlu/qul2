<template>
  <header>
    <q-btn
      no-caps
      flat
      label="Back"
      icon="arrow_back"
      @click="prePage" />

    <h5 class="text-grey-0">Verify your account</h5>
    <h6 class="text-subtitle1 text-grey">
      Create your account to use our facilities and services
    </h6>
  </header>

  <main>
    <h6 class="text-subtitle2">
      We’ve sent a code to
      <!-- <span v-if="props.userDetail.phone_number">{{ props.userDetail.phone_number }}</span>
      <span v-if="props.userDetail.email_address">{{ props.userDetail.email_address }}</span> -->
    </h6>

    <q-form @submit.prevent="submitForm">
      <div class="row no-wrap q-gutter-x-sm q-mb-lg">
        <!-- :style="statusCode ? 'border: 2px red solid' : ''" -->
        <input
          type="text"
          maxlength="1"
          :style="statusCode ? 'border: 2px red solid' : ''"
          v-for="(input, index) in inputs"
          :key="input.id"
          ref="inputRef"
          v-model="input.datatype"
          @input="moveToNextField($event.target.value, index)"
          @update:model-value="val => setOtp(val)" />
      </div>
      <h6
        class="text-caption text-negative"
        style="position: absolute; top: 50px; font-size: 11px;">{{ statusCode }}</h6>

      <div class="row items-center justify-between">
        <h6 class="text-subtitle2">
          {{ $dayjs.unix(countDown).utc().format("mm:ss") }}
        </h6>
        <h6 class="text-grey text-subtitle1">Didn’tget a code?
          <q-btn
            no-caps
            flat
            label="Click to resend" />
        </h6>
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
  </main>
</template>

<script setup>
import axios from "axios";
import { LOGIN } from "src/base-url";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

const props = defineProps({
  component: {
    type: Number,
    default: 2,
  },
  userDetail: {
    type: Object,
    default: () => { },
  },
});
const emit = defineEmits(["update:component", "update:userDetail"]);

// AUTOCOMPLETE INPUT
const inputs = ref([
  { id: "1", datatype: "" },
  { id: "2", datatype: "" },
  { id: "3", datatype: "" },
  { id: "4", datatype: "" },
  { id: "5", datatype: "" },
])
const inputRef = ref(null)
const otp = ref("")
function setOtp(value) {
  parseInt(otp.value = otp.value + value)
}
function moveToNextField(value, index) {
  const nextIndex = index + 1;
  if (nextIndex < inputs.value.length && value.length >= 1) {
    inputRef.value[nextIndex].focus();
  }
}

// SUBMIT FORM
const statusCode = ref('')
const submitForm = () => {
  const body = {
    phone_number: props.userDetail.phone_number,
    email_address: props.userDetail.email_address,
    sms_token: otp.value,
    email_token: otp.value
  }
  for (const item in body){
    if (!body[item]) delete body[item]
  }

  if(props.userDetail.email_address === null) {
    api.post(LOGIN.otpSmsToken, body)
    .then(res => {
    emit('update:userDetail', {...props.userDetail, sms_token: otp.value})
      router.push('/')
      console.log(res.data);
    })
    .catch(err => {
        if (err.response.status ===  401 || 402 || 404 || 422) {
          statusCode.value = err.response.data.detail
        }
        else {
          statusCode.value = err.response.data.msg
        }
        console.log({ ...err });
    })
  }
 else {
    api.post(LOGIN.otpEmailToken, body)
    .then(res => {
    emit('update:userDetail', {...props.userDetail, sms_token: otp.value})
      router.push('/')
      console.log(res.data);
    })
    .catch(err => {
        if (err.response.status ===  401 || 402 || 404 || 422) {
          statusCode.value = err.response.data.detail
        }
        else {
          statusCode.value = err.response.data.msg
        }
        console.log({ ...err });
    })
  }
}

// COUNTDOWN
const prePage = () => {
  emit("update:component", 0);
};
const countDown = ref(120);
const timer = ref(null);
function startTimer() {
  timer.value = setInterval(() => {
    if (countDown.value === 0) {
      prePage()
      clearInterval(timer.value);
      return;
    }
    --countDown.value;
  }, 1000);
}
startTimer();
</script>

<style lang="scss" scoped>
header {
  :deep(.q-btn) {
    padding: 0;
    color: $link;
    font-size: 16px;
  }

  :deep(.on-left) {
    margin-right: 5px;
  }

  h5,
  h6:nth-child(3) {
    text-align: left !important;
  }

  h5 {
    margin-top: 10px;

    body.screen--lg & {
      font-size: 34px;
      margin-bottom: 5px;
    }
  }

  h6 {
    line-height: 1.3rem;
    word-spacing: 5px;
  }
}

main {
  h6:nth-child(1) {
    margin-top: 1.5rem;
    margin-bottom: 10px;

    span {
      color: $link;
      font-weight: 500;
    }
  }

  form {
    input {
      width: 59px;
      height: 48px;
      text-align: center;
      border: 1px solid #aabbc6;
      border-radius: 5px;
      transition: 100ms ease-out;

      body.screen--lg & {
        width: 84.8px;
      }

      &:hover {
        border: 2px solid black;
      }

      &:focus {
        border: 2px solid $link;
      }
    }

    > div:nth-child(3) {
      display: flex;
      align-items: center;
      justify-content: center;

      body.screen--lg & {
        justify-content: space-between;
        margin: 0 0 20px 0;
      }

      > h6:nth-child(1) {
        margin: 0 0 25px 0;
        text-align: center;

        body.screen--lg & {
          margin: 0;
        }
      }

      > h6:nth-child(2) {
        display: none;
        margin: 0;

        body.screen--lg & {
          display: block;
        }

        :deep(.q-btn) {
          padding: 0px;
          color: $link;
          text-decoration: underline;
        }
      }
    }

    :deep(.q-field__control) {
      height: 48px;
    }
  }
}
</style>

