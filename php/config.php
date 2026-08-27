<?php
declare(strict_types=1);

// Parkleitsystem SDK configuration

class ParkleitsystemConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Parkleitsystem",
                "slug" => "parkleitsystem",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.parkendd.de",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "get_all_city" => [],
                    "get_city_parking_info" => [],
                ],
            ],
            "entity" => [
        'get_all_city' => [
          'fields' => [
            [
              'name' => 'coords',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'short' => 'City identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the city',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'get_all_city',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/',
                  'parts' => [],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_city_parking_info' => [
          'fields' => [
            [
              'name' => 'address',
              'short' => 'Street address of the parking garage',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'coords',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'free',
              'short' => 'Number of available parking spaces',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the parking lot',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lot_type',
              'short' => 'Type of parking lot',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the parking garage',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'state',
              'short' => 'Current state of the parking lot',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'total',
              'short' => 'Total number of parking spaces',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'get_city_parking_info',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'city',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{city}',
                  'parts' => [
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'city' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.lots`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ParkleitsystemFeatures::make_feature($name);
    }
}
