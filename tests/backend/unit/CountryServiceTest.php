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
    }

    /**
     * Test create country handle
     */
    public function testCreate()
    {
        // country test data
        $data = [
            'name' => 'fake-country-name'
        ];

        // create fake user with fake name
        $fakeCountry = Mockery::mock(Country::class);
        $fakeCountry->shouldReceive('getAttribute')->with('name')->andReturn($data['name']);

        // mock data
        $this->mockCountryRepo
            ->shouldReceive('createCountry')
            ->with($data)
            ->andReturn($fakeCountry);

        // get actual result
        $result = $this->countryService->create($data);

        // check to array to strip unwanted model relationships
        $this->assertEquals($fakeCountry->name, $result->name);
    }

    /**
     * Test fetch limit
     */
    public function testFetch()
    {
        // get result
        $result = $this->countryService->fetch(12);

        // check if limit is working correctly
        $this->assertCount(12, $result);
    }
}
