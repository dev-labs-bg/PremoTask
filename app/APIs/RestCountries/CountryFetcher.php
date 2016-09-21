<?php

namespace App\APIs\RestCountries;

use App\APIs\ApiManager;

class CountryFetcher extends ApiManager
{
    /**
     * Class construct
     * Call parent construct on each new class
     * extending the ApiManager
     */
    public function __construct()
    {
        parent::__construct();

        $this->apiUrl = "https://restcountries.eu/rest/v1";
    }

    /**
     * Fetch all countries
     *
     * @url /all
     * @return array $countries
     */
    public function getAll()
    {
        $result = $this->client->request('GET', $this->apiUrl . '/all');
        $countries = json_decode($result->getBody());

        return $countries;
    }
}