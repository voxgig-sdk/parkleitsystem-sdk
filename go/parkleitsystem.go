package voxgigparkleitsystemsdk

import (
	"github.com/voxgig-sdk/parkleitsystem-sdk/go/core"
	"github.com/voxgig-sdk/parkleitsystem-sdk/go/entity"
	"github.com/voxgig-sdk/parkleitsystem-sdk/go/feature"
	_ "github.com/voxgig-sdk/parkleitsystem-sdk/go/utility"
)

// Type aliases preserve external API.
type ParkleitsystemSDK = core.ParkleitsystemSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ParkleitsystemEntity = core.ParkleitsystemEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ParkleitsystemError = core.ParkleitsystemError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGetAllCityEntityFunc = func(client *core.ParkleitsystemSDK, entopts map[string]any) core.ParkleitsystemEntity {
		return entity.NewGetAllCityEntity(client, entopts)
	}
	core.NewGetCityParkingInfoEntityFunc = func(client *core.ParkleitsystemSDK, entopts map[string]any) core.ParkleitsystemEntity {
		return entity.NewGetCityParkingInfoEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewParkleitsystemSDK = core.NewParkleitsystemSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
