import { Component, Input, Inject } from '@angular/core';
import { CHART_DIRECTIVES } from 'angular2-highcharts';
import { Router } from '@angular/router';

// Services
import { ThingService } from './../services/thing.service';

@Component({
    selector: 'analytics',
    directives: [ CHART_DIRECTIVES ],
    providers: [ ThingService ],
    templateUrl: '../app/templates/analytics.component.html'
})

export class AnalyticsComponent {
    chartOptions: HighchartsOptions[] = [];
    periodList: any = [{title: "Aujourd'hui", alias: 'today', xMax: 24},
                       {title: "Cette semaine", alias: 'thisWeek', xMax: 7},
                       {title: "Ce mois-ci", alias: 'thisMonth', xMax: 31},
                       {title: "Cette année", alias: 'thisYear', xMax: 12}];

    /**
     * Define default active period -> today
     */
    activePeriodAlias: string = 'today';
    user: any = {};
    @Input() private thingId: string;
    @Input() private channelAlias: string;

    constructor(private router: Router,
                private thingService: ThingService) {

    }

    ngAfterViewInit() {
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
        for (let i = 0; i < this.periodList.length; i++) {
            let periodAlias = this.periodList[i]['alias'];
            let thingDataOverPeriod:any = [];
            let thingPeriodLabelList:any = [];

            /**
             * Retrieve data for current thing, channel and period
             */
            this.thingService.getData(this.thingId, this.channelAlias, periodAlias).subscribe(res => {
                let total = 0;
                for (let i = 0; i < res.json().length; i++) {
                    total += res.json()[i]['1'];
                    thingDataOverPeriod.push(res.json()[i]['1']);
                    thingPeriodLabelList.push(res.json()[i]['0']);
                }

                /**
                 * Set chart options for this specific period
                 */
                this.chartOptions.push({
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
                        /*labels: {
                         formatter: function () {
                         return thingPeriodLabelList[0]; // clean, unformatted number for year
                         }
                         }*/
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
        }
    }

    /**
     * Set current period of time (today, week, month, year...)
     * @param periodAlias
     */
    setActivePeriodAlias(periodAlias: string) {
        this.activePeriodAlias = periodAlias;
    }
}