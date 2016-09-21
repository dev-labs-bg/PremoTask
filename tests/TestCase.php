<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Artisan;

class TestCase extends Illuminate\Foundation\Testing\TestCase
{
    /**
     * The headers required for a request to be considered AJAX
     *
     * @var array
     */
    protected $serverAjax = ['HTTP_X-Requested-With' => 'XMLHttpRequest'];

    /**
     * @var App\Models\Entities\User Populated after $this->isLoggedIn() or $this->isLoggedInDB() is called
     */
    protected $fakeLoggedInUser;

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        return $app;
    }

    /**
     * Creates a mock instance of the class with
     * Mockery and binds it to Laravel's IoC
     *
     * @source http://culttt.com/2013/07/22/getting-started-with-mockery/ read more about mocks here
     * @param $class
     * @return \Mockery\MockInterface
     */
    public function mock($class)
    {
        $mock = Mockery::mock($class);

        $this->app->instance($class, $mock);

        return $mock;
    }

    public function tearDown()
    {
        Mockery::close();
    }

    /**
     * Make sure a logged in user exists and auth returns it
     * $this->fakeLoggedInUser will have the logged user
     */
    protected function isLoggedIn()
    {
        Model::unguard(); // Unguard the models so we can fill the id field
        $this->fakeLoggedInUser = new App\Models\Entities\User([
            'id' => 1234,
            'name' => 'John Smith',
            'email' => 'john@smith.fake'
        ]);
        // Populate any additional fields/methods you want your fake user to have

        $this->be($this->fakeLoggedInUser);
        Model::reguard();
    }

    /**
     * Make sure a logged in user exists and Auth returns it
     * $this->fakeLoggedInUser will have the logged user,
     * the user will actually be seeded to the database
     */
    protected function isLoggedInDB()
    {
        Artisan::call('db:seed', ['--class' => 'LoggedUserSeeder']);

        $this->fakeLoggedInUser = \App\Models\Entities\User::findOrNew(1);
        $this->be($this->fakeLoggedInUser);
    }

    /**
     * Makes an ajax request to the server (send the ajax header along with the request)
     *
     * @param $method
     * @param $uri
     * @param array $parameters
     * @param array $cookies
     * @param array $files
     * @param array $server
     * @param null $content
     * @return \Illuminate\Http\Response
     */
    protected function callAjax($method, $uri, $parameters = [], $cookies = [], $files = [], $server = [], $content = null)
    {
        return $this->call($method, $uri, $parameters, $cookies, $files, array_merge($server, $this->serverAjax), $content);
    }

    /**
     * Decode a JSON response from a
     * response object into an array
     *
     * @param Response $response
     * @return mixed
     */
    protected function jsonResponse($response)
    {
        return json_decode($response->content(), true);
    }

    /**
     * Checks if the array has the given element
     * This was for some reason not supported by phpunit
     *
     * @param $needle
     * @param $haystack
     * @param string $message
     * @source veselin@devlabs.bg - it's not a default check, contact me if you have any issues
     */
    public function assertArrayHas($needle, $haystack, $message = 'Array does not contain the required element')
    {
        $arrayHas = false;
        foreach ($haystack as $element) {
            if($element == $needle) {
                $arrayHas = true;
                break;
            }
        }

        $this->assertTrue($arrayHas, $message);
    }

    /**
     * Since we're using sqlite memory,
     * everytime we start tests, we'll
     * need to create our db instance first
     */
    public function useDb()
    {
        // Use DB
        Artisan::call('migrate');
    }
}
