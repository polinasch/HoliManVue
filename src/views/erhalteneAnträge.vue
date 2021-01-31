<template>
  <b-container>
    <h2>Zu genehmigende Urlaubsanträge</h2>
    <b-form-group id="input-group-1" label="Vorgesetzter:" label-for="input-1">
      <b-form-select
        id="input-1"
        v-model="vorgesetzter"
        required
      >
        <b-form-select-option
          v-for="vorgesetzter in vorgesetzten"
          :key="vorgesetzter.BenutzerID"
          v-bind:value="vorgesetzter.BenutzerID"
        >
          {{
            "ID: " +
            vorgesetzter.BenutzerID +
            ", " +
            vorgesetzter.Vorname +
            " " +
            vorgesetzter.Nachname
          }}
        </b-form-select-option>
      </b-form-select>
    </b-form-group>

    <b-table
      striped
      bordered
      hover
      :fields="fields"
      :items="erhalteneAnträge"
      :sort-desc.sync="sortDesc"
    >
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
        {{ moment(row.item.bis).diff(moment(row.item.von), "days") + 1 }}
      </template>
      <template #cell(von)="row">
        {{ moment(row.item.von).format("DD.MM.YYYY") }}
      </template>
      <template #cell(bis)="row">
        {{ moment(row.item.bis).format("DD.MM.YYYY") }}
      </template>
      <template #cell(Aktionen)="row">
        <router-link
          :to="{
            name: 'zeigeAntragdetails',
            params: { id: row.item.AntragID },
          }"
        >
          <b-button size="sm" variant="secondary">
            <b-icon icon="eye"></b-icon>
          </b-button>
        </router-link>
        <b-button
          size="sm"
          @click="genehmigeAntrag(row.item.AntragID)"
          variant="primary"
        >
          <b-icon icon="check2"></b-icon>
        </b-button>
        <b-button
          size="sm"
          @click="AntragAblehnen(row.item.AntragID)"
          variant="danger"
        >
          <b-icon icon="x"></b-icon>
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
  name: "erhalteneAnträge",
  data() {
    return {
      sortDesc: false,
      fields: [
        { key: "AntragID", sortable: true },
        { key: "Vorname", sortable: true },
        { key: "Nachname", sortable: true },
        { key: "Urlaubsart", sortable: true },
        { key: "Urlaubstage", sortable: true },
        { key: "von", sortable: true },
        { key: "bis", sortable: true },
        { key: "Aktionen", sortable: false },
      ],
      erhalteneAnträge: [],
      vorgesetzter: null,
      vorgesetzten: [],
      Benutzer: []
    };
  },
  created() {
    this.getErhalteneAnträge();
    this.getVorgesetzten();
  },
  methods: {
    getErhalteneAnträge() {
      axios
        .get(server.baseURL + "/urlaubsantrag")
        .then((response) => (this.erhalteneAnträge = response.data));
    },
    getVorgesetzten() {
      axios
        .get(server.baseURL + "/benutzer/vorgesetzter?istVorgesetzter=true")
        .then((response) => (this.vorgesetzten = response.data));
    }
  },
};
</script>