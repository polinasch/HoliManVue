<template>
  <div>
    <b-container>
      <h2>Urlaubsantrag bearbeiten</h2>
      <b-form @reset="onReset" @submit.prevent="bearbeiteAntrag">
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
            :min="minAnfang"
            required
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group id="input-group-4" label="Enddatum:" label-for="input-4">
          <b-form-datepicker
            id="input-4"
            v-model="bis"
            placeholder="Enddatum auswählen"
            :min="von"
            required
          ></b-form-datepicker>
        </b-form-group>

        <div class="mt-3">
          Anzahl der Urlaubstage: <strong>{{ urlaubstage }}</strong>
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
const moment = require('moment');
export default {
  name: "editUrlaubsantrag",
  data() {
    const datum = new Date();
    const datum_heute = new Date(datum.getFullYear(), datum.getMonth(), datum.getDate());
    
    const minVon = new Date(datum_heute);
    minVon.setDate(minVon.getDate()+ 1);
    return {
        AntragID: null,
        internalBis: "",
        minAnfang: minVon,
        Urlaubsart: "",
        Grund: "",
        von: "",
        Status: "",
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
      ]
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
    },
    urlaubstage: function (){
      return moment(this.bis).diff(moment(this.von), 'days')+1;
    }
  },
  created() {
    this.AntragID = this.$route.params.id;
    this.getAntrag();
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
      getAntrag(){
        axios.get(server.baseURL + '/urlaubsantrag/' + this.AntragID).then(response => 
        { this.Urlaubsart = response.data.Urlaubsart;
          this.Grund = response.data.Grund;
          this.von = response.data.von;
          this.bis = response.data.bis;
        });
      },
      bearbeiteAntrag(){
        let antragdaten = {
        Urlaubsart: this.Urlaubsart,
        Status: "Erstellt",
        von: this.von,
        bis: this.bis,
        Grund: this.Grund,
        informiert: false,
        benutzer: this.benutzer
      };
      this.updateAntrag(this.AntragID, antragdaten);
      },
      updateAntrag(id, data){
        axios.put(server.baseURL + "/urlaubsantrag/" + id, data).then((data) => {
        this.$router.push({ name: "antraegeliste" });
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