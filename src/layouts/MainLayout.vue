<script setup>
import TheHeader from '../components/TheHeader.vue'
import { useMainStore } from '../stores/main-store.js'

const mainStore = useMainStore()

mainStore.getData()
</script>
<template>
  <q-layout style="min-height: 0px">
    <q-page-container>
      <TheHeader />
      <router-view />
    </q-page-container>
  </q-layout>
</template>
