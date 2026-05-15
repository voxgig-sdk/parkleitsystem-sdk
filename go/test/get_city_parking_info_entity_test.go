package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/parkleitsystem-sdk"
	"github.com/voxgig-sdk/parkleitsystem-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestGetCityParkingInfoEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetCityParkingInfo(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetCityParkingInfoEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
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
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set PARKLEITSYSTEM_TEST_GET_CITY_PARKING_INFO_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		getCityParkingInfoRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.get_city_parking_info", setup.data)))
		var getCityParkingInfoRef01Data map[string]any
		if len(getCityParkingInfoRef01DataRaw) > 0 {
			getCityParkingInfoRef01Data = core.ToMapAny(getCityParkingInfoRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getCityParkingInfoRef01Data

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
	idmap := vs.Transform(
		[]any{"get_city_parking_info01", "get_city_parking_info02", "get_city_parking_info03", "city01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("PARKLEITSYSTEM_TEST_GET_CITY_PARKING_INFO_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"PARKLEITSYSTEM_TEST_GET_CITY_PARKING_INFO_ENTID": idmap,
		"PARKLEITSYSTEM_TEST_LIVE":      "FALSE",
		"PARKLEITSYSTEM_TEST_EXPLAIN":   "FALSE",
		"PARKLEITSYSTEM_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["PARKLEITSYSTEM_TEST_GET_CITY_PARKING_INFO_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["PARKLEITSYSTEM_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["PARKLEITSYSTEM_APIKEY"],
			},
			extra,
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
