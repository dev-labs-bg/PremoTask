import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";

import { ALL_COUNTRIES, PERIOD_OF_TIME_LIMIT } from './constants';
import { UsersService } from './users.service';
import { HttpService } from "./http.service";
import { User } from './user';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styles: [' .clickable { cursor: pointer; } ']
})
export class DashboardComponent implements OnInit, OnDestroy {
    countries: { id: number, name: string }[] = [];
    form: FormGroup;
    winners:User[] = [];
    // Reference to the set interval, so we can clean it afterwards
    drawWinnersInterval:any = null;
    timerText:string = '';
    allUsersCount:number;
    // So we can use it in the template
    ALL_COUNTRIES:number = ALL_COUNTRIES;

    constructor(
        private httpService: HttpService,
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private router: Router
    ) {
        this.form = formBuilder.group({
            'count': ['', this.validatorGreaterThenZero],
            'time': [
                0.1, Validators.compose([
                    this.validatorLessThenReasonableTimeLimit,
                    this.validatorGreaterThenZero
                ])
            ],
            'country': [ALL_COUNTRIES, Validators.required]
        });
    }

    validatorGreaterThenZero(control: FormControl){
        if (+control.value <= 0) {
            // validation fails
            return { notGreaterThenZero: true }
        }

        return null;
    }

    validatorLessThenReasonableTimeLimit(control: FormControl){
        if (DashboardComponent.moreThenTimeLimit(control.value)) {
            // validation fails
            return { notLessThenJavaScriptNumberLimit: true }
        }

        return null;
    }

    /**
     * Static, so it is accessible via the custom validators,
     * that lack an access to the `this` class closure.
     */
    static moreThenTimeLimit(value:number){
        return +value > PERIOD_OF_TIME_LIMIT;
    }

    // So we can use it in the template
    timeLimitReached(value:number) {
        return DashboardComponent.moreThenTimeLimit(value);
    }

    ngOnInit() {
        this.httpService.getData('get-all-countries').subscribe(
            (data:any) => {
                this.countries = data;
            }
        )

        this.usersService.newWinnersDrawn.subscribe(
            (nextWinners:User[]) => {
                this.winners = nextWinners;
                this.allUsersCount = this.usersService.users.length;
            }
        );
    }

    onSubmit(){
        const { count, time, country } = this.form.value;

        // Immediately draw the first winners...
        this.usersService.drawWinners(+country);
        /**
         * ... then, turn an interval on,
         * that picks new winners on every {{ time }} minutes.
         *
         * Do a second-based interval,
         * in order to show a counter per second about how mich time is left,
         * http://stackoverflow.com/a/20618517/1333836
         *
         * Save a reference of this interval in a class property,
         * in order to be able to clear the interval at some point.
         */
        const duration = +time * 60; // in minuites
        let timer:number = duration;
        let minutes:number;
        let seconds:number;
        let remainingWinnersQuota:number = +count - 1 // first pick was already made

        this.drawWinnersInterval = setInterval( () => {
            if (remainingWinnersQuota === 0) {
                this.onDrawingWinnersStop();
            }

            minutes = Math.round(timer / 60);
            seconds = Math.round(timer % 60);

            if (minutes === 0 && seconds === 0) {
                this.timerText = '';
            } else if (minutes === 0) {
                this.timerText = `${seconds} seconds`;
            } else {
                this.timerText = `${minutes} minuites and ${seconds} seconds`;
            }

            if ((timer - 1) >= 0) {
                timer--;
            } else {
                this.usersService.drawWinners(+country);

                // Reset timer for the next pick
                remainingWinnersQuota--;
                timer = duration;
            }
        }, 1000);
    }

    /**
     * Turn off the interval that draws new winners
     */
    onDrawingWinnersStop(){
        clearInterval(this.drawWinnersInterval);
        this.drawWinnersInterval = null;
        this.timerText = '';
    }

    goToUserDetails(userId:string){
        this.router.navigate(['/user', userId]);
    }

    /**
     * When component unmounts, clean-up the mess too.
     */
    ngOnDestroy() {
        if (this.drawWinnersInterval) {
            this.onDrawingWinnersStop();
        }
    }
}
