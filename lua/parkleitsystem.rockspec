package = "voxgig-sdk-parkleitsystem"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/parkleitsystem-sdk.git"
}
description = {
  summary = "Parkleitsystem SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["parkleitsystem_sdk"] = "parkleitsystem_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
