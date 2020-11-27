<template>
  <b-container>
    <b-table striped bordered hover :fields="fields" :items="urlaubsliste" :sort-desc.sync="sortDesc">
      <template #cell(BenutzerID)="row">
        {{ row.item.benutzer.BenutzerID }}
      </template>
      <template #cell(Nachname)="row">
        {{ row.item.benutzer.Nachname }}
      </template>
      <template #cell(Vorname)="row">
        {{ row.item.benutzer.Vorname }}
      </template>
      <template #cell(urlaubstage)="row">
        {{ row.item.von }} bis {{row.item.bis}}
      </template>
      <template #cell(von)="row">
        {{ row.item.von }}
      </template>
      <template #cell(bis)="row">
        {{row.item.bis}}
      </template>
    </b-table>
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
        sortDesc: false,
        fields: [
            {key: 'BenutzerID', sortable: true},
            {key: 'Nachname', sortable: true},
            {key: 'Vorname', sortable: true}, 
            {key: 'Urlaubstage', sortable: true}, 
            {key: 'von', sortable: true},
            {key: 'bis', sortable: true}
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