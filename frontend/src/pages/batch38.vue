<template>
  <div>
    <q-toolbar class="bg-purple text-white">
      <q-btn flat round dense icon="assignment_ind" />
      <q-toolbar-title>
        Batch 38 Todo App
      </q-toolbar-title>
      <q-btn flat round dense icon="apps" class="q-mr-xs" />
      <q-btn flat round dense icon="more_vert" />
    </q-toolbar>
    <div class="row q-gutter-sm q-pa-sm" >
      <q-input class="col" filled label="What needs to be done" />
      <q-btn icon="add" label="add" />
    </div>
    <q-list class="q-ma-sm" bordered separator>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="signal_wifi_off" />
        </q-item-section>
        <q-item-section>Active</q-item-section>
        <q-item-section side>Side</q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="signal_wifi_off" />
        </q-item-section>
        <q-item-section>Active</q-item-section>
        <q-item-section side>Side</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
