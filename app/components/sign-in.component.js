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
// Services
var user_service_1 = require('./../services/user.service');
var SignInComponent = (function () {
    function SignInComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.user = [];
        this.isLoading = false;
        /**
         * GET user data from localStorage
         */
        this.user = JSON.parse(JSON.parse(localStorage.getItem('user')));
        /**
         * If user is already logged in, redirect to home component
         */
        if (this.user) {
            this.router.navigate(['/home']);
        }
    }
    SignInComponent.prototype.logIn = function () {
        var _this = this;
        this.isLoading = true;
        this.userService.login(this.username, this.password).subscribe(function (res) {
            _this.user = res;
            localStorage.setItem('user', JSON.stringify(res['_body']));
            _this.router.navigate(['/home']);
        });
    };
    SignInComponent = __decorate([
        core_1.Component({
            selector: 'sign-in',
            providers: [user_service_1.UserService],
            templateUrl: '../app/templates/sign-in.component.html'
        }),
        __param(0, core_1.Inject(user_service_1.UserService)), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=sign-in.component.js.map