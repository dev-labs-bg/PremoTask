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
     * Test getting all users
     */
    public function testGetAll()
    {
        foreach (range(1,10) as $index)
        {
            DB::table('users')->insert([
                'name' => $this->faker->name,
                'email' => $this->faker->email,
                'password' => bcrypt('secret'),
                'created_at' => new \DateTime(),
                'updated_at' => new \DateTime()
            ]);
        }

        // Get the user from DB with the getById method
        $userFromDb = $this->userRepository->getAll();
        // Make sure the user the proper name and email
        $this->assertCount(10, $userFromDb);
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
        ]);

        $user->save();

        // Get the user from DB with the getById method
        $userFromDb = $this->userRepository->getById($user->id);
        // Make sure the user the proper name and email
        $this->assertEquals('test-name', $userFromDb->name);
        $this->assertEquals('test@example.com', $userFromDb->email);
    }

}