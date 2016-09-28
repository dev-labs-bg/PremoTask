import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { ALL_COUNTRIES } from './constants';
import { UsersService } from './users.service';
import { HttpService } from "./http.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
    countries: { id: number, name: string }[] = [];
    form: FormGroup;
    winners:any = [];
    counter:number = 0;
    drawWinnersInterval:any = null;
    timerText:string = '';

    constructor(
        private httpService: HttpService,
        private formBuilder: FormBuilder,
        private usersService: UsersService
    ) {
        this.form = formBuilder.group({
            'count': [5, Validators.required],
            'time': [0.1, Validators.required],
            'country': [ALL_COUNTRIES, Validators.required]
        });
    }

    ngOnInit() {
        this.httpService.getData('get-all-countries').subscribe(
            (data:any) => {
                this.countries = data;
            }
        )

        this.usersService.newWinnersDrawn.subscribe(
            (nextWinners:any) => {
                this.winners = nextWinners
            }
        );
    }

    onSubmit(){
        const { count, time, country } = this.form.value;

        // Immediately draw the first winners...
        this.usersService.drawWinners(+count, +country);
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

        this.drawWinnersInterval = setInterval( () => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            if (minutes === 0 && seconds === 0) {
                this.timerText = '';
            } else if (minutes === 0) {
                this.timerText = `${seconds} seconds`;
            } else {
                this.timerText = `${minutes} minuites and ${seconds} seconds`;
            }

            if (--timer < 0) {
                timer = duration;
                this.usersService.drawWinners(+count, +country);
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

    /**
     * When component unmounts, clean-up the mess too.
     */
    ngOnDestroy() {
        if (this.drawWinnersInterval) {
            this.onDrawingWinnersStop();
        }
    }
}
