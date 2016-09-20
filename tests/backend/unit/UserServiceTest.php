<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Entities\User;
use App\Models\Entities\Country;

class UserServiceTest extends TestCase
{
    /**
     * @var \Mockery\Mock
     */
    private $mockUserRepo;

    /**
     * @var \App\Models\Services\UserService
     */
    private $userService;

    /**
     * Set up mockery
     */
    public function setUp()
    {
        parent::setUp();

        // Setup a mock for the User Repo
        $this->mockUserRepo = $this->mock('App\Models\Repositories\UserRepository');

        // Get instance of the user service which we'll be testing
        $this->userService = app(\App\Models\Services\UserService::class);
    }

    /**
     * Test get users
     */
    public function testGetUsers()
    {
        // Unguard models so we can populate guarded fields (id)
        Model::unguard();

        // Create fake user collection
        $fakeUsersCollection = new Collection([
            new User([
                'id' => 123,
                'name' => 'Test User',
                'email' => 'test@gmail.com',
                'password' => bcrypt('secret')
            ])
        ]);

        // Reguard again
        Model::reguard();

        // Mock user repo
        $this->mockUserRepo
            ->shouldReceive('getAll')
            ->andReturn($fakeUsersCollection);

        // Get actual result from service
        $result = $this->userService->getUsers();

        // Test outcome
        $this->assertEquals('Test User', $result[0]->name);
        $this->assertEquals('test@gmail.com', $result[0]->email);
        $this->assertCount(1, $result);
    }

    /**
     * Test getting an user
     *
     * @param $user_id
     */
    public function testGetUserById()
    {
        // define user_id for test
        $user_id = 12;

        // create fake user with fake name
        $fakeUser = Mockery::mock(User::class);
        $fakeUser->shouldReceive('getAttribute')->with('name')->andReturn('fake-name');

        // Mock user repo
        $this->mockUserRepo
            ->shouldReceive('getById')
            ->with($user_id)
            ->andReturn($fakeUser);

        // call service
        $result = $this->userService->getUserById($user_id);

        // check result
        $this->assertEquals('fake-name', $result->name);
    }
}
