"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var app_routes_1 = require('./app.routes');
var common_1 = require('@angular/common');
// Components
var app_component_1 = require('./components/app.component');
var analytics_component_1 = require('./components/analytics.component');
var sign_in_component_1 = require('./components/sign-in.component');
var profile_component_1 = require('./components/profile.component');
var home_component_1 = require('./components/home.component');
var notifications_component_1 = require('./components/notifications.component');
var users_listing_component_1 = require('./components/users-listing.component');
// Directives
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent,
                analytics_component_1.AnalyticsComponent,
                users_listing_component_1.UsersListingComponent,
                notifications_component_1.NotificationsComponent,
                home_component_1.HomeComponent,
                profile_component_1.ProfileComponent,
                sign_in_component_1.SignInComponent],
            imports: [platform_browser_1.BrowserModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng2_bootstrap_1.ModalModule,
                app_routes_1.routing],
            providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
            bootstrap: [app_component_1.AppComponent],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map