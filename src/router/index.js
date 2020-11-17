import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue"
import Home from "../views/Home.vue"
import Urlaubsantrag from "../components/Urlaubsantrag.vue"
import Anträgeliste from "../views/Anträgeliste.vue"
import Benutzerverwaltung from "../components/Benutzerverwaltung.vue"
import Benutzer from "../components/Benutzer.vue"
import Konfiguration from "../components/Konfiguration.vue"
import Urlaubsliste from "../views/Urlaubsliste.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
        name: "login"
    }
},
{
    path: "/login",
    name: "login",
    component: Login
},
{
    path: "/home",
    name: "home",
    component: Home,
},
{
    path: "/urlaubsantrag",
    name: "urlaubsantrag",
    component: Urlaubsantrag
},
{ 
    path: "/antraegeliste",
    name: "antraegeliste",
    component: Anträgeliste
},
{
    path: "/benutzerverwaltung",
    name: "benutzerverwaltung",
    component: Benutzerverwaltung
},
{
    path: "/benutzer",
    name: "benutzerverwaltung",
    component: Benutzer
},
{
    path: "/konfiguration",
    name: "konfiguration",
    component: Konfiguration
},
{
    path: "/urlaubsliste",
    name: "urlaubsliste",
    component: Urlaubsliste
}
];

const router =  new VueRouter({
  routes
});

export default router;