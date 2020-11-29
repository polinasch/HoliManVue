<template>
  <div>
    <b-container>
      <h2>
        Urlaubsantrag mit der ID: {{ Antrag.AntragID}}
      </h2>
      <div>
        <b-form id="zeigeAntrag">
          <b-form-group id="input-group-1" label="Vorname:" label-for="input-1">
            <b-form-input
              type="text"
              id="input-1"
              v-model="Antrag.benutzer.Vorname"
              readonly
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Nachname:" label-for="input-2">
            <b-form-input
              type="text"
              id="input-2"
              v-model="Antrag.benutzer.Nachname"
              readonly
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Geburtsdatum:" label-for="input-3">
            <b-form-datepicker
              id="input-3"
              v-model="Antrag.benutzer.Geburtsdatum"
              readonly
            ></b-form-datepicker>
          </b-form-group>
          <b-form-group id="input-group-4" label="Eintrittsdatum:" label-for="input-4">
            <b-form-datepicker
              id="input-4"
              v-model="Antrag.benutzer.Eintrittsdatum"
              readonly
            ></b-form-datepicker>
          </b-form-group>
          <b-form-group id="input-group-5" label="Email:" label-for="input-5">
            <b-form-input
              type="email"
              id="input-5"
              v-model="Antrag.benutzer.Email"
              readonly
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-6" label="AntragID:" label-for="input-6">
            <b-form-input
              type="text"
              id="input-6"
              v-model="Antrag.AntragID"
              readonly
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-7" label="Urlaubsart:" label-for="input-7">
            <b-form-input
              type="text"
              id="input-7"
              v-model="Antrag.Urlaubsart"
              readonly
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-8" label="Grund:" label-for="input-8">
            <b-form-input
              type="text"
              id="input-8"
              v-model="Antrag.Grund"
              readonly
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-9" label="Urlaub von:" label-for="input-9">
            <b-form-datepicker
              id="input-9"
              v-model="Antrag.von"
              readonly
            ></b-form-datepicker>
          </b-form-group>
          <b-form-group id="input-group-10" label="Urlaub bis:" label-for="input-10">
            <b-form-datepicker
              id="input-10"
              v-model="Antrag.bis"
              readonly
            ></b-form-datepicker>
          </b-form-group>
          <router-link to="/erhalteneAntraege">
          <b-button type="cancel" variant="secondary">Zurück zu den Anträgen</b-button>
          </router-link>
        </b-form>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../helper.js";
export default {
  name: "zeigeAntragdetails",
  data() {
    return {
      ID: null,
      Antrag: {
        AntragID: null,
        Urlaubsart: "",
        von: "",
        bis: "",
        Grund: "",
        benutzer: {
          BenutzerID: null,
          Vorname: "",
          Nachname: "",
          Geburtsdatum: "",
          Eintrittsdatum: "",
          Email: "",
        },
      },
    };
  },
  created() {
    this.ID = this.$route.params.id;
    this.getAntragByID(this.ID);
  },
  methods: {
    getAntragByID(id) {
      axios
        .get(server.baseURL + "/urlaubsantrag/" + id)
        .then((response) => (this.Antrag = response.data));
    },
  },
};
</script>

<style>
h2 {
  text-align: center;
}
</style>