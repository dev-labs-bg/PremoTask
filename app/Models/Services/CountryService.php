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
     * @var CountryFetcher
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
     * Country creation handle
     *
     * @param $data - country data
     * @return Country $country
     */
    public function create($data)
    {
        $country = $this->countryRepo->createCountry($data);

        return $country;
    }

    /**
     * Fetch countries from REST Countries
     *
     * @param int $limit
     * @return array $contries
     */
    public function fetch($limit = 0)
    {
        $countries = $this->countryFetcher->getAll();

        if ($limit != 0)
        {
            shuffle($countries);
            $countries = array_slice($countries, 0, $limit);
        }

        return $countries;
    }
}
