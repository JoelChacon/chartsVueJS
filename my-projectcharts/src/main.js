import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

// import Dashboard from './pages/dashboard.vue'
import App1 from './components/App1.vue'
import App2 from './components/App2.vue'
import App3 from './components/App3.vue'

Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
	{path: '/app1', component: App1}
	{path: '/app2', component: App2}
];

// Vue.component('dashboard', Dashboard);
// Vue.component('app1', App1);
// Vue.component('app2', App2);
// Vue.component('app3', App3);



// var appRoutes = new VueRouter();

// appRoutes.map({
// 	'/': {
// 		name: 'home',
// 		component: Dashboard
// 	}
// });

// new Vue({
//     el: '#app1',
//     render: h => h(App1)
// });

// new Vue({
//     el: '#app2',
//     render: h => h(App2)
// });

new Vue({
    el: '#app3',
    render: h => h(App3)
});
