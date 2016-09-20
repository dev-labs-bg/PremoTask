<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Services\UserService;
use App\Models\Services\CountryService;

class ApiController extends BaseController
{
    /**
     * Api Controller
     * This controller handles all api requests
     */
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * Get all users
     *
     * @return json $users
     */
    public function getUsers(UserService $userService)
    {
        $users = $userService->getUsers();

        return \Response::json([
            'success' => true,
            'data' => $users,
        ]);
    }

    /**
     * Get a single user
     *
     * @param int $user_id
     * @return json $users
     */
    public function getUser($user_id, UserService $userService)
    {
        $user_id = (int) $user_id;
        $user = $userService->getUserById($user_id);

        if (empty($user))
            return \Response::json([
                'success' => false,
                'error' => 'User doesn\'t exist',
            ]);

        return \Response::json([
            'success' => true,
            'data' => $user,
        ]);
    }

    /**
     * Get all countries
     *
     * @return json $countries
     */
    public function getCountries(CountryService $countryService)
    {
        $countries = $countryService->getCountries();

        return \Response::json([
            'success' => true,
            'data' => $countries,
        ]);
    }
}
