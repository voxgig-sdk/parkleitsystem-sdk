-- Typed models for the Parkleitsystem SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GetAllCity
---@field api_version? string
---@field cities? table
---@field reference? string
---@field server_version? string

---@class GetAllCityLoadMatch
---@field api_version? string
---@field cities? table
---@field reference? string
---@field server_version? string

---@class GetCityParkingInfo
---@field address? string
---@field coords? table
---@field forecast? boolean
---@field free? number
---@field id? string
---@field lot_type? string
---@field name? string
---@field region? string
---@field state? string
---@field total? number

---@class GetCityParkingInfoListMatch
---@field city string

local M = {}

return M
