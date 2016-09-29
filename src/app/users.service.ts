import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

// TODO: By some strange reason we can't use ES6 import here. Find out why.
var _ = require('lodash');

import { ALL_COUNTRIES } from './constants';
import { HttpService } from "./http.service";
import { User } from './user';

@Injectable()
export class UsersService {
    users:User[] = [];
    winners:User[] = [];
    newWinnersDrawn = new EventEmitter();
    private usersReceived = new EventEmitter();
    private country:number;

    constructor(
        private httpService: HttpService
    ) {
        this.usersReceived.subscribe(
            () => this.drawSingleUser()
        );
    }

    /**
     * Draws a sngle user in the winners array
     * and emits an event.
     */
    private drawSingleUser(){
        const nextWinner = this.getRandomWinners(
            this.getAllUsersByCountry(this.country)
        );
        this.winners.push(nextWinner);

        this.newWinnersDrawn.emit(this.winners);
    }

    private fetchAllUsers() {
        this.httpService.getData('get-all-users').subscribe(
            (users:User[]) => {
                this.users = users;

                this.usersReceived.emit();
            }
        );
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
     * @param {User[]}    users - filtered users
     */
    private getRandomWinners(users:User[]) {
        return _.sample(users);
    }

    drawWinners(country:number){
        this.country = country;

        /**
         * Trigger all users fetch,
         * only if the current users array is empty.
         * The fetch itself triggers drawSingleUser on success.
         */
        if (! this.users.length) {
            this.fetchAllUsers();
        } else {
            this.drawSingleUser();
        }
    }

    cleanWinnersList(){
        this.winners.length = 0;
    }

    /**
     * Get a single user details, by his id.
     *
     * @param {number} id - user id
     */
    getUserDetails(id:number){
        return _.find(this.users, { id })
    }
}
