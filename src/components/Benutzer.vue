<template>
  <div>
    <b-container>
      <h2>Benutzer erstellen</h2>
      <b-form @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Benutzer-ID:"
          label-for="input-1"
        >
          <b-form-input
            type="number"
            id="input-1"
            v-model="form.id"
            min="0"
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
            v-model="form.nutzername"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Passwort:" label-for="input-3">
          <b-form-input
            type="password"
            id="input-3"
            v-model="form.passwort"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Vorname:" label-for="input-4">
          <b-form-input
            type="text"
            id="input-4"
            v-model="form.vorname"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5" label="Nachname:" label-for="input-5">
          <b-form-input
            type="text"
            id="input-5"
            v-model="form.nachname"
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
            v-model="form.geburtsdatum"
            placeholder="Geburtsdatum auswählen"
            required
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group id="input-group-7" label="Email:" label-for="input-7">
          <b-form-input
            type="email"
            id="input-7"
            v-model="form.email"
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
            v-model="form.zugehoerigkeit"
            placeholder="Datum auswählen"
            required
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group
          id="input-group-9"
          label="Bundesland:"
          label-for="input-9"
        >
          <b-form-select
            id="input-9"
            v-model="form.bundesland"
            :options="bundeslaender"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-10" label="Rolle:" label-for="input-10">
          <b-form-checkbox-group
            id="input-10"
            v-model="form.rolle"
            :options="rollen"
            required
          ></b-form-checkbox-group>
        </b-form-group>

    <b-form-group
          id="input-group-11"
          label="Vorgesetzter:"
          label-for="input-11"
        >
          <b-form-select
            id="input-11"
            v-model="form.vorgesetzter"
            :options="vorgesetzten"
            required
          ></b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary">Speichern</b-button>
        <b-button type="reset" variant="secondary">Abbrechen</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Benutzer",
  data() {
    return {
      form: {
        id: null,
        nutzername: "",
        passwort: "",
        vorname: "",
        nachname: "",
        geburtsdatum: "",
        email: "",
        zugehoerigkeit: "",
        bundesland: null,
        rolle: false,
        vorgesetzter: null
      },
      bundeslaender: [
        { value: null, text: "Wählen Sie ein Bundesland aus" },
        { value: "nrw", text: "Nordrhein-Westfalen" },
        { value: "bayern", text: "Bayern" },
      ],
      rollen: [
        { value: "Admin", text: "Admin" },
        { value: "Vorgesetzter", text: "Vorgesetzter" },
      ],
      vorgesetzten: [
        { value: "Max Müller", text: "Max Müller"},
        { value: "Susanne Busch", text: "Susanne Busch"}
      ],
    };
  },
  methods: {
    onReset(evt) {
      evt.preventDefault();
        this.form.id= null,
        this.form.nutzername= "",
        this.form.passwort= "",
        this.form.vorname= "",
        this.form.nachname= "",
        this.form.geburtsdatum= "",
        this.form.email= "",
        this.form.zugehoerigkeit= "",
        this.form.bundesland= null,
        this.form.rolle= false,
        this.form.vorgesetzter= null
        this.$router.push({ name: "home" });
    },
  },
};
</script>

<style>
h2 {
  text-align: center;
}
</style>