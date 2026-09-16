

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ParkleitsystemSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetCityParkingInfoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PARKLEITSYSTEM_TEST_LIVE=TRUE.
  afterEach(liveDelay('PARKLEITSYSTEM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ParkleitsystemSDK.test()
    const ent = testsdk.GetCityParkingInfo()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PARKLEITSYSTEM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_city_parking_info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"address","req":false,"short":"Street address of the parking garage","type":"`$STRING`","index$":0},{"active":true,"name":"coords","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"free","req":false,"short":"Number of available parking spaces","type":"`$INTEGER`","index$":2},{"active":true,"name":"id","req":false,"short":"Unique identifier for the parking lot","type":"`$STRING`","index$":3},{"active":true,"name":"lot_type","req":false,"short":"Type of parking lot","type":"`$STRING`","index$":4},{"active":true,"name":"name","req":false,"short":"Name of the parking garage","type":"`$STRING`","index$":5},{"active":true,"name":"state","req":false,"short":"Current state of the parking lot","type":"`$STRING`","index$":6},{"active":true,"name":"total","req":false,"short":"Total number of parking spaces","type":"`$INTEGER`","index$":7}],"id":{"field":"id","name":"id"},"name":"get_city_parking_info","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"city","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /{city}","json":"{\"operationId\":\"getCityParkingInfo\",\"parameters\":[{\"description\":\"Name of the city (Basel, Zurich, Bern, Luzern, St.Gallen, or Zug)\",\"in\":\"path\",\"name\":\"city\",\"required\":true,\"schema\":{\"enum\":[\"Basel\",\"Zurich\",\"Bern\",\"Luzern\",\"StGallen\",\"Zug\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"last_updated\":\"2023-10-15T14:30:00Z\",\"lots\":[{\"address\":\"Beethovenstrasse 33\",\"coords\":{\"lat\":47.3769,\"lng\":8.5417},\"free\":145,\"id\":\"zurich_citygarage\",\"lot_type\":\"Parkhaus\",\"name\":\"City Parking\",\"state\":\"open\",\"total\":500}]},\"schema\":{\"properties\":{\"last_updated\":{\"description\":\"Timestamp of last data update\",\"format\":\"date-time\",\"type\":\"string\"},\"lots\":{\"items\":{\"properties\":{\"address\":{\"description\":\"Street address of the parking garage\",\"type\":\"string\"},\"coords\":{\"properties\":{\"lat\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"lng\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"free\":{\"description\":\"Number of available parking spaces\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique identifier for the parking lot\",\"type\":\"string\"},\"lot_type\":{\"description\":\"Type of parking lot\",\"enum\":[\"Parkhaus\",\"Tiefgarage\",\"Parkplatz\"],\"type\":\"string\"},\"name\":{\"description\":\"Name of the parking garage\",\"type\":\"string\"},\"state\":{\"description\":\"Current state of the parking lot\",\"enum\":[\"open\",\"closed\",\"unknown\"],\"type\":\"string\"},\"total\":{\"description\":\"Total number of parking spaces\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with parking information\"},\"404\":{\"content\":{\"application/json\":{\"example\":{\"error\":\"City not found\"},\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"City not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{city}","rename":{"param":{"city":"id"}},"segments":[{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.lots`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_city_parking_info","name__orig":"get_city_parking_info","Name":"GetCityParkingInfo","name_":"get_city_parking_info","name-":"get-city-parking-info","NAME":"GET_CITY_PARKING_INFO","index$":1}, {"active":true,"entity":"get_city_parking_info","key$":"BasicGetCityParkingInfoFlow","kind":"basic","name":"BasicGetCityParkingInfoFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"city":"city01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"get_city_parking_info_ref01"}}],"index$":0}]}, 'GetCityParkingInfo')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_city_parking_info_ref01_data = Object.values(setup.data.existing.get_city_parking_info)[0] as any

    // LIST
    const get_city_parking_info_ref01_ent = client.GetCityParkingInfo()
    const get_city_parking_info_ref01_match: any = {}
    get_city_parking_info_ref01_match['city'] = setup.idmap['city01']

    const get_city_parking_info_ref01_list = (await get_city_parking_info_ref01_ent.list(get_city_parking_info_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_city_parking_info/GetCityParkingInfoTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ParkleitsystemSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_city_parking_info01','get_city_parking_info02','get_city_parking_info03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PARKLEITSYSTEM_TEST_GET_CITY_PARKING_INFO_ENTID': idmap,
    'PARKLEITSYSTEM_TEST_LIVE': 'FALSE',
    'PARKLEITSYSTEM_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PARKLEITSYSTEM_TEST_GET_CITY_PARKING_INFO_ENTID']

  const live = 'TRUE' === env.PARKLEITSYSTEM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PARKLEITSYSTEM_TEST_GET_CITY_PARKING_INFO_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ParkleitsystemSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.PARKLEITSYSTEM_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
