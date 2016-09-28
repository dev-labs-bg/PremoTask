import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { ActivatedRoute, Router } from "@angular/router";

import { UsersService } from './users.service';
import { User } from './user';

@Component({
    selector: 'app-user',
    templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
    user:User;
    userId:number;
    private subscription: Subscription;

    constructor(
        private usersService: UsersService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(){
        this.subscription = this.route.params.subscribe(
            (params:any) => {
                if (params.hasOwnProperty('id')) {
                    const userId = +params['id'];
                    this.user = this.usersService.getUserDetails(userId);
                }
            }
        )
    }

    navigateBack() {
        this.router.navigate(['../']);
    }

    // Clean-up when the component is unmounted to prevent memory leaks
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
