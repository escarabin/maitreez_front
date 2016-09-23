import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import appGlobals = require('./../globals');

@Injectable()
export class ThingService {
    getThingInfosUrl = appGlobals.apiUrl + '/thing';
    getThingLastUpdateUrl = appGlobals.apiUrl + '/thing';

    constructor(@Inject(Http) private http: Http) {

    }

    /**
     * GET infos regarding specific thing
     * @param thingId
     * @returns {Observable<Response>}
     */
    get(thingId: string) {
        return this.http.get(this.getThingInfosUrl + '/' + thingId + '/channel/SigfowRawData/data');
    }

    /**
     * GET from specific channel of specific thing
     * @param thingId
     * @param channelAlias
     * @param period
     */
    getData(thingId: string, channelAlias: string, period: string) {
        let url = this.getThingLastUpdateUrl + '/' + thingId + '/channel/' + channelAlias + '/' + period;

        return this.http.get(url);
    }
}