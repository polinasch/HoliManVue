<template>
  <b-container>
    <b-table striped bordered hover :fields="fields" :sort-desc.sync="sortDesc"></b-table>
    <b-row>
        <b-col>
            <router-link to="/benutzer">
            <b-button type="button" block variant="secondary" class="btn">Neuen Benutzer erstellen</b-button>
            </router-link>
        </b-col>
        <b-col>
            <b-button type="cancel" block variant="light">Abbrechen</b-button>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'Benutzerverwaltung',
    data() {
      return {
        sortDesc: false,
        fields: [
            {key: 'ID', sortable: true}, 
            {key: 'Benutzername', sortable: true},
            {key: 'Vorname', sortable: true}, 
            {key: 'Nachname', sortable: true}, 
            {key: 'Email', sortable: true},
            {key: 'Vorgesetzter', sotable: false}, 
            {key: 'Admin', sortable: false},
            {key: ' ', sortable: false}
        ]
      }
    }
  }
</script>