<template>
  <div ref="printable">
    <q-toolbar class="bg-purple text-white">
      <q-btn flat round dense icon="assignment_ind" />
      <q-toolbar-title>
        <!-- {{ state.task }} -->
        Todo App -
        <greet v-if="!state.fullName" @getFullName="(val) => state.fullName = val" fname="Randy" lname="Gatachalian" />
        <span v-else>{{state.fullName}}</span>
      </q-toolbar-title>
      <q-btn @click="login" flat label="login" round dense icon="apps" class="q-mr-xs" />
      <q-btn @click="$wings.logout()" flat round dense icon="more_vert" label="logout" />
    </q-toolbar>
    <div class="row q-gutter-sm q-pa-sm" >
      <q-input v-model="state.task" class="col" filled label="What needs to be done" />
      <q-btn @click="add" icon="add" label="add" />
    </div>
    <q-list v-for="todo in todos" :key="todo._id" class="q-ma-sm" bordered separator>
      <q-item clickable v-ripple @mouseover="selected = todo.id" @mouseleave="selected = null">
        <q-item-section avatar>
          <q-checkbox @click="$todosService.patch(todo._id, { completed: !todo.completed })" :modelValue="todo.completed" />
        </q-item-section>
        <q-item-section :class="{ 'text-strike text-grey': todo.completed }" >{{ todo.title }}</q-item-section>
        <q-item-section side>
          <q-btn @click="removeTask(todo)" v-show="selected === todo.id" round icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <pie-chart :data="[['Active', countActive], ['Completed', countCompleted]]" :donut="true"></pie-chart>
    <q-btn icon="print" @click="printHTML" />
  </div>
</template>

<script setup>

import { reactive, ref, onMounted, computed, getCurrentInstance } from 'vue'

import greet from 'components/greet.vue'

import print from 'ink-html'

const app = getCurrentInstance()

const { $todosService, $wings } = app.appContext.config.globalProperties

// import axios from 'axios'

const printable = ref(null)

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
  // const { data: { data } } = await $axios.get('http://localhost:3030/todos')

  $todosService.on('dataChange', (data) => {
    console.log(data)
    todos.value = [...data]
  })

  $wings.authenticate()

  $wings.on('login', user => {
    console.log('user', user)
    $todosService.init()
  })
  $wings.on('logout', user => {
    // $todosService.reset({ query: {} })
    todos.value = []
  })
})

function login () {
  $wings.authenticate({
    strategy: 'local',
    email: 'pogi@gmail.com',
    password: 'pogi'
  })
}

function add () {
  // todos.value.unshift({
  //   id: Date.now(),
  //   title: state.task,
  //   completed: false
  // })
  $todosService.create({
    title: state.task,
    completed: false
  })
}

function printHTML () {
  // const dd = {
  //   content: [
  //     {
  //       table: {
  //         body: [
  //           ['completed', 'active'],
  //           [countCompleted.value, countActive.value]
  //         ]
  //       }
  //     }
  //   ]
  // }
  // $pdfMake.createPdf(dd).open()
  console.log(printable.value)
  print(printable.value)
}

// class Person {
//   constructor (name) {
//     this.name = name
//   }

//   changeName (newName) {
//     this.name = newName
//     return this.name
//   }

//   getName () {
//     const testFunc = () => {
//       return this.name
//     }
//     return testFunc()
//   }
// }

const removeTask = (task) => {
  // const tao = new Person('Pogi')
  // tao.changeName('Xander Ford')
  // console.log(tao.getName())
  // const i = todos.value.findIndex(t => t.id === task.id)
  // todos.value.splice(i, 1)
  $todosService.remove(task._id)
}
</script>
