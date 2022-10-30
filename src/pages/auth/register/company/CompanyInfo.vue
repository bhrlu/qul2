<template>
  <main>
    <div class="q-mb-lg">
      <h5 class="text-h5 text-secondary">Welcome to Tnc3</h5>
      <h6 class="text-caption">Enter the information to complete the profile</h6>
      <div class="row justify-between">
        <div
          class="col-4"
          v-for="tab in tabs"
          :key="tab">
          <h6 class="text-caption">{{tab}}</h6>
          <div></div>
        </div>
      </div>
    </div>

    <q-form
      class="q-gutter-y-xs q-mt-md"
      @submit.prevent="submitForm">
      <div>
        <h6 class="text-caption">Company name <span>(Required)</span></h6>
        <q-input
          autofocus
          outlined
          dense
          no-error-icon=""
          :rules="rulesName"
          v-model="models.name" />
      </div>

      <div>
        <h6 class="text-caption">Field of activity <span>(Required)</span></h6>
        <q-select
          outlined
          dense
          no-error-icon
          label="-Select Field of activity"
          :options="activityOption"
          options-selected-class="text-deep-orange"
          :rules="[val => !!val || '* Required']"
          v-model="models.activity">
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-label header>{{ scope.opt.category_name }}</q-item-label>
            </q-item>
            <q-item
              v-bind="scope.itemProps"
              class="q-pl-xl">
              <q-item-label
                v-for="sub in scope.opt.sub_categories"
                :key="sub">{{sub}}</q-item-label>
            </q-item>
          </template>
        </q-select>
      </div>

      <div>
        <h6 class="text-caption">Country <span>(Required)</span></h6>
        <q-select
          outlined
          dense
          no-error-icon
          label="-Select Country"
          :options="['US','IR']"
          :rules="[val => !!val || '* Required']"
          v-model="models.country" />
      </div>

      <div>
        <h6 class="text-caption">State <span>(Required)</span></h6>
        <q-select
          outlined
          dense
          no-error-icon
          label="-Select State"
          :options="['Texas','Tehran']"
          :rules="[val => !!val || '* Required']"
          v-model="models.state" />
      </div>

      <q-btn
        type="submit"
        label="Complete account"
        class="full-width button-font-weight q-mt-lg"
        padding="12px 32px"
        align="center"
        no-caps />
    </q-form>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { api } from 'src/boot/axios';
import { REGISTER } from 'src/base-url';
import axios from 'axios';

const tabs = ref(['sign up', 'verify account', 'complete info'])
const props = defineProps({
  component: {
    type: Number,
    defualt: 2
  },
  companyDetail: {
    type: Object,
    defualt: () => { }
  }
})
const emit = defineEmits(["update:component", "update:companyDetail"])

// SUBMIT COMPANY INFO
const models = reactive({
  name: '',
  activity: '',
  country: '',
  state: '',
})
const rulesName = ref([
  val => (val && val.length > 0) || 'Please type something',
  val => (val.length > 3) || 'Please more than 3 character'
])
const statusCode = ref('')
const submitForm = () => {
  api.post(REGISTER.companyAccount)
    .then(res => {
      emit("update:companyDetail", {
        ...props.companyDetail,
        company_name: models.name,
        field_of_activity: models.activity,
        country: models.country,
        state: models.state
      })
      emit("update:component", 3)
      console.log(res.data);
    })
    .catch(err => {
      statusCode.value = err.response.data.msg
      console.log(err.response);
    })
}

const activityOption = ref([])
const getActivity = () => {
  axios.get('http://65.109.61.181:8080/ActivityCategories/GetList')
  .then(res => {
    activityOption.value = res.data
  })
  .catch(err => {
    console.log(err);
  })
}
getActivity()
</script>

<style lang="scss" scoped>
main {
  > :nth-child(1) {
    text-align: center;

    > :nth-child(3) {
      margin-top: 10px;

      :deep(.col-4) {
        width: 31%;
      }

      div {
        h6 {
          color: $success-300;
        }

        > :nth-child(2) {
          width: 100%;
          border: 2px solid $success-200;
        }
      }

      :last-child {
        h6 {
          color: $grey-200;
        }

        > :nth-child(2) {
          border-color: $grey-200;
        }
      }

    }
  }

  > :nth-child(2) {
    span {
      color: $grey-200;
    }

    :deep(.q-field__control) {
      height: 48px;
    }

    :deep(.q-field__marginal) {
      height: 48px;
    }

    :deep(.q-btn) {
      background-color: $primary-100;
      color: $grey-300;
    }
  }

  :deep(.q-field__bottom) {
    padding: 5px 0 0 0;
  }
}

:deep(.q-item-label) {
  display: block;
}
</style>

