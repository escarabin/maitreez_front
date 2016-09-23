import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routing } from './app.routes';
import {
    LocationStrategy,
    HashLocationStrategy
} from '@angular/common';

// Components
import { AppComponent } from './components/app.component';
import { AnalyticsComponent } from './components/analytics.component';
import { SignInComponent } from './components/sign-in.component';
import { ProfileComponent } from './components/profile.component';
import { HomeComponent } from './components/home.component';
import { NotificationsComponent } from './components/notifications.component';
import { UsersListingComponent } from './components/users-listing.component';

// Directives
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    declarations: [ AppComponent,
                    AnalyticsComponent,
                    UsersListingComponent,
                    NotificationsComponent,
                    HomeComponent,
                    ProfileComponent,
                    SignInComponent ],
    imports:      [ BrowserModule,
                    RouterModule,
                    FormsModule,
                    HttpModule,
                    ModalModule,
                    routing ],
    providers:    [ {provide: LocationStrategy, useClass: HashLocationStrategy} ],
    bootstrap:    [ AppComponent ],
})
export class AppModule {}