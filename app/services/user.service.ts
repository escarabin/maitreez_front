import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import appGlobals = require('./../globals');

@Injectable()
export class UserService {
    signInUrl = appGlobals.apiUrl + '/user';

    constructor(@Inject(Http) private http: Http) {

    }

    /**
     * Sign user in
     * @param username
     * @param password
     * @returns {Observable<Response>}
     */
    login(username: string, password: string) {
        let body = 'user=' + username + '&password=' + password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.signInUrl, body, options);
    }


    /**
     * Sign user out
     */
    logout() {
        localStorage.removeItem('user');

        document.location.reload();
    }
}