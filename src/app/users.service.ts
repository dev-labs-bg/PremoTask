import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

// By some strange reason we can't use ES6 import here.
var _ = require('lodash');

import { ALL_COUNTRIES } from './constants';
import { HttpService } from "./http.service";
import { User } from './user';

@Injectable()
export class UsersService {
    // full users list
    users:User[] = [];
    // remaining users, that haven't been picked yet
    private remainingUsers:User[] = [];
    winners:User[] = [];
    newWinnersDrawn = new EventEmitter();
    usersReceived = new EventEmitter();
    originalUsersCount:number;
    private country:number;

    constructor(
        private httpService: HttpService
    ) {

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

        // Remote the just picked winner, so we can't pick the same twice
        _.remove(this.remainingUsers, { id: nextWinner.id });

        this.newWinnersDrawn.emit(this.winners);
    }

    private fetchAllUsers() {
        this.httpService.getData('get-all-users').subscribe(
            (users:User[]) => {
                // Copy the actuals array, to prevent changing them by reference
                this.users = users.slice(0);
                this.remainingUsers = users.slice(0);

                this.originalUsersCount = users.length;

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
            return this.remainingUsers;
        }

        return _.filter(this.remainingUsers, { country_id: country });
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

    fetchAllUsersIfNeeded(){
        if (! this.users.length) {
            this.fetchAllUsers();
        }
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
            this.usersReceived.subscribe(
                () => this.drawSingleUser()
            );
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
