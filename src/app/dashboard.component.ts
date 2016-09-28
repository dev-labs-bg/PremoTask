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

    constructor(
        private httpService: HttpService,
        private formBuilder: FormBuilder,
        private usersService: UsersService
    ) {
        this.form = formBuilder.group({
            'count': [5, Validators.required],
            'time': [5, Validators.required],
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
         * Save a reference of this interval in a class property,
         * in order to be able to clear the interval at some point.
         *
         * TODO: Left in seconds for testing purposes.
         * Convert to minuites later on!
         */
        this.drawWinnersInterval = setInterval( () => {
            this.usersService.drawWinners(+count, +country);
        }, time * 1000);
    }

    /**
     * Turn off the interval that draws new winners
     */
    onDrawingWinnersStop(){
        clearInterval(this.drawWinnersInterval);
        this.drawWinnersInterval = null;
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
