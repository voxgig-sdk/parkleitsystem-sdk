-- Typed models for the Parkleitsystem SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GetAllCity
---@field coord? table
---@field id? string
---@field name? string

---@class GetAllCityListMatch

---@class GetCityParkingInfo
---@field address? string
---@field coord? table
---@field free? number
---@field id? string
---@field lot_type? string
---@field name? string
---@field state? string
---@field total? number

---@class GetCityParkingInfoListMatch
---@field id string

local M = {}

return M
