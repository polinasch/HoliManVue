<template>
  <b-container>
    <b-table striped bordered hover :fields="fields" :items="erhalteneAnträge" :sort-desc.sync="sortDesc"></b-table>
    <router-link to="/home">
    <b-button type="cancel" block variant="light">Abbrechen</b-button>
    </router-link>
  </b-container>
</template>

<script>
import axios from "axios";
import { server } from "../helper.js";
  export default {
    name: 'erhalteneAnträge',
    data() {
      return {
        fields: [
            {key: 'AntragID', sortable: true},
            {key: 'Vorname', sortable: true},
            {key: 'Nachname', sortable: true}, 
            {key: 'Urlaubsart', sortable: true},
            {key: 'Urlaubstage', sortable: true},
            {key: 'von', sortable: true},
            {key: 'bis', sortable: true},
            {key: ' ', sortable: false}
        ],
        erhalteneAnträge: []
      }
    },
    created() {
      this.getErhalteneAnträge();
    },
    methods: {
      getErhalteneAnträge(){
        axios.get(server.baseURL + '/urlaubsantrag').then(response =>
        (this.erhalteneAnträge = response.data));
      }
    }
  }
</script>