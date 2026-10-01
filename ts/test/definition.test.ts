import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "get_all_city",
    "accessor": "GetAllCity",
    "op": "list",
    "method": "GET",
    "path": "/",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "Basel",
        "name": "Basel",
        "coords": {
          "lat": 47.5584,
          "lng": 7.5733
        }
      },
      {
        "id": "Zurich",
        "name": "Zürich",
        "coords": {
          "lat": 47.3769,
          "lng": 8.5417
        }
      }
    ],
    "idField": "id"
  },
  {
    "entity": "get_city_parking_info",
    "accessor": "GetCityParkingInfo",
    "op": "list",
    "method": "GET",
    "path": "/{city}",
    "args": [
      {
        "name": "id",
        "wire": "city",
        "value": "p1"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "last_updated": "2023-10-15T14:30:00Z",
      "lots": [
        {
          "id": "zurich_citygarage",
          "name": "City Parking",
          "free": 145,
          "total": 500,
          "state": "open",
          "coords": {
            "lat": 47.3769,
            "lng": 8.5417
          },
          "address": "Beethovenstrasse 33",
          "lot_type": "Parkhaus"
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
