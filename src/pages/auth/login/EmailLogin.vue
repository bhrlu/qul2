<template>
  <main>
    <q-form
      class="q-mt-md"
      @submit.prevent="">

      <div>
        <h6 class="text-caption">Email</h6>
        <q-input
          dense
          outlined
          bottom-slots
          no-error-icon
          lazy-rules
          placeholder="example@Company.com"
          v-model="email">
          <template v-slot:prepend>
            <q-icon
              name="alternate_email"
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
    </q-form>

    <q-btn
      flat
      no-caps
      class="text-subtitle1 full-width"
      @click="emailLoginOtp">Login with OTP</q-btn>
  </main>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const props = defineProps({
  component: {
    type: Number,
    defualt: 1
  },
  userDetail: {
    type: Object,
    defualt: () => {}
  }
})
const emit = defineEmits(['update:component','update:userDetail'])
const emailLoginOtp = () => {
  emit('update:component', 3)
}

const password = ref('')
const isPwd = ref(true)

const email = ref('')
const loginWithUserPass = () => {
  axios.post('http://tnc2.netall.live/Login/',null , {
    params:{
      username: username.value ,
      password: password.value ,
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
