

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ParkleitsystemSDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ParkleitsystemSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GetCityParkingInfo().list({"city":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PARKLEITSYSTEM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_city_parking_info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":false,"t":"`$STRING`","key$":"address","index$":0},"coords":{"a":true,"h":"Coords","n":"coords","r":false,"t":"`$OBJECT`","key$":"coords","index$":1},"forecast":{"a":true,"h":"Forecast","n":"forecast","r":false,"t":"`$BOOLEAN`","key$":"forecast","index$":2},"free":{"a":true,"h":"Free","n":"free","r":false,"t":"`$INTEGER`","key$":"free","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":4},"lot_type":{"a":true,"h":"Lot Type","n":"lot_type","r":false,"t":"`$STRING`","key$":"lot_type","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":6},"region":{"a":true,"h":"Region","n":"region","r":false,"t":"`$STRING`","key$":"region","index$":7},"state":{"a":true,"h":"State","n":"state","r":false,"t":"`$STRING`","key$":"state","index$":8},"total":{"a":true,"h":"Total","n":"total","r":false,"t":"`$INTEGER`","key$":"total","index$":9}},"id":{"field":"id","name":"id"},"name":"get_city_parking_info","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /{city}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"Basel","k":"param","n":"city","or":"city","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{city}","q":{"exist":["city"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"var":"city"}],"t":{"req":"`reqdata`","res":"`body.lots`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_city_parking_info","name__orig":"get_city_parking_info","Name":"GetCityParkingInfo","name_":"get_city_parking_info","name-":"get-city-parking-info","NAME":"GET_CITY_PARKING_INFO","index$":1}, {"active":true,"entity":"get_city_parking_info","key$":"BasicGetCityParkingInfoFlow","kind":"basic","name":"BasicGetCityParkingInfoFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"city":"city01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"get_city_parking_info_ref01"}}],"index$":0}]}, 'GetCityParkingInfo', {"GET /{city}":{"protocol":"http","parameters":[{"name":"city","in":"path","required":true,"description":"Name of the city (Basel, Zurich, Bern, Luzern, St.Gallen, or Zug)","schema":{"type":"string","enum":["Basel","Zurich","Bern","Luzern","StGallen","Zug"]},"example":"Basel","index$":0}]}}, { strict: LIVE_STRICT, t })
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
