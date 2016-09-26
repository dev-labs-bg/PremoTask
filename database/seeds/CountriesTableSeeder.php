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
        $countryService = app(\App\Models\Services\CountryService::class);

        // fetch all countries from API
        $countries = $countryService->fetch(10);

        // save all countries
        foreach ($countries as $country)
            $countryService->create(['name' => $country->name]);
    }
}
