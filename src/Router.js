import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './views/Home.vue';
import Result from './views/Result.vue';
import Persons from './views/Persons.vue';
import Products from './views/Products.vue';

const routes = [
	{ path: '/', component: Home },
	{ path: '/result', component: Result },
	{ path: '/persons', component: Persons },
	{ path: '/products', component: Products },
];

export default createRouter({
	history: createWebHashHistory(),
	routes,
});