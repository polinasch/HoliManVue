<template>
  <div>
    <b-container>
      <h2>Urlaubsantrag erstellen</h2>
      <b-form @reset="onReset" @submit.prevent="erstelleAntrag">
        <b-form-group
          id="input-group-1"
          label="Mitarbeiter:"
          label-for="input-1"
        >
          <b-form-select id="input-1" v-model="benutzer" required>
            <b-form-select-option
              v-for="benutzer in Benutzer"
              :key="benutzer.BenutzerID"
              v-bind:value="benutzer.BenutzerID"
            >
              {{ "ID: "+ benutzer.BenutzerID + ", " + benutzer.Vorname + " " + benutzer.Nachname }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        
        <b-form-group
          id="input-group-2"
          label="Urlaubsart:"
          label-for="input-2"
        >
          <b-form-select
            id="input-2"
            v-model="Urlaubsart"
            :options="arten"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-3" label="Grund:" label-for="input-3">
          <b-form-radio-group
            id="input-3"
            v-model="Grund"
            :options="gruende"
            required
            stacked
          ></b-form-radio-group>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Anfangsdatum:"
          label-for="input-4"
        >
          <b-form-datepicker
            id="input-4"
            v-model="von"
            placeholder="Anfangsdatum auswählen"
            :min="minAnfang"
            required
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group id="input-group-5" label="Enddatum:" label-for="input-5">
          <b-form-datepicker
            id="input-5"
            v-model="bis"
            placeholder="Enddatum auswählen"
            :min="von"
            required
          ></b-form-datepicker>
        </b-form-group>

        <div class="mt-3">
          Anzahl der Urlaubstage: <strong>{{ Urlaubstage }}</strong>
        </div>

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
  name: "Urlaubsantrag",
  data() {
    const datum = new Date();
    const datum_heute = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate());
    
    const minVon = new Date(datum_heute);
    minVon.setDate(minVon.getDate()+ 1);

    return {
        Urlaubsart: "",
        Grund: "",
        von: "",
        Status: "",
        minAnfang: minVon,
        internalBis: "",
        benutzer: null,
        Benutzer: [],
      arten: [
        { value: null, text: "Wählen Sie die Urlaubsart aus" },
        { value: "Urlaub", text: "Urlaub" },
        { value: "Sonderurlaub", text: "Sonderurlaub" },
      ],
      gruende: [
        { value: "Umzug", text: "Umzug" },
        { value: "Hochzeit", text: "Hochzeit" },
        { value: "Geburt", text: "Geburt" },
        { value: "Umzug", text: "Sonstiges" },
      ],
      Urlaubstage: "",
    };
  },
  computed: {
    bis: {
      get: function () {
        if (this.internalBis < this.von) {
          return this.von;
        }
        return this.internalBis;
      },
      set: function(newValue) {
        this.internalBis = newValue;
      }
    }
  },
  created() {
    this.getBenutzer();
  },
  methods: {
      onReset(evt) {
        evt.preventDefault();
        this.Urlaubsart = null;
        this.Grund = "";
        this.von = "";
        this.bis = "";
        this.Urlaubstage ="";
        this.benutzer = null;
        this.$router.push({ name: 'home' });
      },
      erstelleAntrag(){
        let antragdaten = {
        Urlaubsart: this.Urlaubsart,
        Status: "Erstellt",
        von: this.von,
        bis: this.bis,
        Grund: this.Grund,
        informiert: false,
        benutzer: this.benutzer
      };
      this.submitAntrag(antragdaten);
      },
      submitAntrag(data){
        axios.post(server.baseURL + "/urlaubsantrag", data).then((data) => {
        this.$router.push({ name: "home" });
        return data;
      });
      },
      getBenutzer() {
        axios
        .get(server.baseURL + "/benutzer")
        .then((response) => (this.Benutzer = response.data));
      }
    }
};
</script>

<style>
h2 {
  text-align: center;
}
</style>