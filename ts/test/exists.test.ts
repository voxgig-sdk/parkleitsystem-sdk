
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ParkleitsystemSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ParkleitsystemSDK.test()
    equal(testsdk instanceof ParkleitsystemSDK, true,
      'ParkleitsystemSDK.test() must return a client synchronously')
  })

})
