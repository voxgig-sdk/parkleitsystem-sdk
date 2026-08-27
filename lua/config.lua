-- Parkleitsystem SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Parkleitsystem",
      slug = "parkleitsystem",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.parkendd.de",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["get_all_city"] = {},
        ["get_city_parking_info"] = {},
      },
    },
    entity = {
      ["get_all_city"] = {
        ["fields"] = {
          {
            ["name"] = "coords",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["short"] = "City identifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "Name of the city",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "get_all_city",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/",
                ["parts"] = {},
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["get_city_parking_info"] = {
        ["fields"] = {
          {
            ["name"] = "address",
            ["short"] = "Street address of the parking garage",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "coords",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "free",
            ["short"] = "Number of available parking spaces",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["short"] = "Unique identifier for the parking lot",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "lot_type",
            ["short"] = "Type of parking lot",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "Name of the parking garage",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "state",
            ["short"] = "Current state of the parking lot",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "total",
            ["short"] = "Total number of parking spaces",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "get_city_parking_info",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "city",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{city}",
                ["parts"] = {
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["city"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.lots`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
