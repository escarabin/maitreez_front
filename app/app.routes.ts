import { provideRouter, Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './components/home.component';
import { NotificationsComponent } from './components/notifications.component';
import { ProfileComponent } from './components/profile.component';
import { UsersListingComponent } from './components/users-listing.component';
import { AnalyticsComponent } from './components/analytics.component';
import { SignInComponent } from './components/sign-in.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'users-listing', component: UsersListingComponent },
    { path: '', component: SignInComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);