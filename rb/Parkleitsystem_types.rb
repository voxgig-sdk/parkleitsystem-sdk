# frozen_string_literal: true

# Typed models for the Parkleitsystem SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetAllCity entity data model.
#
# @!attribute [rw] api_version
#   @return [String, nil]
#
# @!attribute [rw] cities
#   @return [Hash, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] server_version
#   @return [String, nil]
GetAllCity = Struct.new(
  :api_version,
  :cities,
  :reference,
  :server_version,
  keyword_init: true
)

# Request payload for GetAllCity#load.
#
# @!attribute [rw] api_version
#   @return [String, nil]
#
# @!attribute [rw] cities
#   @return [Hash, nil]
#
# @!attribute [rw] reference
#   @return [String, nil]
#
# @!attribute [rw] server_version
#   @return [String, nil]
GetAllCityLoadMatch = Struct.new(
  :api_version,
  :cities,
  :reference,
  :server_version,
  keyword_init: true
)

# GetCityParkingInfo entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] coords
#   @return [Hash, nil]
#
# @!attribute [rw] forecast
#   @return [Boolean, nil]
#
# @!attribute [rw] free
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lot_type
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
GetCityParkingInfo = Struct.new(
  :address,
  :coords,
  :forecast,
  :free,
  :id,
  :lot_type,
  :name,
  :region,
  :state,
  :total,
  keyword_init: true
)

# Request payload for GetCityParkingInfo#list.
#
# @!attribute [rw] city
#   @return [String]
GetCityParkingInfoListMatch = Struct.new(
  :city,
  keyword_init: true
)

