import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { HttpService } from "./http.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    countries: { id: number, name: string }[] = [];
    form: FormGroup;

    constructor(
        private httpService: HttpService,
        private formBuilder: FormBuilder
    ) {
        this.form = formBuilder.group({
            'winners-count': ['', Validators.required],
            'time': ['', Validators.required],
            'country': ['all', Validators.required]
        });
    }

    ngOnInit() {
        this.httpService.getData('get-all-countries').subscribe(
            (data:any) => {
                this.countries = data;
            }
        )
    }

    onCountryChange(newCountry:string){
        console.log(newCountry);
    }

    onSubmit(){
        console.log(this.form);
    }
}
