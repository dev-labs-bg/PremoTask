<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Entities\User;
use App\Models\Entities\Country;

class CountryServiceTest extends TestCase
{
    /**
     * @var \Mockery\Mock
     */
    private $mockCountryRepo;

    /**
     * @var \App\Models\Services\CountryService
     */
    private $countryService;

    /**
     * Set up mockery
     */
    public function setUp()
    {
        parent::setUp();

        // Setup a mock for the User Repo
        $this->mockCountryRepo = $this->mock('App\Models\Repositories\CountryRepository');

        // Get instance of the user service which we'll be testing
        $this->countryService = app(\App\Models\Services\CountryService::class);
    }

    /**
     * Test get countries
     */
    public function testGetCountries()
    {
        // Unguard models so we can populate guarded fields
        Model::unguard();

        // create fake countries
        $fakeCountriesCollection = new Collection([
            new Country([
                'id' => 1,
                'name' => 'Bulgaria',
            ]),
            new Country([
                'id' => 2,
                'name' => 'USA',
            ])
        ]);

        // reguard back
        Model::reguard();

        // mock data
        $this->mockCountryRepo
            ->shouldReceive('getAll')
            ->andReturn($fakeCountriesCollection);

        // get actual result
        $result = $this->countryService->getCountries();

        // check to array to strip unwanted model relationships
        $this->assertEquals($fakeCountriesCollection->toArray(), $result->toArray());
        $this->assertCount(2, $result);
    }
}
