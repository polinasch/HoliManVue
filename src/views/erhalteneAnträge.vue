<template>
  <b-container>
    <b-table striped bordered hover :fields="fields" :items="erhalteneAnträge" :sort-desc.sync="sortDesc">
      <template #cell(AntragID)="row">
        {{ row.item.AntragID }}
      </template>
      <template #cell(Benutzername)="row">
        {{ row.item.benutzer.Benutzername }}
      </template>
      <template #cell(Vorname)="row">
        {{ row.item.benutzer.Vorname }}
      </template>
      <template #cell(Nachname)="row">
        {{ row.item.benutzer.Nachname }}
      </template>
      <template #cell(Urlaubsart)="row">
        {{ row.item.Urlaubsart }}
      </template>
      <template #cell(Urlaubstage)="row">
        {{ row.item.von }} bis {{row.item.bis}}
      </template>
      <template #cell(von)="row">
        {{ row.item.von }}
      </template>
      <template #cell(bis)="row">
        {{ row.item.bis }}
      </template>
      <template #cell(Aktionen)="row">
        <b-button size="sm" @click="editAntrag(row.item.AntragID)" variant="primary">
          <b-icon icon="pencil-fill"></b-icon>
        </b-button>
        <b-button size="sm" @click="deleteAntrag(row.item.AntragID)" variant="danger">
          <b-icon icon="trash-fill"></b-icon>
        </b-button>
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
    name: 'erhalteneAnträge',
    data() {
      return {
        sortDesc: false,
        fields: [
            {key: 'AntragID', sortable: true},
            {key: 'Vorname', sortable: true},
            {key: 'Nachname', sortable: true}, 
            {key: 'Urlaubsart', sortable: true},
            {key: 'Urlaubstage', sortable: true},
            {key: 'von', sortable: true},
            {key: 'bis', sortable: true},
            {key: 'Aktionen', sortable: false}
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
      },
      deleteAntrag(id){
        axios.delete(server.baseURL + '/urlaubsantrag/' + id).then(response =>{
          console.log(response);
          this.getErhalteneAnträge();
        }
        )
      }
    }
  }
</script>