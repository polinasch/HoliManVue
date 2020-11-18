<template>
  <b-container>
    <b-table striped bordered hover :fields="fields" :sort-desc.sync="sortDesc"></b-table>
  </b-container>
</template>

<script>
  export default {
    name: 'erhalteneAnträge',
    data() {
      return {
        fields: [
            {key: 'ID', sortable: true},
            {key: 'Vorname', sortable: true},
            {key: 'Nachname', sortable: true}, 
            {key: 'Urlaubsart', sortable: true},
            {key: 'Urlaubstage', sortable: true},
            {key: 'von', sortable: true},
            {key: 'bis', sortable: true},
            {key: ' ', sortable: false}
            ],
      }
    }
  }
</script>