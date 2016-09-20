<?php

namespace App\APIs\RestCountries;

use GuzzleHttp\Client;

class CountryFetcher
{
    /**
     * Http service
     *
     * @var object
     */
    protected $client;

    /**
     * Api main url
     *
     * @var string
     */
    protected $api_url;

    public function __construct()
    {
        $this->client = new Client();
        $this->api_url = "https://restcountries.eu/rest/v1";
    }

    /**
     * Fetch all countries
     *
     * @url /all
     * @return array $countries
     */
    public function getAll()
    {
        $result = $this->client->request('GET', $this->api_url . '/all');
        $countries = json_decode($result->getBody());

        return $countries;
    }
}