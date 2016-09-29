import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';

// By some strange reason we can't use ES6 import here.
var _ = require('lodash');

import { HttpService } from "./http.service";
import { Country } from './country';

@Injectable()
export class CountryService {
    countries:Country[];
    allCountriesReceived = new EventEmitter();

    constructor(
        private httpService: HttpService
    ) {
        this.httpService.getData('get-all-countries').subscribe(
            (data:any) => {
                this.countries = data;
                this.allCountriesReceived.emit(data);
            }
        )
    }

    /**
     * Get a country name by id.
     *
     * @param {number} id - user id
     */
    getCountryName(id:number){
        return _.find(this.countries, { id })
    }
}
