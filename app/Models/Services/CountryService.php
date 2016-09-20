<?php

namespace App\Models\Services;

use App\Models\Repositories\CountryRepository;
use App\APIs\RestCountries\CountryFetcher;

class CountryService
{
    /**
     * Declare the type of the $CountryRepo field
     * here, so your IDE's autocomplete kicks
     * in and shows available methods for it
     *
     * @var CountryRepository
     */
    protected $countryRepo;

    /**
     * Country Api Fetcher
     *
     * @var App\APIs\RestCountries\CountryFetcher
     */
    protected $countryFetcher;

    /**
     * The constructor will inject a CountryRepository instance to our class
     * with IOC here. It can later be used to fetch all our repo data.
     * In the tests Mockery can overwrite this with the mock object
     *
     * @param CountryRepository $countryRepo
     */
    public function __construct(CountryRepository $countryRepo, CountryFetcher $countryFetcher)
    {
        $this->countryRepo = $countryRepo;
        $this->countryFetcher = $countryFetcher;
    }

    /**
     * Return all countries
     *
     * @return Collections $countries
     */
    public function getCountries()
    {
        $countries = $this->countryRepo->getAll();

        return $countries;
    }

    /**
     * Fetch all countries from the API
     *
     * @return array $countries
     */
    public function fetchCountries()
    {
        $countries = $this->countryFetcher->getAll();

        return $countries;
    }
}
