import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import appGlobals = require('./../globals');

@Injectable()
export class PlaceService {
    getPlaceInfosUrl = appGlobals.apiUrl + '/place';
    getThingsListingUrl = appGlobals.apiUrl + '/things/place';

    constructor(@Inject(Http) private http: Http) {

    }

    /**
     * GET infos regarding specific place
     * @param placeId
     * @returns {Observable<Response>}
     */
    getInfos(placeId: string) {
        return this.http.get(this.getPlaceInfosUrl + '/' + placeId);
    }

    /**
     * GET things inside a place
     * @param placeId
     * @returns {Observable<Response>}
     */
    getThings(placeId: string) {
        return this.http.get(this.getThingsListingUrl + '/' + placeId);
    }
}