import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

// TODO: By some strange reason we can't use ES6 import here. Find out why.
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

    private fetchAllUsers() {
        this.httpService.getData('get-all-users').subscribe(
            users => {
                this.users = users;

                this.usersReceived.emit();
            }
        );
    }

    /**
     * Trigger all users fetch,
     * only if the current users array is empty.
     */
    private getAllUsers(){
        if (! this.users.length) {
            this.fetchAllUsers();
        } else {
            this.usersReceived.emit();
        }
    }

    /**
     * Get an array with users, filtered by country.
     *
     * @param {number} country - country id
     */
    private getAllUsersByCountry(country:number){
        if (country === ALL_COUNTRIES) {
            return this.users;
        }

        return _.filter(this.users, { country_id: country });
    }

    /**
     * Get random users (winners), using lodash's sampleSize method,
     * https://lodash.com/docs/4.16.2#sampleSize
     *
     * @param {any}    users - filtered users // TODO: type!
     * @param {number} count - the size of the random collection
     */
    private getRandomWinners(users:any, count:number) {
        return _.sampleSize(users, count);
    }

    drawWinners(count:number, country:number){
        this.getAllUsers();

        this.usersReceived.subscribe(
            () => {
                this.winners = this.getRandomWinners(
                    this.getAllUsersByCountry(country), count
                );

                this.newWinnersDrawn.emit(this.winners);
            }
        );
    }
}
