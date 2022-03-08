<template>
  <div>
    <q-toolbar class="bg-purple text-white">
      <q-btn flat round dense icon="assignment_ind" />
      <q-toolbar-title>
        <!-- {{ state.task }} -->
        Todo App -
        <greet v-if="!state.fullName" @getFullName="(val) => state.fullName = val" fname="Randy" lname="Gatachalian" />
        <span v-else>{{state.fullName}}</span>
      </q-toolbar-title>
      <q-btn flat round dense icon="apps" class="q-mr-xs" />
      <q-btn flat round dense icon="more_vert" />
    </q-toolbar>
    <div class="row q-gutter-sm q-pa-sm" >
      <q-input v-model="state.task" class="col" filled label="What needs to be done" />
      <q-btn @click="add" icon="add" label="add" />
    </div>
    <q-list v-for="todo in todos" :key="todo.id" class="q-ma-sm" bordered separator>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="signal_wifi_off" />
        </q-item-section>
        <q-item-section>{{ todo.title }}</q-item-section>
        <q-item-section side>Side</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>

import { reactive, ref, onMounted } from 'vue'

import greet from 'components/greet.vue'

import axios from 'axios'

const state = reactive({
  task: '',
  fullName: ''
})

// const task = ref('')
const todos = ref([
  {
    id: Date.now(),
    title: 'Add Function',
    completed: false
  }
])

onMounted(async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')
  todos.value = data
})

function add () {
  todos.value.unshift({
    id: Date.now(),
    title: state.task,
    completed: false
  })
}
</script>
