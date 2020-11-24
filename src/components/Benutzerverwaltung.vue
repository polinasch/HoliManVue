<template>
  <b-container>
    <b-table striped bordered hover :fields="fields" :items="alleBenutzer" :sort-desc.sync="sortDesc"></b-table>
    <b-row>
        <b-col>
            <router-link to="/benutzer">
            <b-button type="button" block variant="secondary" class="btn">Neuen Benutzer erstellen</b-button>
            </router-link>
        </b-col>
        <b-col>
            <router-link to="/home">
    <b-button type="cancel" block variant="light">Abbrechen</b-button>
    </router-link>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import { server } from "../helper.js";
  export default {
    name: 'Benutzerverwaltung',
    data() {
      return {
        sortDesc: false,
        fields: [
            {key: 'BenutzerID', sortable: true}, 
            {key: 'Benutzername', sortable: true},
            {key: 'Vorname', sortable: true}, 
            {key: 'Nachname', sortable: true}, 
            {key: 'Email', sortable: true},
            {key: 'istVorgesetzter', sotable: false}, 
            {key: 'istAdmin', sortable: false},
            {key: ' ', sortable: false}
        ],
        alleBenutzer: []
      }
    },
    created() {
      this.getAllBenutzer();
    },
    methods: {
      getAllBenutzer(){
        axios.get(server.baseURL + '/benutzer').then(response =>
        (this.alleBenutzer = response.data));
      }
    }
  }
</script>