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
      <q-item clickable v-ripple @mouseover="selected = todo.id" @mouseleave="selected = null">
        <q-item-section avatar>
          <q-checkbox v-model="todo.completed" />
        </q-item-section>
        <q-item-section :class="{ 'text-strike text-grey': todo.completed }" >{{ todo.title }}</q-item-section>
        <q-item-section side>
          <q-btn v-show="selected === todo.id" round icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <pie-chart :data="[['Active', countActive], ['Completed', countCompleted]]" :donut="true"></pie-chart>
  </div>
</template>

<script setup>

import { reactive, ref, onMounted, computed, getCurrentInstance } from 'vue'

import greet from 'components/greet.vue'

const app = getCurrentInstance()

const { $axios } = app.appContext.config.globalProperties

// import axios from 'axios'

const state = reactive({
  task: '',
  fullName: ''
})

const countCompleted = computed(() => todos.value.filter(t => t.completed).length)
const countActive = computed(() => todos.value.length - countCompleted.value)
// const task = ref('')

const selected = ref(null)

const todos = ref([
  {
    id: Date.now(),
    title: 'Add Function',
    completed: false
  }
])

onMounted(async () => {
  const { data } = await $axios.get('https://jsonplaceholder.typicode.com/todos')
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
