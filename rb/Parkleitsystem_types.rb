# frozen_string_literal: true

# Typed models for the Parkleitsystem SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetAllCity entity data model.
#
# @!attribute [rw] coord
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
GetAllCity = Struct.new(
  :coord,
  :id,
  :name,
  keyword_init: true
)

# Match filter for GetAllCity#list (any subset of GetAllCity fields).
#
# @!attribute [rw] coord
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
GetAllCityListMatch = Struct.new(
  :coord,
  :id,
  :name,
  keyword_init: true
)

# GetCityParkingInfo entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] coord
#   @return [Hash, nil]
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
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
GetCityParkingInfo = Struct.new(
  :address,
  :coord,
  :free,
  :id,
  :lot_type,
  :name,
  :state,
  :total,
  keyword_init: true
)

# Request payload for GetCityParkingInfo#list.
#
# @!attribute [rw] id
#   @return [String]
GetCityParkingInfoListMatch = Struct.new(
  :id,
  keyword_init: true
)

