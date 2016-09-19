<?php

namespace App\Models\Repositories;

use Illuminate\Support\ServiceProvider;

class RepositoriesServiceProvider extends ServiceProvider
{

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        /**
         * Read me: For every repository we must make a binding to Laravel's IOC here.
         * We're basically saying: When someone (through IOC) wants an instance of
         * the \App\Models\Repositories\UserRepository class - return this object
         *
         * This way we can inject the Eloquent or ORM
         * models we need for every repository here,
         * so the repo is not tied to the ORM used
         *
         * @see https://laravel.com/docs/5.3/container
         */
        $this->app->bind(\App\Models\Repositories\UserRepository::class, function ($app) {
            return new UserRepository(new \App\Models\Entities\User);
        });

        $this->app->bind(\App\Models\Repositories\CountryRepository::class, function ($app) {
            return new CountryRepository(new \App\Models\Entities\Country);
        });
    }
}
