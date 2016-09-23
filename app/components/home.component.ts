import { Component, Inject, ViewChild } from '@angular/core';
import { CHART_DIRECTIVES } from 'angular2-highcharts';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

// Services
import { PlaceService } from './../services/place.service';
import { ThingService } from './../services/thing.service';

// Components
import { AnalyticsComponent } from "./analytics.component";

@Component({
    selector: 'home',
    directives: [ CHART_DIRECTIVES, ModalDirective, AnalyticsComponent ],
    providers: [ ThingService, PlaceService ],
    templateUrl: '../app/templates/home.component.html'
})
export class HomeComponent {
    things: any = [];
    place: any = [];
    user: any = [];
    chartOptions: HighchartsOptions[] = [];
    currentThing: any = {};

    @ViewChild('analyticsModal') analyticsModal:ModalDirective;

    constructor(@Inject(PlaceService) private placeService: PlaceService,
                @Inject(ThingService) private thingService: ThingService,
                private router: Router) {
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
            placeService.getInfos(this.user['place_id']).subscribe(res => {
                this.place = JSON.parse(res['_body']);
                this.user['place'] = this.place;

                /**
                 * Save user place in localStorage user object
                 */
                localStorage.setItem('user', JSON.stringify(this.user));
            });

            /**
             * GET place things listing
             */
            placeService.getThings(this.user['place_id']).subscribe(res => {
                this.things = JSON.parse(res['_body']);

                /**
                 * For each things, get different channels
                 */
                for (let i = 0; i < this.things.length; i++) {
                    /**
                     * For each channel, get current data
                     */
                    for (let c = 0; c < this.things.length; c++) {
                        if (this.things[i]['channels'][c]) {
                            this.things[i]['data'] = [];

                            /**
                             * Create an array that is going to be used to create charts on home
                             */
                            let thingDataOverMonth: any = [];
                            let channelAlias = this.things[i]['channels'][c]['name'];
                            let thingId = this.things[i]['uuid'];

                            /**
                             * Get lastUpdate data
                             */
                            thingService.getData(thingId, channelAlias, 'lastUpdate').subscribe(res => {
                                if (res.json()['0']) {
                                    this.things[i]['data']['lastUpdate'] = res.json()['0']['1'];
                                }
                            });

                            /**
                             * Get today data
                             */
                            thingService.getData(thingId, channelAlias, 'today').subscribe(res => {
                                let total = 0;
                                for (let i = 0; i < res.json().length; i++) {
                                    if (res.json()[i]) {
                                        total += res.json()[i]['1'];
                                    }
                                }
                                this.things[i]['data']['today'] = total;
                            });

                            /**
                             * Get month data
                             */
                            thingService.getData(thingId, channelAlias, 'thisMonth').subscribe(res => {
                                let total = 0;

                                for (let i = 0; i < res.json().length; i++) {
                                    if (res.json()[i]) {
                                        total += res.json()[i]['1'];
                                        thingDataOverMonth.push(res.json()[i]['1']);
                                    }
                                }
                                this.things[i]['data']['thisMonth'] = total;

                                /**
                                 * For each things, set chart options after getting month data
                                 */
                                this.chartOptions.push({
                                    chart: {
                                        type: 'line',
                                        renderTo: 'chartContainer' + this.things[i]['uuid']
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
                                        pointFormat: 'Vous avez consommé <b>{point.y:,.0f}</b><br/>' + this.things[i]['channels'][0]['unit'] + ' le {point.x} du mois'
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
                                        data: thingDataOverMonth
                                    }]
                                });
                            });

                            /**
                             * Get year data
                             */
                            thingService.getData(this.things[i]['uuid'], this.things[i]['channels'][c]['name'], 'thisYear').subscribe(res => {
                                let total = 0;
                                for (let i = 0; i < res.json().length; i++) {
                                    if (res.json()[i]) {
                                        total += res.json()[i]['1'];
                                    }
                                }
                                this.things[i]['data']['thisYear'] = total;
                            });
                        }
                    }
                }
            });
        }
    }

    /**
     * Show analytics modal and pass thing + channel data to it
     * @param thing
     */
    showAnalyticsModal(thing: any) {
        this.currentThing = thing;
        this.analyticsModal.show();
    }
}