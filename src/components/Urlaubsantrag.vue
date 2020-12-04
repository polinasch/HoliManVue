<template>
  <div>
    <b-container>
      <h2>Urlaubsantrag erstellen</h2>
      <b-form @reset="onReset" @submit.prevent="erstelleAntrag">
        <b-form-group
          id="input-group-1"
          label="Urlaubsart:"
          label-for="input-1"
        >
          <b-form-select
            id="input-1"
            v-model="Urlaubsart"
            :options="arten"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-2" label="Grund:" label-for="input-2">
          <b-form-radio-group
            id="input-2"
            v-model="Grund"
            :options="gruende"
            required
            stacked
          ></b-form-radio-group>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Anfangsdatum:"
          label-for="input-3"
        >
          <b-form-datepicker
            id="input-3"
            v-model="von"
            placeholder="Anfangsdatum auswählen"
            required
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group id="input-group-4" label="Enddatum:" label-for="input-4">
          <b-form-datepicker
            id="input-4"
            v-model="bis"
            placeholder="Enddatum auswählen"
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
    return {
        Urlaubsart: "",
        Grund: "",
        von: "",
        bis: "",
        Status: "",
        BenutzerID: 20,
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
  methods: {
      onReset(evt) {
        evt.preventDefault();
        this.Urlaubsart = null;
        this.Grund = "";
        this.von = "";
        this.bis = "";
        this.Urlaubstage ="";
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
        benutzer: this.BenutzerID
      };
      this.submitAntrag(antragdaten);
      },
      submitAntrag(data){
        axios.post(server.baseURL + "/urlaubsantrag", data).then((data) => {
        this.$router.push({ name: "home" });
        return data;
      });
      }
    }
};
</script>

<style>
h2 {
  text-align: center;
}
</style>