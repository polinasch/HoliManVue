<template>
  <b-container>
    <b-table striped bordered hover :fields="fields" :items="alleAnträge" :sort-desc.sync="sortDesc"></b-table>
    <router-link to="/home">
    <b-button type="cancel" block variant="light">Abbrechen</b-button>
    </router-link>
  </b-container>
</template>

<script>
import axios from "axios";
import { server } from "../helper.js";
  export default {
    name: 'Anträgeliste',
    data() {
      return {
        fields: [
            {key: 'Urlaubsart', sortable: false},
            {key: 'Urlaubstage', sortable: true},
            {key: 'von', sortable: true}, 
            {key: 'bis', sortable: true},
            {key: 'Status', sortable: true},
            {key: ' ', sortable: false}
        ],
        alleAnträge: []
      }
    },
    created() {
      this.getAllAnträge();
    },
    methods: {
      getAllAnträge(){
        axios.get(server.baseURL + '/urlaubsantrag').then(response =>
        (this.alleAnträge = response.data));
      }
    }
  }
</script>