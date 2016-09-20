<?php

use Illuminate\Database\Seeder;

class CountriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // get instances of classes we need
        $countryRepo = app(\App\Models\Repositories\CountryRepository::class);
        $countryFetcher = app(\App\APIs\RestCountries\CountryFetcher::class);

        // fetch all contries API
        $countries = $countryFetcher->getAll();

        // save all countries
        foreach ($countries as $country)
            $countryRepo->createCountry(['name' => $country->name]);
    }
}
