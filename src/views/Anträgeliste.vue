<template>
  <b-container>
    <h2>Urlaubsanträge der Mitarbeiter</h2>
    <b-form-group id="input-group-1" label="Mitarbeiter:" label-for="input-1">
      <b-form-select id="input-1" v-model="benutzer" required @change="getAllAnträge(benutzer)">
        <b-form-select-option
          v-for="benutzer in Benutzer"
          :key="benutzer.BenutzerID"
          v-bind:value="benutzer.BenutzerID"
        >
          {{ "ID: " + benutzer.BenutzerID + ", " + benutzer.Vorname + " " + benutzer.Nachname }}
        </b-form-select-option>
      </b-form-select>
    </b-form-group>
    <b-table
      striped
      bordered
      hover
      :fields="fields"
      :items="alleAnträge"
      :sort-desc.sync="sortDesc"
    >
      <template #cell(Urlaubsart)="row">
        {{ row.item.Urlaubsart }}
      </template>
      <template #cell(Urlaubstage)="row">
        {{ moment(row.item.von).format("DD.MM.YYYY") }} bis
        {{ moment(row.item.bis).format("DD.MM.YYYY") }}
      </template>
      <template #cell(von)="row">
        {{ moment(row.item.von).format("DD.MM.YYYY") }}
      </template>
      <template #cell(bis)="row">
        {{ moment(row.item.bis).format("DD.MM.YYYY") }}
      </template>
      <template #cell(Status)="row">
        {{ row.item.Status }}
      </template>
      <template #cell(Aktionen)="row">
        <router-link
          :to="{ name: 'editUrlaubsantrag', params: { id: row.item.AntragID } }"
        >
          <b-button
            size="sm"
            @click="editAntrag(row.item.AntragID)"
            variant="secondary"
          >
            <b-icon icon="pencil-fill"></b-icon>
          </b-button>
        </router-link>
        <b-button
          size="sm"
          @click="sendAntrag(row.item.AntragID)"
          variant="primary"
        >
          <b-icon icon="envelope"></b-icon>
        </b-button>
        <b-button
          size="sm"
          @click="cancelAntrag(row.item.AntragID)"
          variant="danger"
        >
          <b-icon icon="x"></b-icon>
        </b-button>
        <b-button
          size="sm"
          @click="deleteAntrag(row.item.AntragID)"
          variant="danger"
        >
          <b-icon icon="trash-fill"></b-icon>
        </b-button>
      </template>
    </b-table>
    <router-link to="/home">
      <b-button type="cancel" block variant="light"
        >Zurück zur Startseite</b-button
      >
    </router-link>
  </b-container>
</template>

<script>
import axios from "axios";
import { server } from "../helper.js";
export default {
  name: "Anträgeliste",
  data() {
    return {
      sortDesc: false,
      fields: [
        { key: "Urlaubsart", sortable: false },
        { key: "Urlaubstage", sortable: true },
        { key: "von", sortable: true },
        { key: "bis", sortable: true },
        { key: "Status", sortable: true },
        { key: "Aktionen", sortable: false },
      ],
      alleAnträge: [],
      benutzer: null,
      Benutzer: []
    };
  },
  created() {
    this.getBenutzer();
  },
  methods: {
    getAllAnträge(id) {
      axios
        .get(server.baseURL + "/urlaubsantrag/benutzer/" + id)
        .then((response) => (this.alleAnträge = response.data))
        .catch(function (error){
          console.log(error.response);
        });
    },
    deleteAntrag(id) {
      axios.delete(server.baseURL + "/urlaubsantrag/" + id).then((response) => {
        console.log(response);
        this.getAllAnträge();
      });
    },
    editAntrag(id) {
      console.log(id);
    },
    getBenutzer() {
        axios
        .get(server.baseURL + "/benutzer")
        .then((response) => (this.Benutzer = response.data));
    }
  },
};
</script>