<?php 

return [

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    // config/auth.php

        'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
        'admin' => [  // Tambahkan ini
            'driver' => 'session',
            'provider' => 'admins',
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],
        'admins' => [  // Tambahkan ini
            'driver' => 'eloquent', 
            'model' => App\Models\Admin::class,
        ],
    ],


    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_resets',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,

];
