<template>
  <main>
    <q-form
      class="q-mt-md"
      @submit.prevent="loginWithUserPass">

      <div>
        <h6 class="text-caption">Phone</h6>
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
          v-model="username">
          <template v-slot:prepend>
            <q-icon
              name="phone_iphone"
              color="grey" />
          </template>
        </q-input>
      </div>

      <div>
        <h6 class="text-caption">Password</h6>
        <q-input
          dense
          outlined
          bottom-slots
          no-error-icon
          lazy-rules
          :rules="rulePassword"
          placeholder="Your password"
          :type="isPwd ? 'password' : 'text'"
          v-model="password">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd" />
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
        @click="phoneLoginOtp">Login with OTP</q-btn>
    </q-form>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'

const props = defineProps({
  component: {
    type: Number,
    defualt: 1
  },
  userDetail: {
    type: Object,
    defualt: () => { }
  }
})
const emit = defineEmits(['update:component', 'update:userDetail'])
const phoneLoginOtp = () => {
  emit('update:component', 2)
}

const username = ref('')
const password = ref('')
const isPwd = ref(true)

const ruleNumber = ref([
  val => (val && val.length > 0) || 'Please enter your phone number',
])

const rulePassword = ref([
  val => (val && val.length > 0) || 'Please enter your password'
])
const statusCode = ref(null)
const loginWithUserPass = () => {
  axios.post('http://tnc2.netall.live/Login/', null, {
    params: {
      username: username.value,
      password: password.value,
    }
  }).then(res => {
    emit('update:component', 4)
    console.log(res.data);
  }).catch(err => {
    if (err.response.status === 403 || 401) {
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
main {
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
}
</style>

