# Parkleitsystem SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Parkleitsystem",
            "slug": "parkleitsystem",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.parkendd.de",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "get_all_city": {},
                "get_city_parking_info": {},
            },
        },
        "entity": {
      "get_all_city": {
        "fields": [
          {
            "name": "api_version",
            "title": "Api Version",
            "type": "`$STRING`",
          },
          {
            "name": "cities",
            "title": "Cities",
            "type": "`$OBJECT`",
            "short": "Supported cities keyed by the city id used in /{city}",
          },
          {
            "name": "reference",
            "title": "Reference",
            "type": "`$STRING`",
          },
          {
            "name": "server_version",
            "title": "Server Version",
            "type": "`$STRING`",
          },
        ],
        "name": "get_all_city",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/",
                "segments": [],
                "parts": [],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_city_parking_info": {
        "fields": [
          {
            "name": "address",
            "title": "Address",
            "type": "`$STRING`",
          },
          {
            "name": "coords",
            "title": "Coords",
            "type": "`$OBJECT`",
          },
          {
            "name": "forecast",
            "title": "Forecast",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "free",
            "title": "Free",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "lot_type",
            "title": "Lot Type",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "region",
            "title": "Region",
            "type": "`$STRING`",
          },
          {
            "name": "state",
            "title": "State",
            "type": "`$STRING`",
          },
          {
            "name": "total",
            "title": "Total",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "get_city_parking_info",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/{city}",
                "segments": [
                  {
                    "var": "city",
                  },
                ],
                "parts": [
                  "{city}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.lots`",
                },
                "args": {
                  "params": [
                    {
                      "name": "city",
                      "orig": "city",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "Basel",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "city",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
