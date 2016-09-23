import { Component, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

// Services
import { UserService } from './../services/user.service';

@Component({
    selector: 'sign-in',
    providers: [ UserService ],
    templateUrl: '../app/templates/sign-in.component.html'
})

export class SignInComponent {
    username: string;
    password: string;
    user: any = [];
    isLoading: boolean = false;

    constructor (@Inject(UserService) private userService: UserService,
                 private router: Router) {
        /**
         * GET user data from localStorage
         */
        this.user = JSON.parse(JSON.parse(localStorage.getItem('user')));

        /**
         * If user is already logged in, redirect to home component
         */
        if (this.user) {
            this.router.navigate(['/home']);
        }
    }

    logIn() {
        this.isLoading = true;

        this.userService.login(this.username, this.password).subscribe((res: Response) => {
            this.user = res;
            localStorage.setItem('user', JSON.stringify(res['_body']));

            this.router.navigate(['/home']);
        });
    }
}