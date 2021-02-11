<template>
  <b-container>
    <h2>Arbeitstage konfigurieren</h2>
    <b-form @reset="onReset" @submit="createKonfiguration">
      <b-form-group label="Wählen Sie die Arbeitstage aus:">
        <b-form-checkbox id="input-1" v-model="Montag"
          >Montag</b-form-checkbox
        >
        <b-form-checkbox id="input-2" v-model="Dienstag"
          >Dienstag</b-form-checkbox
        >
        <b-form-checkbox id="input-3" v-model="Mittwoch"
          >Mittwoch</b-form-checkbox
        >
        <b-form-checkbox id="input-4" v-model="Donnerstag"
          >Donnerstag</b-form-checkbox
        >
        <b-form-checkbox id="input-5" v-model="Freitag"
          >Freitag</b-form-checkbox
        >
        <b-form-checkbox id="input-6" v-model="Samstag"
          >Samstag</b-form-checkbox
        >
        <b-form-checkbox id="input-6" v-model="Sonntag"
          >Sonntag</b-form-checkbox
        >
        </b-form-group>
      <b-button type="submit" variant="primary">Speichern</b-button>
      <b-button type="reset" variant="secondary">Abbrechen</b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from "axios";
import { server } from "../helper.js";
export default {
  name: "Konfiguration",
  data() {
    return {
      Montag: false,
      Dienstag: false,
      Mittwoch: false,
      Donnerstag: false,
      Freitag: false,
      Samstag: false,
      Sonntag: false
    };
  },
  methods: {
    onReset(evt) {
      evt.preventDefault();
        this.Montag = false;
        this.Dienstag = false;
        this.Mittwoch = false;
        this.Donnerstag = false;
        this.Freitag = false;
        this.Samstag = false;
        this.Sonntag = false;
        this.$router.push({ name: "home" });
    },
    createKonfiguration(){
      let konfiguration = {
        Montag: this.Montag,
        Dienstag: this.Dienstag,
        Mittwoch: this.Mittwoch,
        Donnerstag: this.Donnerstag,
        Freitag: this.Freitag,
        Samstag: this.Samstag,
        Sonntag: this.Sonntag
      }
      this.submitToServer(konfiguration);
    },
    submitToServer(data) {
      axios.post(server.baseURL + '/arbeitstage', data).then(data => {
        this.$router.push({ name: "home" });
        return data;
      });
    },  
}
};
</script>