<template>
  <b-container>
    <b-table striped bordered hover :fields="fields" :items="alleBenutzer" :sort-desc.sync="sortDesc">
      <template #cell(BenutzerID)="row">
        {{ row.item.BenutzerID }}
      </template>
      <template #cell(Benutzername)="row">
        {{ row.item.Benutzername }}
      </template>
      <template #cell(Vorname)="row">
        {{ row.item.Vorname }}
      </template>
      <template #cell(Nachname)="row">
        {{ row.item.Nachname }}
      </template>
      <template #cell(Email)="row">
        {{ row.item.Email }}
      </template>
      <template #cell(istVorgesetzter)="row">
        {{ row.item.istVorgesetzter }}
      </template>
      <template #cell(istAdmin)="row">
        {{ row.item.istAdmin }}
      </template>
      <template #cell(Aktionen)="row">
        <router-link :to="{name: 'editBenutzer', params: {id: row.item.BenutzerID}}">
        <b-button size="sm" @click="editBenutzer(row.item.BenutzerID)" variant="primary">
          <b-icon icon="pencil-fill"></b-icon>
        </b-button>
        </router-link>
        <b-button size="sm" @click="deleteBenutzer(row.item.BenutzerID)" variant="danger">
          <b-icon icon="trash-fill"></b-icon>
        </b-button>
      </template>
    </b-table>
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
            {key: 'Aktionen', sortable: false}
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
      },
      editBenutzer(id){
        console.log(id);
      },
      deleteBenutzer(id){
        axios.delete(server.baseURL + '/benutzer/' + id).then(response =>{
          console.log(response);
          this.getAllBenutzer();
        }
        )
      }
    }
  }
</script>