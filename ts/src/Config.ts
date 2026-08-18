
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Parkleitsystem',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.parkendd.de",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      get_all_city: {
      },

      get_city_parking_info: {
      },

    }
  }


  entity = {
    "get_all_city": {
      "fields": [
        {
          "name": "coords",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        }
      ],
      "name": "get_all_city",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "parts": [],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "get_city_parking_info": {
      "fields": [
        {
          "name": "address",
          "type": "`$STRING`"
        },
        {
          "name": "coords",
          "type": "`$OBJECT`"
        },
        {
          "name": "free",
          "type": "`$INTEGER`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "lot_type",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "state",
          "type": "`$STRING`"
        },
        {
          "name": "total",
          "type": "`$INTEGER`"
        }
      ],
      "name": "get_city_parking_info",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "city",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{city}",
              "parts": [
                "{id}"
              ],
              "rename": {
                "param": {
                  "city": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.lots`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

