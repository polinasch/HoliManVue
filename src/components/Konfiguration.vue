<template>
  <b-container>
    <h2>Arbeitstage konfigurieren</h2>
    <b-form @reset="onReset">
      <b-form-group label="Wählen Sie die Arbeitstage aus:">
        <b-form-checkbox-group
          v-model="arbeitstage"
          :options="auswahl"
          stacked
        ></b-form-checkbox-group>
      </b-form-group>
      <b-button type="submit" variant="primary">Speichern</b-button>
      <b-button type="reset" variant="secondary">Abbrechen</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "Konfiguration",
  data() {
    return {
      arbeitstage: [],
      auswahl: [
        { text: "Montag", value: "Montag" },
        { text: "Dienstag", value: "Dienstag" },
        { text: "Mittwoch", value: "Mittwoch" },
        { text: "Donnerstag", value: "Donnerstag" },
        { text: "Freitag", value: "Freitag" },
        { text: "Samstag", value: "Samstag" },
        { text: "Sonntag", value: "Sonntag" },
      ],
    };
  },
  methods: {
    onReset(evt) {
      evt.preventDefault();
        this.arbeitstage = [];
        this.$router.push({ name: "home" });
    },
}
};
</script>