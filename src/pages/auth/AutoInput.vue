<!-- <template>
  <div class="row no-wrap q-gutter-x-sm q-mb-lg">
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
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  statusCode: String,
  otp: Number,
  component: {
    type: Number,
    defualt: 0
  }
})
const emit = defineEmits(['update:component'])

// AUTOCOMPLETE INPUT
const inputs = ref([
  { id: "1", datatype: "" },
  { id: "2", datatype: "" },
  { id: "3", datatype: "" },
  { id: "4", datatype: "" },
  { id: "5", datatype: "" },
])
const inputRef = ref(null)
function setOtp(value) {
  parseInt(props.otp = props.otp + value)
}
function moveToNextField(value, index) {
  const nextIndex = index + 1;
  if (nextIndex < inputs.value.length && value.length >= 1) {
    inputRef.value[nextIndex].focus();
  }
}

// COUNTDOWN
const prePage = () => {
  emit("update:component", 0);
};
const countDown = ref(12);
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
</style> -->
