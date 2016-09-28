import { Component, OnInit } from '@angular/core';

import { HttpService } from "./http.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    countries: { id: number, name: string }[] = [];

    constructor(private httpService: HttpService) {}

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
}
