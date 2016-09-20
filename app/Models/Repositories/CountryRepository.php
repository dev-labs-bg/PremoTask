<?php

namespace App\Models\Repositories;

use App\Models\Entities\Country;
use Illuminate\Database\Eloquent\Collection;

class CountryRepository extends BaseRepository
{
    /**
     * This declaration is not necessary, it's used to
     * specify the type of object that is injected
     * into $model for the autocomplete to work
     *
     * @var Country
     */
    protected $model;

    /**
     * Create a country in db
     *
     * @param $data - country data
     * @return Country $country
     */
    public function createCountry($data)
    {
        $country = new $this->model;

        $country = $this->fill($country, $data);
        $country->save();

        return $country;
    }
}