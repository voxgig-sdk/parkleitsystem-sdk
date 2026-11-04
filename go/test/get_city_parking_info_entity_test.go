package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/parkleitsystem-sdk/go"
	"github.com/voxgig-sdk/parkleitsystem-sdk/go/core"

	vs "github.com/voxgig-sdk/parkleitsystem-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const get_city_parking_infoEntityLiveStrict = true


func TestGetCityParkingInfoEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetCityParkingInfo(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetCityParkingInfoEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.GetCityParkingInfo(nil).List(map[string]any{"city": 1}, nil)
		if sdkerr, ok := err.(*core.ParkleitsystemError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := get_city_parking_infoBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_city_parking_info." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _liveKey, _liveEx := range map[string]any{"city01": "Basel"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					setup.idmap[_liveKey] = _liveEx
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		getCityParkingInfoRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.get_city_parking_info")))
		var getCityParkingInfoRef01Data map[string]any
		if len(getCityParkingInfoRef01DataRaw) > 0 {
			getCityParkingInfoRef01Data = core.ToMapAny(getCityParkingInfoRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getCityParkingInfoRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		getCityParkingInfoRef01Ent := client.GetCityParkingInfo(nil)
		getCityParkingInfoRef01Match := map[string]any{
			"city": setup.idmap["city01"],
		}

		getCityParkingInfoRef01ListResult, err := getCityParkingInfoRef01Ent.List(getCityParkingInfoRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, getCityParkingInfoRef01ListOk := getCityParkingInfoRef01ListResult.([]any)
		if !getCityParkingInfoRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", getCityParkingInfoRef01ListResult)
		}

	})
}

func get_city_parking_infoBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_city_parking_info", "GetCityParkingInfoTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_city_parking_info test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_city_parking_info test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"get_city_parking_info01", "get_city_parking_info02", "get_city_parking_info03", "city01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("PARKLEITSYSTEM_TEST_GET_CITY_PARKING_INFO_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"PARKLEITSYSTEM_TEST_GET_CITY_PARKING_INFO_ENTID": idmap,
		"PARKLEITSYSTEM_TEST_LIVE":      "FALSE",
		"PARKLEITSYSTEM_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["PARKLEITSYSTEM_TEST_GET_CITY_PARKING_INFO_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["PARKLEITSYSTEM_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewParkleitsystemSDK(core.ToMapAny(mergedOpts))
	}

	live := env["PARKLEITSYSTEM_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["PARKLEITSYSTEM_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
