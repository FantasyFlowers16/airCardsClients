<template>
  <q-page class="row items-center justify-evenly">
    <air-companies
      title="Example component"
      active
    ></air-companies>
  </q-page>
</template>

<script lang="ts">
import AirCompanies from 'src/components/AirCompanies.vue'
import { Vue, Options } from 'vue-class-component'

@Options({
  components: { AirCompanies }
})
export default class PageIndex extends Vue {
  mounted () {
    console.log('index page')
  }
}
</script>
