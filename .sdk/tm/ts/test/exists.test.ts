
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ParkleitsystemSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ParkleitsystemSDK.test()
    equal(null !== testsdk, true)
  })

})
