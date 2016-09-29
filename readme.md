# Premo Task

See [task description here](https://github.com/DiCore/PremoTask).

# Project Installation

This guide assumes you already have the project pulled, your virtual hosts correctly configured, and [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) are installed.

1. Copy `.env.example`  to `.env` and fill in the information about the environment.
2. Copy `public/.htaccess-sample`  to `public/.htaccess`.
3. Cd into the project directory and run:

 ```
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed
npm install
npm run build
 ```
