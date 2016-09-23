import { Component, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Components
import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';

@Component({
    selector: 'app',
    directives: [ SidebarComponent,
                  HeaderComponent,
                  RouterOutlet ],
    templateUrl: '../app/templates/app.component.html'
})
export class AppComponent {
    viewContainerRef: any;

    public constructor(privateviewContainerRef:ViewContainerRef) {
        this.viewContainerRef = privateviewContainerRef;
    }
}