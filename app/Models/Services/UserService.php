<?php
namespace App\Models\Services;

use App\Models\Repositories\UserRepository;

class UserService
{
    /**
     * Declare the type of the $userRepo field
     * here, so your IDE's autocomplete kicks
     * in and shows available methods for it
     *
     * @var UserRepository
     */
    protected $userRepo;

    /**
     * The constructor will inject a UserRepository instance to our class
     * with IOC here. It can later be used to fetch all our repo data.
     * In the tests Mockery can overwrite this with the mock object
     *
     * @param UserRepository $userRepo
     */
    public function __construct(UserRepository $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    /**
     * Return all users
     *
     * @return Collections $users
     */
    public function getUsers()
    {
        $users = $this->userRepo->getAll();

        return $users;
    }

    /**
     * Return a user by id
     *
     * @param int $userId
     * @return User $user
     */
    public function getUserById($userId)
    {
        $user = $this->userRepo->getById($userId);

        return $user;
    }
}
