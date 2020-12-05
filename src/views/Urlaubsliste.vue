<template>
  <b-container>
    <h2>Mitarbeiter im Urlaub</h2>
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
        {{ moment(row.item.von).format('DD.MM.YYYY')}} bis {{ moment(row.item.bis).format('DD.MM.YYYY')}}
      </template>
      <template #cell(von)="row">
        {{ moment(row.item.von).format('DD.MM.YYYY')}}
      </template>
      <template #cell(bis)="row">
        {{ moment(row.item.bis).format('DD.MM.YYYY')}}
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