import Vue from 'vue';
import Router from 'vue-router';

import UserLogin from "@/components/UserLogin";
import CampaignList from "@/components/CampaignList";
import CampaignResult from "@/components/CampaignResult";
import Campaign from "@/components/Campaign";
import NotFound from "@/components/NotFound";

Vue.use(Router);

const routes = [
	{ path: "/", name:"login" ,component:UserLogin },
  { path: "/campaign", name:"campaign-list" ,component:CampaignList },
  { path: "/campaign/:id", name:"campaign" ,component:Campaign },
  { path: "/campaign/:id/result", name:"campaign-result" ,component:CampaignResult },
  { path: '/404', name:"not-found", component: NotFound },
];

export default new Router({
	routes,
	mode: 'history'
});
