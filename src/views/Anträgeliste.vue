<template>
  <b-container>
    <b-table striped bordered hover :fields="fields" :items="alleAnträge" :sort-desc.sync="sortDesc">
      <template #cell(Urlaubsart)="row">
        {{ row.item.Urlaubsart }}
      </template>
      <template #cell(Urlaubstage)="row">
         {{ moment(row.item.von).format('YYYY-MM-DD')}} bis {{ moment(row.item.bis).format('YYYY-MM-DD')}}
      </template>
      <template #cell(von)="row">
        {{ moment(row.item.von).format('YYYY-MM-DD')}}
      </template>
      <template #cell(bis)="row">
        {{ moment(row.item.bis).format('YYYY-MM-DD')}}
      </template>
      <template #cell(Status)="row">
        {{ row.item.Status }}
      </template>
      <template #cell(Aktionen)="row">
        <b-button size="sm" @click="editAntrag(row.item.AntragID)" variant="secondary">
          <b-icon icon="pencil-fill"></b-icon>
        </b-button>
        <b-button size="sm" @click="sendAntrag(row.item.AntragID)" variant="primary">
          <b-icon icon="envelope"></b-icon>
        </b-button>
        <b-button size="sm" @click="cancelAntrag(row.item.AntragID)" variant="danger">
          <b-icon icon="x"></b-icon>
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
    name: 'Anträgeliste',
    data() {
      return {
        sortDesc: false,
        fields: [
            {key: 'Urlaubsart', sortable: false},
            {key: 'Urlaubstage', sortable: true},
            {key: 'von', sortable: true}, 
            {key: 'bis', sortable: true},
            {key: 'Status', sortable: true},
            {key: 'Aktionen', sortable: false}
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