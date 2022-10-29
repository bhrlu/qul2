<template>
  <main>
    <q-btn
      no-caps
      flat
      label="Back"
      icon="arrow_back"
      @click="prePage" />

    <div>
      <q-img src="../../../../assets/images/password.png" />
      <h5 class="text-h5">Verify your account</h5>
    </div>

    <h6 class="text-subtitle2">
      We’ve sent a code to
      <span>{{props.companyDetail.email_address}}</span>
    </h6>

    <q-form @submit.prevent="submitForm">

      <div class="row no-wrap q-gutter-x-sm q-mb-lg">
        <input
          type="text"
          maxlength="1"
          :style="statusCode  ? 'border: 2px red solid' : ''"
          v-for="(input, index) in inputs"
          :key="input.id"
          ref="inputRef"
          v-model="input.datatype"
          @input="moveToNextField($event.target.value, index)"
          @update:model-value="val =>setOtp(val)" />
      </div>
      <h6
        class="text-caption text-negative"
        style="position: absolute; top: 50px; font-size: 11px;">{{statusCode}}</h6>

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
        label="Verify account"
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
    defualt: 1
  },
  companyDetail: {
    type: Object,
    defualt: () => { }
  }
})
const emit = defineEmits(["update:component", "update:companyDetail"])

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

// SUBMIT FROM
const statusCode = ref('')
const submitForm = () => {
  api.post(OTP.emailValidateToken, {
    email_address: props.companyDetail.email_address,
    email_token: otp.value
  })
    .then(res => {
      emit("update:companyDetail", { ...props.companyDetail, email_token: otp.value })
      emit("update:component", 2)
      console.log(res.data);
    })
    .catch(err => {
      statusCode.value = err.response.data.detail
      console.log(err.response.data.detail);
    })
}

const prePage = () => {
  emit('update:component', 0)
}
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
startTimer()
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
  }

  h6:nth-child(3) {
    margin-top: 1.5rem;

    span {
      color: $link;
      font-weight: 500;
    }
  }

  form {
    input {
      width: 59.2px;
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
