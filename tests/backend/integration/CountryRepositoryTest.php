<?php

use App\Models\Entities\Country;

class CountryRepositoryTest extends TestCase
{

	/**
     * @var \Faker\Generator;
     */
    private $faker;
    /**
     * @var \App\Models\Repositories\UserRepository
     */
    private $countryRepository;

    /**
     * Initial setup
     */
    public function setUp()
    {
        parent::setUp();

        // Get an instance of the UserRepository we'll be testing
        $this->countryRepository = app(\App\Models\Repositories\CountryRepository::class);

        // Migrate and make sure DB is ready to use in those tests
        $this->useDb();

        // Get a faker instance, just in case we need any fake data
        $this->faker = Faker\Factory::create();
    }

    /**
     * createCountry test
     * test to see if country creation is working properly
     *
     * @param array $data
     * @return 
     */
    public function testCreateCountry()
    {
        $data = [
            'name' => 'test-country'
        ];

        // save country normally
        $country = new Country();
        $country->name = $data['name'];
        $country->save();

        // save country through repository
        $repoCountry = $this->countryRepository->createCountry($data);

        // check results
        $this->assertEquals($country->name, $repoCountry->name);
    }

}