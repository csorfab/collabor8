<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Lab::class, function(Faker\Generator $faker) {
    return [
        ents('id');
        'name' => $faker->
        'uni_name' => $faker->
        'location_name' => $faker->
        'location_x' => $faker->
        'location_y' => $faker->
        'tools_pc' => $faker->
        'tools_eeg' => $faker->
        'tools_eyetracking' => $faker->
        'tools_fmri' => $faker->
        amps();
    ]
})
