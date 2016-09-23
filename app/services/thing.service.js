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
var http_1 = require('@angular/http');
var appGlobals = require('./../globals');
var ThingService = (function () {
    function ThingService(http) {
        this.http = http;
        this.getThingInfosUrl = appGlobals.apiUrl + '/thing';
        this.getThingLastUpdateUrl = appGlobals.apiUrl + '/thing';
    }
    /**
     * GET infos regarding specific thing
     * @param thingId
     * @returns {Observable<Response>}
     */
    ThingService.prototype.get = function (thingId) {
        return this.http.get(this.getThingInfosUrl + '/' + thingId + '/channel/SigfowRawData/data');
    };
    /**
     * GET from specific channel of specific thing
     * @param thingId
     * @param channelAlias
     * @param period
     */
    ThingService.prototype.getData = function (thingId, channelAlias, period) {
        var url = this.getThingLastUpdateUrl + '/' + thingId + '/channel/' + channelAlias + '/' + period;
        return this.http.get(url);
    };
    ThingService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ThingService);
    return ThingService;
}());
exports.ThingService = ThingService;
//# sourceMappingURL=thing.service.js.map