package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGetAllCityEntityFunc func(client *ParkleitsystemSDK, entopts map[string]any) ParkleitsystemEntity

var NewGetCityParkingInfoEntityFunc func(client *ParkleitsystemSDK, entopts map[string]any) ParkleitsystemEntity

