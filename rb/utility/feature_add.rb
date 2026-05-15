# Parkleitsystem SDK utility: feature_add
module ParkleitsystemUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
