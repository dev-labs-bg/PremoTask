<?php

namespace App\Models\Repositories;

use Illuminate\Database\Eloquent\Model;

Class BaseRepository
{
    /**
     * @var Model $model
     */
    protected $model;

    /**
     * Inject the eloquent model to the repository, that's the most
     * basic constructor if the repository  uses only 1 model. If
     * you need you can overwrite it and inject more models here
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * A basic method to get all records from this repository
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getAll()
    {
        return $this->model->all();
    }

    /**
     * A basic method to get a record by id
     *
     * @param $id
     * @return Model
     */
    public function getById($id)
    {
        return $this->model->find($id);
    }

    /**
     * Create an instance of the model, not yet saved
     *
     * @param $input
     * @return Model
     */
    public function make($input)
    {
        return new $this->model($input);
    }

    /**
     * A basic method to fill a model with the specified user input, not yet saved
     *
     * @param Model $model
     * @param array $input
     * @return Model
     */
    public function fill($model, $input)
    {
        $model->fill($input);

        return $model;
    }
}