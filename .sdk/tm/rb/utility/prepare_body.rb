# Parkleitsystem SDK utility: prepare_body
require_relative 'media'
module ParkleitsystemUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return ParkleitsystemUtilities.raw_body(ctx.reqdata) if ParkleitsystemUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
