-- Parkleitsystem SDK error

local ParkleitsystemError = {}
ParkleitsystemError.__index = ParkleitsystemError


function ParkleitsystemError.new(code, msg, ctx)
  local self = setmetatable({}, ParkleitsystemError)
  self.is_sdk_error = true
  self.sdk = "Parkleitsystem"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ParkleitsystemError:error()
  return self.msg
end


function ParkleitsystemError:__tostring()
  return self.msg
end


return ParkleitsystemError
