<template>
  <div>
    <b-container>
      <h2>Benutzer bearbeiten</h2>
      <b-form @reset="onReset" @submit.prevent="saveBenutzer" id="form">
        <b-form-group
          id="input-group-2"
          label="Benutzername:"
          label-for="input-2"
        >
          <b-form-input
            type="text"
            id="input-2"
            v-model="Benutzer.Benutzername"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Passwort:" label-for="input-3">
          <b-form-input
            type="password"
            id="input-3"
            v-model="Benutzer.Passwort"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Vorname:" label-for="input-4">
          <b-form-input
            type="text"
            id="input-4"
            v-model="Benutzer.Vorname"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5" label="Nachname:" label-for="input-5">
          <b-form-input
            type="text"
            id="input-5"
            v-model="Benutzer.Nachname"
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
            v-model="Benutzer.Geburtsdatum"
            placeholder="Geburtsdatum auswählen"
            :max="maxGeburtsdatum"
            required
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group id="input-group-7" label="Email:" label-for="input-7">
          <b-form-input
            type="email"
            id="input-7"
            v-model="Benutzer.Email"
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
            v-model="Benutzer.Eintrittsdatum"
            placeholder="Datum auswählen"
            :max="maxEintrittsdatum"
            required
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group
          id="input-group-9"
          label="Bundesland:"
          label-for="input-9"
        >
          <b-form-select id="input-9" v-model="Benutzer.bundesland.BundeslandID" required>
            <b-form-select-option
              v-for="bundesland in bundeslaender"
              :key="bundesland.BundeslandID"
              v-bind:value="bundesland.BundeslandID"
            >
              {{ bundesland.Name }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>

        <b-form-group label="Zusätzliche Rolle:">
        <b-form-checkbox id="input-10" v-model="Benutzer.istVorgesetzter"
          >Vorgesetzter</b-form-checkbox
        >
        <b-form-checkbox id="input-11" v-model="Benutzer.istAdmin"
          >Admin</b-form-checkbox
        >
        </b-form-group>

        <b-form-group
          id="input-group-11"
          label="Vorgesetzter:"
          label-for="input-11"
        >
          <b-form-select id="input-11" v-model="Benutzer.Vorgesetzter" required>
            <b-form-select-option
              v-for="vorgesetzter in vorgesetzten"
              :key="vorgesetzter.BenutzerID"
              v-bind:value="vorgesetzter.BenutzerID"
            >
              {{ vorgesetzter.Vorname + " " + vorgesetzter.Nachname }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>

        <p>{{Benutzer}}</p>
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
  name: "editBenutzer",
  data() {
    const datum = new Date();
    const datum_heute = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate());
    
    const maxEintritt = new Date(datum_heute);
    maxEintritt.setMonth(maxEintritt.getMonth());

    const maxGeburtstag = new Date(datum_heute);
    maxGeburtstag.setFullYear(maxGeburtstag.getFullYear()-14);
    return {
      BenutzerID: null,  
      Benutzer: {
        Benutzername: "",
        Passwort: "",
        Vorname: "",
        Nachname: "",
        Geburtsdatum: "",
        Email: "",
        Eintrittsdatum: "",
        bundesland: "",
        istAdmin: false,
        istVorgesetzter: false,
        Vorgesetzter: null,
      },
      bundeslaender: [],
      vorgesetzten: [],
      maxEintrittsdatum: maxEintritt,
      maxGeburtsdatum: maxGeburtstag
    };
  },
  created() {
    this.BenutzerID = this.$route.params.id;
    this.getBenutzer();
    this.getBundeslaender();
    this.getVorgesetzten();
  },
  methods: {
    onReset(evt) {
      evt.preventDefault();
        this.Benutzer.Benutzername = "";
        this.Benutzer.Passwort = "";
        this.Benutzer.Vorname = "";
        this.Benutzer.Nachname = "";
        this.Benutzer.Geburtsdatum = "";
        this.Benutzer.Email = "";
        this.Benutzer.Eintrittsdatum = "";
        this.Benutzer.bundesland = "";
        this.Benutzer.istAdmin = false;
        this.Benutzer.istVorgesetzter = false;
        this.Benutzer.Vorgesetzter = null;
      this.$router.push({ name: "benutzerverwaltung" });
    },
    getBenutzer(){
        axios.get(server.baseURL + '/benutzer/' + this.BenutzerID).then(response => 
        (this.Benutzer = response.data));
    },
    saveBenutzer() {
      let benutzerdaten = {
        Benutzername: this.Benutzer.Benutzername,
        Passwort: this.Benutzer.Passwort,
        Vorname: this.Benutzer.Vorname,
        Nachname: this.Benutzer.Nachname,
        Geburtsdatum: this.Benutzer.Geburtsdatum,
        Email: this.Benutzer.Email,
        Eintrittsdatum: this.Benutzer.Eintrittsdatum,
        bundesland: this.Benutzer.bundesland.BundeslandID,
        istAdmin: this.Benutzer.istAdmin,
        istVorgesetzter: this.Benutzer.istVorgesetzter,
        Vorgesetzter: this.Benutzer.Vorgesetzter
      };
      this.updateBenutzer(this.BenutzerID, benutzerdaten);
    },
    updateBenutzer(id, data) {
      axios.put(server.baseURL + '/benutzer/' + id, data)
        .then(data => {
          this.$router.push({ name: "benutzerverwaltung" });
          return data;
        });
    },
    getBundeslaender() {
      axios
        .get(server.baseURL + "/bundesland")
        .then((response) => (this.bundeslaender = response.data));
    },
    getVorgesetzten() {
      axios
        .get(server.baseURL + "/benutzer/vorgesetzter?istVorgesetzter=true")
        .then((response) => (this.vorgesetzten = response.data));
    },
  },
};
</script>

<style>
h2 {
  text-align: center;
}
</style>