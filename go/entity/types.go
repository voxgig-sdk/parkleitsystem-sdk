// Typed models for the Parkleitsystem SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// GetAllCity is the typed data model for the get_all_city entity.
type GetAllCity struct {
	Coord *map[string]any `json:"coord,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// GetAllCityListMatch mirrors the get_all_city fields as an all-optional match
// filter (Go analog of Partial<GetAllCity>).
type GetAllCityListMatch struct {
	Coord *map[string]any `json:"coord,omitempty"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// GetCityParkingInfo is the typed data model for the get_city_parking_info entity.
type GetCityParkingInfo struct {
	Address *string `json:"address,omitempty"`
	Coord *map[string]any `json:"coord,omitempty"`
	Free *int `json:"free,omitempty"`
	Id *string `json:"id,omitempty"`
	LotType *string `json:"lot_type,omitempty"`
	Name *string `json:"name,omitempty"`
	State *string `json:"state,omitempty"`
	Total *int `json:"total,omitempty"`
}

// GetCityParkingInfoListMatch is the typed request payload for GetCityParkingInfo.ListTyped.
type GetCityParkingInfoListMatch struct {
	Id string `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
