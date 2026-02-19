<?php

return [

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    'guards' => [

        // USER WEB (Inertia / Blade)
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        // ADMIN WEB
        'admin' => [
            'driver' => 'session',
            'provider' => 'admins',
        ],

        // USER API (Sanctum)
        'sanctum' => [
            'driver' => 'sanctum',
            'provider' => 'users',
        ],
    ],

    'providers' => [

        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admin::class,
        ],
    ],
];