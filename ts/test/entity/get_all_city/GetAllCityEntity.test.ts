

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


describe('GetAllCityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PARKLEITSYSTEM_TEST_LIVE=TRUE.
  afterEach(liveDelay('PARKLEITSYSTEM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ParkleitsystemSDK.test()
    const ent = testsdk.GetAllCity()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PARKLEITSYSTEM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_all_city.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"coords":{"a":true,"h":"Coords","n":"coords","r":false,"t":"`$OBJECT`","key$":"coords","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"City identifier","t":"`$STRING`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the city","t":"`$STRING`","key$":"name","index$":2}},"id":{"field":"id","name":"id"},"name":"get_all_city","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/","q":{},"r":{},"s":[],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_all_city","name__orig":"get_all_city","Name":"GetAllCity","name_":"get_all_city","name-":"get-all-city","NAME":"GET_ALL_CITY","index$":0}, {"active":true,"entity":"get_all_city","key$":"BasicGetAllCityFlow","kind":"basic","name":"BasicGetAllCityFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"get_all_city_ref01"}}],"index$":0}]}, 'GetAllCity', {"GET /":{"protocol":"http","operationId":"getAllCities","responses":{"200":{"description":"Successful response with list of cities","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"City identifier","key$":"id"},"name":{"type":"string","description":"Name of the city","key$":"name"},"coords":{"type":"object","properties":{"lat":{"type":"number","format":"double","description":"Latitude coordinate"},"lng":{"type":"number","format":"double","description":"Longitude coordinate"}},"key$":"coords"}},"index$":0}},"example":[{"id":"Basel","name":"Basel","coords":{"lat":47.5584,"lng":7.5733}},{"id":"Zurich","name":"Zürich","coords":{"lat":47.3769,"lng":8.5417}}]}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_all_city_ref01_data = Object.values(setup.data.existing.get_all_city)[0] as any

    // LIST
    const get_all_city_ref01_ent = client.GetAllCity()
    const get_all_city_ref01_match: any = {}

    const get_all_city_ref01_list = (await get_all_city_ref01_ent.list(get_all_city_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_all_city/GetAllCityTestData.json')

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
    ['get_all_city01','get_all_city02','get_all_city03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PARKLEITSYSTEM_TEST_GET_ALL_CITY_ENTID': idmap,
    'PARKLEITSYSTEM_TEST_LIVE': 'FALSE',
    'PARKLEITSYSTEM_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['PARKLEITSYSTEM_TEST_GET_ALL_CITY_ENTID']

  const live = 'TRUE' === env.PARKLEITSYSTEM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PARKLEITSYSTEM_TEST_GET_ALL_CITY_ENTID']
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
  
