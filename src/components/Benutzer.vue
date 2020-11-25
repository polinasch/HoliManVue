<template>
  <div>
    <b-container>
      <h2>Benutzer erstellen</h2>
      <b-form @reset="onReset" @submit.prevent="erstelleBenutzer" id="form">
        <b-form-group
          id="input-group-1"
          label="Benutzer-ID:"
          label-for="input-1"
        >
          <b-form-input
            type="number"
            id="input-1"
            v-model="BenutzerID"
            min="2"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Benutzername:"
          label-for="input-2"
        >
          <b-form-input
            type="text"
            id="input-2"
            v-model="Benutzername"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Passwort:" label-for="input-3">
          <b-form-input
            type="password"
            id="input-3"
            v-model="Passwort"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Vorname:" label-for="input-4">
          <b-form-input
            type="text"
            id="input-4"
            v-model="Vorname"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5" label="Nachname:" label-for="input-5">
          <b-form-input
            type="text"
            id="input-5"
            v-model="Nachname"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="Geburtsdatum:"
          label-for="input-6"
        >
          <b-form-datepicker
            id="input-6"
            v-model="Geburtsdatum"
            placeholder="Geburtsdatum auswählen"
            required
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group id="input-group-7" label="Email:" label-for="input-7">
          <b-form-input
            type="email"
            id="input-7"
            v-model="Email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-8"
          label="Betriebszugehörigkeit seit:"
          label-for="input-8"
        >
          <b-form-datepicker
            id="input-8"
            v-model="Eintrittsdatum"
            placeholder="Datum auswählen"
            required
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group
          id="input-group-9"
          label="Bundesland:"
          label-for="input-9"
        >

        <b-form-select id="input-9" v-model="bundesland" required>
          <b-form-select-option v-for="bundesland in bundeslaender" :key="bundesland.BundeslandID" v-bind:value="bundesland.value">
              {{ bundesland.Name }}
          </b-form-select-option>
        </b-form-select>
        </b-form-group>

        <b-form-group id="input-group-10" label="Rolle:" label-for="input-10">
          <b-form-checkbox-group
            id="input-10"
            v-model="rolle"
            :options="rollen"
          ></b-form-checkbox-group>
        </b-form-group>

    <b-form-group
          id="input-group-11"
          label="Vorgesetzter:"
          label-for="input-11"
        >
          <b-form-select id="input-11" v-model="Vorgesetzter" required>
            <b-form-select-option v-for="vorgesetzter in vorgesetzten" :key="vorgesetzter.BenutzerID" v-bind:value="vorgesetzter.value">
              {{ vorgesetzter.Vorname + " " + vorgesetzter.Nachname }}
          </b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary">Speichern</b-button>
        <b-button type="reset" variant="secondary">Abbrechen</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { server } from "../helper.js";
export default {
  name: "Benutzer",
  data() {
    return {
        BenutzerID: null,
        Benutzername: "",
        Passwort: "",
        Vorname: "",
        Nachname: "",
        Geburtsdatum: "",
        Email: "",
        Eintrittsdatum: "",
        bundesland: null,
        rolle: [],
        istAdmin: false,
        istVorgesetzter: false,
        Vorgesetzter: null
      ,
      bundeslaender: [],
      rollen: [
        { value: {istAdmin: true}, text: "Admin" },
        { value: {istVorgesetzter: true}, text: "Vorgesetzter" },
      ],
      vorgesetzten: [],
    };
  },
  created () {
    this.getBundeslaender();
    this.getVorgesetzten();
  },
  methods: {
    onReset(evt) {
      evt.preventDefault();
        this.BenutzerID= null,
        this.Benutzername= "",
        this.Passwort= "",
        this.Vorname= "",
        this.Nachname= "",
        this.Geburtsdatum= "",
        this.Email= "",
        this.Eintrittsdatum= "",
        this.bundesland= null,
        this.istAdmin= false,
        this.istVorgesetzter= false,
        this.Vorgesetzter= null
        this.$router.push({ name: "home" });
    },
    erstelleBenutzer(){
      let benutzerdaten = {
        BenutzerID : this.BenutzerID,
        Benutzername : this.Benutzername,
        Passwort: this.Passwort,
        Vorname: this.Vorname,
        Nachname: this.Nachname,
        Geburtsdatum: this.Geburtsdatum,
        Email: this.Email,
        Eintrittsdatum: this.Eintrittsdatum,
        bundesland: this.bundesland,
        istAdmin: this.istAdmin,
        istVorgesetzter: this.istVorgesetzter,
        Vorgesetzter: this.Vorgesetzter
      }
      this.submitToServer(benutzerdaten);
    },
    submitToServer(data) {
      axios.post(server.baseURL + '/benutzer', data).then(data => {
        this.$router.push({ name: "home" });
        return data;
      });
    },
    getBundeslaender(){
      axios.get(server.baseURL + '/bundesland').then(response =>
      (this.bundeslaender = response.data));
    },
    getVorgesetzten(){
      let listBenutzer = [];
       axios.get(server.baseURL + '/benutzer').then(response =>
      (listBenutzer = response.data));
      listBenutzer.filter(function(elem){
      if(elem.istVorgesetzter == true) 
        this.vorgesetzten.push(elem);
      });
    }
  },
};
</script>

<style>
h2 {
  text-align: center;
}
</style>