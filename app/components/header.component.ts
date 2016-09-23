import { Component, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Router } from '@angular/router';

// Services
import { PlaceService } from './../services/place.service';

// Components
import { MobileMenuComponent } from './mobile-menu.component';

@Component({
    selector: 'header',
    directives: [ MobileMenuComponent, ROUTER_DIRECTIVES ],
    providers: [ PlaceService ],
    templateUrl: '../app/templates/header.component.html'
})
export class HeaderComponent {
    isMobileMenuShown = false;
    user: any = [];

    constructor (@Inject(PlaceService) private placeService: PlaceService,
                 private router: Router) {
        this.user = JSON.parse(localStorage.getItem('user'));

        router.events.subscribe((event) => {
            this.user = JSON.parse(localStorage.getItem('user'));
        });
    }
}