import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
var _ = require('lodash');

import { ALL_COUNTRIES } from './constants';
import { HttpService } from "./http.service";

@Injectable()
export class UsersService {
    users:any = [];
    usersReceived = new EventEmitter();
    winners:any = [];
    newWinnersDrawn = new EventEmitter();

    constructor(
        private httpService: HttpService
    ) { }

    private getAllUsers() {
        this.httpService.getData('get-all-users').subscribe(
            users => {
                this.users = users;
                this.usersReceived.emit(users)
            }
        );
    }

    private getAllUsersByCountry(country:number){
        if (country === ALL_COUNTRIES) {
            return this.users;
        }

        return _.filter(this.users, { country_id: country });
    }

    drawWinners(count:number, country:number){
        this.getAllUsers();

        this.usersReceived.subscribe(
            () => {
                this.winners = _.sampleSize(
                    this.getAllUsersByCountry(country), count
                );

                this.newWinnersDrawn.emit(this.winners);
            }
        );
    }
}
