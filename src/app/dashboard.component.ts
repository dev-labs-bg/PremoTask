import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { ALL_COUNTRIES } from './constants';
import { UsersService } from './users.service';
import { HttpService } from "./http.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    countries: { id: number, name: string }[] = [];
    form: FormGroup;
    winners:any = [];

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
        this.usersService.drawWinners(count, time, +country);
    }
}
