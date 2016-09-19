<?php

namespace App\Models\Repositories;

use App\Models\Entities\Country;
use Illuminate\Database\Eloquent\Collection;

class UserRepository extends BaseRepository
{
    /**
     * This declaration is not necessary, it's used to
     * specify the type of object that is injected
     * into $model for the autocomplete to work
     *
     * @var Country
     */
    protected $model;

    // Methods for fetching App\Models\Entities\Country data from the DB
}