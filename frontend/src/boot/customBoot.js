import { boot } from 'quasar/wrappers'

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

import wings from 'wings4'

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  // something to do

  app.use(VueChartkick)

  app.config.globalProperties.$pdfMake = pdfMake

  const $wings = wings('http://localhost:3030')
  app.config.globalProperties.$wings = $wings

  app.config.globalProperties.$todosService = $wings.wingsService('todos').init()
})
