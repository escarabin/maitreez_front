"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./components/home.component');
var notifications_component_1 = require('./components/notifications.component');
var profile_component_1 = require('./components/profile.component');
var users_listing_component_1 = require('./components/users-listing.component');
var sign_in_component_1 = require('./components/sign-in.component');
var routes = [
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'sign-in', component: sign_in_component_1.SignInComponent },
    { path: 'notifications', component: notifications_component_1.NotificationsComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent },
    { path: 'users-listing', component: users_listing_component_1.UsersListingComponent },
    { path: '', component: sign_in_component_1.SignInComponent },
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map