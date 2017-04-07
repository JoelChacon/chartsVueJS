import Vue from 'vue'
import VueResource from 'vue-resource'
import App1 from './App1.vue'
import App2 from './App2.vue'
import App3 from './App3.vue'

// Vue.use(VueHighcharts);
Vue.use(VueResource);

new Vue({
    el: '#app1',
    render: h => h(App1)
});

new Vue({
    el: '#app2',
    render: h => h(App2)
});

new Vue({
    el: '#app3',
    render: h => h(App3)
});