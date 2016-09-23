import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'sidebar',
    directives: [ ROUTER_DIRECTIVES ],
    templateUrl: '../app/templates/sidebar.component.html'
})
export class SidebarComponent { }