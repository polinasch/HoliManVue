import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue"
import Home from "../views/Home.vue"
import Urlaubsantrag from "../components/Urlaubsantrag.vue"
import Anträgeliste from "../views/Anträgeliste.vue"

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
}
];

const router =  new VueRouter({
  routes
});

export default router;