# Parkleitsystem SDK exists test

require "minitest/autorun"
require_relative "../Parkleitsystem_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ParkleitsystemSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
