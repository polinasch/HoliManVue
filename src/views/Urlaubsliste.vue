<template>
  <b-container>
    <b-table striped bordered hover :fields="fields" :items="urlaubsliste" :sort-desc.sync="sortDesc"></b-table>
    <router-link to="/home">
    <b-button type="cancel" block variant="light">Abbrechen</b-button>
    </router-link>
  </b-container>
</template>

<script>
import axios from "axios";
import { server } from "../helper.js";
  export default {
    name: 'Urlaubsliste',
    data() {
      return {
        fields: [
            {key: 'BenutzerID', sortable: true},
            {key: 'Nachname', sortable: true},
            {key: 'Vorname', sortable: true}, 
            {key: 'Urlaubstage', sortable: true}, 
            {key: 'von', sortable: true},
            {key: 'bis', sortable: true},
            {key: ' ', sortable: false}
        ],
        urlaubsliste: []
      }
    },
    created(){
      this.getUrlaubsliste();
    },
    methods: {
      getUrlaubsliste(){
        axios.get(server.baseURL + '/urlaubsantrag').then(response =>
        (this.urlaubsliste = response.data));
      }
    }
  }
</script>