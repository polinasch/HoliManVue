<template>
  <div id="home">
    <b-container class="home-container" fluid>
      <h2>Holiday Manager</h2>
      <b-row>
        <b-col>
          <b-button type="button" block variant="light" class="btn"
            >Verbleibende Urlaubstage</b-button
          >
        </b-col>
        <b-col>
          <b-button type="button" block variant="light" class="btn"
            >In Bearbeitung</b-button
          >
        </b-col>
        <b-col>
          <b-button type="button" block variant="light" class="btn"
            >Ausstehende Genehmigungen</b-button
          >
        </b-col>
        <b-col>
          <b-button type="button" block variant="light" class="btn"
            >Frei planbar</b-button
          >
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <router-link to="/benutzerverwaltung">
            <b-button type="button" block variant="dark" class="btn"
              >Benutzerverwaltung</b-button
            >
          </router-link>
        </b-col>
        <b-col>
          <router-link to="/konfiguration">
            <b-button type="button" block variant="dark" class="btn"
              >Arbeitstage konfigurieren</b-button
            >
          </router-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <router-link to="/erhalteneAntraege">
            <b-button type="button" block variant="dark" class="btn"
              >Zu genehmigende Urlaubsanträge</b-button
            >
          </router-link>
        </b-col>
        <b-col>
          <router-link to="/urlaubsliste">
            <b-button type="button" block variant="dark" class="btn"
              >Mitarbeiter im Urlaub</b-button
            >
          </router-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <router-link to="/urlaubsantrag">
            <b-button type="button" block variant="dark" class="btn"
              >Urlaubsantrag erstellen</b-button
            >
          </router-link>
        </b-col>
        <b-col>
          <router-link to="/antraegeliste">
            <b-button type="button" block variant="dark" class="btn">
             Urlaubsanträge der Mitarbeiter</b-button
            >
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>

<style>
.btn {
  margin: 5px;
}
</style>