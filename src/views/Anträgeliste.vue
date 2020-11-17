<template>
  <b-container>
    <b-table striped bordered hover :fields="fields"></b-table>
  </b-container>
</template>

<script>
  export default {
    name: 'Anträgeliste',
    data() {
      return {
        fields: ['Urlaubsart', 'Urlaubstage', 'von', 'bis', 'Status', ' '],
      }
    }
  }
</script>