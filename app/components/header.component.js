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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
// Services
var place_service_1 = require('./../services/place.service');
// Components
var mobile_menu_component_1 = require('./mobile-menu.component');
var HeaderComponent = (function () {
    function HeaderComponent(placeService, router) {
        var _this = this;
        this.placeService = placeService;
        this.router = router;
        this.isMobileMenuShown = false;
        this.user = [];
        this.user = JSON.parse(localStorage.getItem('user'));
        router.events.subscribe(function (event) {
            _this.user = JSON.parse(localStorage.getItem('user'));
        });
    }
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header',
            directives: [mobile_menu_component_1.MobileMenuComponent, router_1.ROUTER_DIRECTIVES],
            providers: [place_service_1.PlaceService],
            templateUrl: '../app/templates/header.component.html'
        }),
        __param(0, core_1.Inject(place_service_1.PlaceService)), 
        __metadata('design:paramtypes', [place_service_1.PlaceService, router_2.Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map