# Parkleitsystem SDK configuration

module ParkleitsystemConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Parkleitsystem",
        "slug" => "parkleitsystem",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://api.parkendd.de",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "get_all_city" => {},
          "get_city_parking_info" => {},
        },
      },
      "entity" => {
        "get_all_city" => {
          "fields" => [
            {
              "name" => "coords",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "id",
              "short" => "City identifier",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Name of the city",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "get_all_city",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/",
                  "segments" => [],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_city_parking_info" => {
          "fields" => [
            {
              "name" => "address",
              "short" => "Street address of the parking garage",
              "type" => "`$STRING`",
            },
            {
              "name" => "coords",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "free",
              "short" => "Number of available parking spaces",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the parking lot",
              "type" => "`$STRING`",
            },
            {
              "name" => "lot_type",
              "short" => "Type of parking lot",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Name of the parking garage",
              "type" => "`$STRING`",
            },
            {
              "name" => "state",
              "short" => "Current state of the parking lot",
              "type" => "`$STRING`",
            },
            {
              "name" => "total",
              "short" => "Total number of parking spaces",
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "get_city_parking_info",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "city",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{city}",
                  "rename" => {
                    "param" => {
                      "city" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.lots`",
                  },
                  "parts" => [
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ParkleitsystemFeatures.make_feature(name)
  end
end
