<template>
  <b-container>
    <b-table striped bordered hover :fields="fields" :sort-desc.sync="sortDesc"></b-table>
  </b-container>
</template>

<script>
  export default {
    name: 'Urlaubsliste',
    data() {
      return {
        fields: [
            {key: 'Benutzer-ID', sortable: true},
            {key: 'Nachname', sortable: true},
            {key: 'Vorname', sortable: true}, 
            {key: 'Urlaubstage', sortable: true}, 
            {key: 'von', sortable: true},
            {key: 'bis', sortable: true},
            {key: ' ', sortable: false}
            ],
      }
    }
  }
</script>