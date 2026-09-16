

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"coords","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"id","req":false,"short":"City identifier","type":"`$STRING`","index$":1},{"active":true,"name":"name","req":false,"short":"Name of the city","type":"`$STRING`","index$":2}],"id":{"field":"id","name":"id"},"name":"get_all_city","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /","json":"{\"operationId\":\"getAllCities\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[{\"coords\":{\"lat\":47.5584,\"lng\":7.5733},\"id\":\"Basel\",\"name\":\"Basel\"},{\"coords\":{\"lat\":47.3769,\"lng\":8.5417},\"id\":\"Zurich\",\"name\":\"Zürich\"}],\"schema\":{\"items\":{\"properties\":{\"coords\":{\"properties\":{\"lat\":{\"description\":\"Latitude coordinate\",\"format\":\"double\",\"type\":\"number\"},\"lng\":{\"description\":\"Longitude coordinate\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"id\":{\"description\":\"City identifier\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the city\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of cities\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/","segments":[],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_all_city","name__orig":"get_all_city","Name":"GetAllCity","name_":"get_all_city","name-":"get-all-city","NAME":"GET_ALL_CITY","index$":0}, {"active":true,"entity":"get_all_city","key$":"BasicGetAllCityFlow","kind":"basic","name":"BasicGetAllCityFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"get_all_city_ref01"}}],"index$":0}]}, 'GetAllCity')
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
  
