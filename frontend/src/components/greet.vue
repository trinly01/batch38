<template>
  <div>
    Hello {{ lname }}
    <q-btn @click="getFullName">get full name</q-btn>
  </div>
</template>

<script setup>

import { defineProps, toRefs, defineEmits } from 'vue'

const props = defineProps({
  fname: String,
  lname: String
})
const { fname, lname } = toRefs(props)

const emit = defineEmits()

function getFullName () {
  emit('getFullName', fname.value + ' ' + lname.value)
}
</script>
