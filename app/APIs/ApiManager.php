<?php

/**
 * API Wrapper
 * A general parent class for
 * all APIs
 */

namespace App\APIs;

use GuzzleHttp\Client;

class ApiManager
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
    protected $apiUrl;

    public function __construct()
    {
        $this->client = new Client();
    }
}