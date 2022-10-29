<template>
  <q-tabs
    dense
    narrow-indicator
    indicator-color="secondary"
    align="justify"
    :breakpoint="0"
    active-bg-color="secondary"
    active-color="white"
    v-model="tab[0]">
    <q-tab
      no-caps
      name="Email"
      label="Email"
      class="text-secondary"
      @click="emailTab" />
    <q-tab
      no-caps
      name="Phone"
      label="Phone"
      class="text-secondary"
      @click="phoneTab" />
  </q-tabs>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  component: Number
})
const emit = defineEmits(['update:component'])

const tab = ref(['Phone', 'Email']);
const phoneTab = () => {
  emit('update:component', 0)
}
const emailTab = () => {
  emit('update:component', 1)
}
</script>

<style lang="scss" scoped>
:deep(.q-tab__label) {
  font-size: 16px;
  letter-spacing: 0.1px;
  font-weight: 500;
}

:deep(.q-tabs__content) {
  border-radius: 5px;
  border: 2px solid $secondary;
}

:deep(.q-tab) {
  margin: 5px;
  border-radius: 5px;
}
</style>
