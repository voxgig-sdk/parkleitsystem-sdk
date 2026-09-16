# Parkleitsystem SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ParkleitsystemFeatures
  def self.make_feature(name)
    case name
    when "base"
      ParkleitsystemBaseFeature.new
    when "ratelimit"
      ParkleitsystemRatelimitFeature.new
    when "retry"
      ParkleitsystemRetryFeature.new
    when "test"
      ParkleitsystemTestFeature.new
    when "timeout"
      ParkleitsystemTimeoutFeature.new
    else
      ParkleitsystemBaseFeature.new
    end
  end
end
