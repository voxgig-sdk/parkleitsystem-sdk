

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":false,"sh":"Street address of the parking garage","t":"`$STRING`","key$":"address","index$":0},"coords":{"a":true,"h":"Coords","n":"coords","r":false,"t":"`$OBJECT`","key$":"coords","index$":1},"free":{"a":true,"h":"Free","n":"free","r":false,"sh":"Number of available parking spaces","t":"`$INTEGER`","key$":"free","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the parking lot","t":"`$STRING`","key$":"id","index$":3},"lot_type":{"a":true,"h":"Lot Type","n":"lot_type","r":false,"sh":"Type of parking lot","t":"`$STRING`","key$":"lot_type","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the parking garage","t":"`$STRING`","key$":"name","index$":5},"state":{"a":true,"h":"State","n":"state","r":false,"sh":"Current state of the parking lot","t":"`$STRING`","key$":"state","index$":6},"total":{"a":true,"h":"Total","n":"total","r":false,"sh":"Total number of parking spaces","t":"`$INTEGER`","key$":"total","index$":7}},"id":{"field":"id","name":"id"},"name":"get_city_parking_info","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /{city}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"city","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{city}","q":{"exist":["id"]},"r":{"param":{"city":"id"}},"s":[{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.lots`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_city_parking_info","name__orig":"get_city_parking_info","Name":"GetCityParkingInfo","name_":"get_city_parking_info","name-":"get-city-parking-info","NAME":"GET_CITY_PARKING_INFO","index$":1}, {"active":true,"entity":"get_city_parking_info","key$":"BasicGetCityParkingInfoFlow","kind":"basic","name":"BasicGetCityParkingInfoFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"city":"city01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"get_city_parking_info_ref01"}}],"index$":0}]}, 'GetCityParkingInfo', {"GET /{city}":{"protocol":"http","operationId":"getCityParkingInfo","responses":{"200":{"description":"Successful response with parking information","content":{"application/json":{"schema":{"type":"object","properties":{"last_updated":{"description":"Timestamp of last data update","format":"date-time","key$":"last_updated","type":"string"},"lots":{"items":{"properties":{"address":{"description":"Street address of the parking garage","type":"string","key$":"address"},"coords":{"properties":{"lat":{"description":"Latitude coordinate","format":"double","type":"number"},"lng":{"description":"Longitude coordinate","format":"double","type":"number"}},"type":"object","key$":"coords"},"free":{"description":"Number of available parking spaces","type":"integer","key$":"free"},"id":{"description":"Unique identifier for the parking lot","type":"string","key$":"id"},"lot_type":{"description":"Type of parking lot","enum":["Parkhaus","Tiefgarage","Parkplatz"],"type":"string","key$":"lot_type"},"name":{"description":"Name of the parking garage","type":"string","key$":"name"},"state":{"description":"Current state of the parking lot","enum":["open","closed","unknown"],"type":"string","key$":"state"},"total":{"description":"Total number of parking spaces","type":"integer","key$":"total"}},"type":"object","index$":0},"key$":"lots","type":"array"}}},"example":{"last_updated":"2023-10-15T14:30:00Z","lots":[{"id":"zurich_citygarage","name":"City Parking","free":145,"total":500,"state":"open","coords":{"lat":47.3769,"lng":8.5417},"address":"Beethovenstrasse 33","lot_type":"Parkhaus"}]}}}},"404":{"description":"City not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}},"example":{"error":"City not found"}}}}},"parameters":[{"name":"city","in":"path","required":true,"description":"Name of the city (Basel, Zurich, Bern, Luzern, St.Gallen, or Zug)","schema":{"type":"string","enum":["Basel","Zurich","Bern","Luzern","StGallen","Zug"]},"index$":0}],"securitySource":"unspecified"}})
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
    ['get_city_parking_info01','get_city_parking_info02','get_city_parking_info03','city01'],
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
  
