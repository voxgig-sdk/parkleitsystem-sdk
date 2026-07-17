-- Parkleitsystem SDK exists test

local sdk = require("parkleitsystem_sdk")

describe("ParkleitsystemSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
