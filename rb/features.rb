# Parkleitsystem SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ParkleitsystemFeatures
  def self.make_feature(name)
    case name
    when "base"
      ParkleitsystemBaseFeature.new
    when "test"
      ParkleitsystemTestFeature.new
    else
      ParkleitsystemBaseFeature.new
    end
  end
end
