# Description

Laravel 5.3 / Angular 2.0 Final Release

Using webpack to build the angular application with output in ./public folder

The configuration of the webpack / karma - stored in ./config-js folder

Angular 2 Application is stored in ./src and the entry point is ./src/main.ts

# Installation

Copy .env.example  to .env and fill in the information about the environment
run: composer install
run: npm install
run: npm run watch

Configure a virtual host and you are ready to go.

# Task

Fill the database with 100 dummy users ( first_name, last_name, email, password, country)

The task is to build a randomizer that can draw winners based on their location. You should be able to
set a number of winners and a period of drawing a winner. Then start the randomizer and the winners should
be displayed below as a list.

Randomizer:
    - Define number of winners - via input field
    - Select - All countries / Chosen country
    - Define a period of drawing a winner (in minutes) - via input field
    - Click the Draw Winners button and the randomizer starts drawing winners (Displayed a list of winner below the filters and button)


All functionality should be implemented in Angular 2 Using:
    - Service to provide the information about all users via API (Laravel)
    - Directive to show a winner
    - View to show information about single winner (Using Router - @angular/router)

Laravel should be used to store and provide information:
    - User model
    - API Controller (RestFULL)
    - No Need of CSRF verification
    - Communication via JSON
