# Parkleitsystem SDK utility: make_context
require_relative '../core/context'
module ParkleitsystemUtilities
  MakeContext = ->(ctxmap, basectx) {
    ParkleitsystemContext.new(ctxmap, basectx)
  }
end
