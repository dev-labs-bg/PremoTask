<?php
namespace App\Models\Services;

use App\Models\Repositories\CountryRepository;

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
     * The constructor will inject a CountryRepository instance to our class
     * with IOC here. It can later be used to fetch all our repo data.
     * In the tests Mockery can overwrite this with the mock object
     *
     * @param CountryRepository $countryRepo
     */
    public function __construct(CountryRepository $countryRepo)
    {
        $this->countryRepo = $countryRepo;
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
}
