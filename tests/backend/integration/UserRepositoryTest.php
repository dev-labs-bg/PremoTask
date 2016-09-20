<?php

use App\Models\Entities\Country;

class UserRepositoryTest extends TestCase
{

	/**
     * @var \Faker\Generator;
     */
    private $faker;
    /**
     * @var \App\Models\Repositories\UserRepository
     */
    private $userRepository;

    /**
     * Initial setup
     */
    public function setUp()
    {
        parent::setUp();

        // Get an instance of the UserRepository we'll be testing
        $this->userRepository = app(\App\Models\Repositories\UserRepository::class);

        // Migrate and make sure DB is ready to use in those tests
        $this->useDb();

        // Get a faker instance, just in case we need any fake data
        $this->faker = Faker\Factory::create();
    }

    /**
     * Test getting user by id
     *
     * @param int $user_id
     */
    public function testGetById()
    {
        // Create and save a record to the DB
        $user = $this->userRepository->make([
            'name' => 'test-name',
            'email' => 'test@example.com',
            'password' => '123123',
            'country_id' => Country::first()->id,
        ]);

        $user->save();

        // Get the user from DB with the getById method
        $userFromDb = $this->userRepository->getById($user->id);
        // Make sure the user the proper name and email
        $this->assertEquals('test-name', $userFromDb->name);
        $this->assertEquals('test@example.com', $userFromDb->email);
    }

}