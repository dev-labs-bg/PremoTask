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
        $countryRepo = app(\App\Models\Repositories\CountryRepository::class);
        $countryService = app(\App\Models\Services\CountryService::class);

        $countries = $countryService->fetchCountries();

        foreach ($countries as $country)
            $countryRepo->createCountry(['name' => $country->name]);
    }
}
