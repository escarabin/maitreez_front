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
var angular2_highcharts_1 = require('angular2-highcharts');
var router_1 = require('@angular/router');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
// Services
var place_service_1 = require('./../services/place.service');
var thing_service_1 = require('./../services/thing.service');
// Components
var analytics_component_1 = require("./analytics.component");
var HomeComponent = (function () {
    function HomeComponent(placeService, thingService, router) {
        var _this = this;
        this.placeService = placeService;
        this.thingService = thingService;
        this.router = router;
        this.things = [];
        this.place = [];
        this.user = [];
        this.chartOptions = [];
        this.currentThing = {};
        /**
         * GET user data from localStorage
         */
        this.user = JSON.parse(localStorage.getItem('user'));
        /**
         * If user is not logged in, redirect to sign-in component
         */
        if (!this.user) {
            this.router.navigate(['/']);
        }
        if (this.user) {
            /**
             * GET place infos
             */
            placeService.getInfos(this.user['place_id']).subscribe(function (res) {
                _this.place = JSON.parse(res['_body']);
                _this.user['place'] = _this.place;
                /**
                 * Save user place in localStorage user object
                 */
                localStorage.setItem('user', JSON.stringify(_this.user));
            });
            /**
             * GET place things listing
             */
            placeService.getThings(this.user['place_id']).subscribe(function (res) {
                _this.things = JSON.parse(res['_body']);
                /**
                 * For each things, get different channels
                 */
                var _loop_1 = function(i) {
                    /**
                     * For each channel, get current data
                     */
                    var _loop_2 = function(c) {
                        if (_this.things[i]['channels'][c]) {
                            _this.things[i]['data'] = [];
                            /**
                             * Create an array that is going to be used to create charts on home
                             */
                            var thingDataOverMonth_1 = [];
                            var channelAlias = _this.things[i]['channels'][c]['name'];
                            var thingId = _this.things[i]['uuid'];
                            /**
                             * Get lastUpdate data
                             */
                            thingService.getData(thingId, channelAlias, 'lastUpdate').subscribe(function (res) {
                                if (res.json()['0']) {
                                    _this.things[i]['data']['lastUpdate'] = res.json()['0']['1'];
                                }
                            });
                            /**
                             * Get today data
                             */
                            thingService.getData(thingId, channelAlias, 'today').subscribe(function (res) {
                                var total = 0;
                                for (var i_1 = 0; i_1 < res.json().length; i_1++) {
                                    if (res.json()[i_1]) {
                                        total += res.json()[i_1]['1'];
                                    }
                                }
                                _this.things[i]['data']['today'] = total;
                            });
                            /**
                             * Get month data
                             */
                            thingService.getData(thingId, channelAlias, 'thisMonth').subscribe(function (res) {
                                var total = 0;
                                for (var i_2 = 0; i_2 < res.json().length; i_2++) {
                                    if (res.json()[i_2]) {
                                        total += res.json()[i_2]['1'];
                                        thingDataOverMonth_1.push(res.json()[i_2]['1']);
                                    }
                                }
                                _this.things[i]['data']['thisMonth'] = total;
                                /**
                                 * For each things, set chart options after getting month data
                                 */
                                _this.chartOptions.push({
                                    chart: {
                                        type: 'line',
                                        renderTo: 'chartContainer' + _this.things[i]['uuid']
                                    },
                                    title: {
                                        text: ''
                                    },
                                    legend: {
                                        enabled: false
                                    },
                                    credits: {
                                        enabled: false
                                    },
                                    xAxis: {
                                        gridLineWidth: 0,
                                        lineWidth: 0,
                                        minorGridLineWidth: 0,
                                        lineColor: 'transparent',
                                        labels: {
                                            enabled: false
                                        },
                                        minorTickLength: 0,
                                        tickLength: 0
                                    },
                                    yAxis: {
                                        gridLineWidth: 0,
                                        lineWidth: 0,
                                        minorGridLineWidth: 0,
                                        lineColor: 'transparent',
                                        labels: {
                                            enabled: false
                                        },
                                        minorTickLength: 0,
                                        tickLength: 0
                                    },
                                    tooltip: {
                                        pointFormat: 'Vous avez consommé <b>{point.y:,.0f}</b><br/>' + _this.things[i]['channels'][0]['unit'] + ' le {point.x} du mois'
                                    },
                                    plotOptions: {
                                        area: {
                                            pointStart: 1940,
                                            color: 'rgba(91,0,209,1)',
                                            marker: {
                                                enabled: false,
                                                symbol: 'circle',
                                                radius: 2,
                                                states: {
                                                    hover: {
                                                        enabled: true
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    series: [{
                                            name: 'Consommation',
                                            data: thingDataOverMonth_1
                                        }]
                                });
                            });
                            /**
                             * Get year data
                             */
                            thingService.getData(_this.things[i]['uuid'], _this.things[i]['channels'][c]['name'], 'thisYear').subscribe(function (res) {
                                var total = 0;
                                for (var i_3 = 0; i_3 < res.json().length; i_3++) {
                                    if (res.json()[i_3]) {
                                        total += res.json()[i_3]['1'];
                                    }
                                }
                                _this.things[i]['data']['thisYear'] = total;
                            });
                        }
                    };
                    for (var c = 0; c < _this.things.length; c++) {
                        _loop_2(c);
                    }
                };
                for (var i = 0; i < _this.things.length; i++) {
                    _loop_1(i);
                }
            });
        }
    }
    /**
     * Show analytics modal and pass thing + channel data to it
     * @param thing
     */
    HomeComponent.prototype.showAnalyticsModal = function (thing) {
        this.currentThing = thing;
        this.analyticsModal.show();
    };
    __decorate([
        core_1.ViewChild('analyticsModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], HomeComponent.prototype, "analyticsModal", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            directives: [angular2_highcharts_1.CHART_DIRECTIVES, ng2_bootstrap_1.ModalDirective, analytics_component_1.AnalyticsComponent],
            providers: [thing_service_1.ThingService, place_service_1.PlaceService],
            templateUrl: '../app/templates/home.component.html'
        }),
        __param(0, core_1.Inject(place_service_1.PlaceService)),
        __param(1, core_1.Inject(thing_service_1.ThingService)), 
        __metadata('design:paramtypes', [place_service_1.PlaceService, thing_service_1.ThingService, router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map