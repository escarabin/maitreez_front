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
var angular2_highcharts_1 = require('angular2-highcharts');
var router_1 = require('@angular/router');
// Services
var thing_service_1 = require('./../services/thing.service');
var AnalyticsComponent = (function () {
    function AnalyticsComponent(router, thingService) {
        this.router = router;
        this.thingService = thingService;
        this.chartOptions = [];
        this.periodList = [{ title: "Aujourd'hui", alias: 'today', xMax: 24 },
            { title: "Cette semaine", alias: 'thisWeek', xMax: 7 },
            { title: "Ce mois-ci", alias: 'thisMonth', xMax: 31 },
            { title: "Cette année", alias: 'thisYear', xMax: 12 }];
        /**
         * Define default active period -> today
         */
        this.activePeriodAlias = 'today';
        this.user = {};
    }
    AnalyticsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        /**
         * GET user data from localStorage
         */
        this.user = JSON.parse(JSON.parse(localStorage.getItem('user')));
        /**
         * If user is not logged in, redirect to sign-in component
         */
        if (!this.user) {
            this.router.navigate(['/']);
        }
        /**
         * Loop through different time periods
         */
        var _loop_1 = function(i) {
            var periodAlias = this_1.periodList[i]['alias'];
            var thingDataOverPeriod = [];
            var thingPeriodLabelList = [];
            /**
             * Retrieve data for current thing, channel and period
             */
            this_1.thingService.getData(this_1.thingId, this_1.channelAlias, periodAlias).subscribe(function (res) {
                var total = 0;
                for (var i_1 = 0; i_1 < res.json().length; i_1++) {
                    total += res.json()[i_1]['1'];
                    thingDataOverPeriod.push(res.json()[i_1]['1']);
                    thingPeriodLabelList.push(res.json()[i_1]['0']);
                }
                /**
                 * Set chart options for this specific period
                 */
                _this.chartOptions.push({
                    chart: {
                        type: 'area',
                        renderTo: 'chartContainer_' + periodAlias
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
                        allowDecimals: false,
                        categories: thingPeriodLabelList,
                        max: 10
                    },
                    yAxis: {
                        title: {
                            text: 'Consommation en'
                        }
                    },
                    tooltip: {
                        pointFormat: 'Vous avez consommé <b>{point.y:,.0f}</b><br/>' + 'test' + ' le {point.x} du mois'
                    },
                    plotOptions: {
                        area: {
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
                            data: thingDataOverPeriod
                        }]
                });
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.periodList.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * Set current period of time (today, week, month, year...)
     * @param periodAlias
     */
    AnalyticsComponent.prototype.setActivePeriodAlias = function (periodAlias) {
        this.activePeriodAlias = periodAlias;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AnalyticsComponent.prototype, "thingId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AnalyticsComponent.prototype, "channelAlias", void 0);
    AnalyticsComponent = __decorate([
        core_1.Component({
            selector: 'analytics',
            directives: [angular2_highcharts_1.CHART_DIRECTIVES],
            providers: [thing_service_1.ThingService],
            templateUrl: '../app/templates/analytics.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, thing_service_1.ThingService])
    ], AnalyticsComponent);
    return AnalyticsComponent;
}());
exports.AnalyticsComponent = AnalyticsComponent;
//# sourceMappingURL=analytics.component.js.map