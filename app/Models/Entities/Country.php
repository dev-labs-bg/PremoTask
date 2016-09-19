<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    /**
     * Database table
     *
     * @var string
     */
    protected $table = 'countries';

    /**
     * Retrieve the users belonging to the model
     *
     * @relationship
     * @return Collection $users
     */
    public function users()
    {
        return $this->hasMany('User');
    }
}
