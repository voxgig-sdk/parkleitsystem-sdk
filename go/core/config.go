package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Parkleitsystem",
			"slug": "parkleitsystem",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.parkendd.de",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"get_all_city": map[string]any{},
				"get_city_parking_info": map[string]any{},
			},
		},
		"entity": map[string]any{
			"get_all_city": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "coords",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"short": "City identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the city",
						"type": "`$STRING`",
					},
				},
				"name": "get_all_city",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/",
								"parts": []any{},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_city_parking_info": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"short": "Street address of the parking garage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "coords",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "free",
						"short": "Number of available parking spaces",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the parking lot",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lot_type",
						"short": "Type of parking lot",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the parking garage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"short": "Current state of the parking lot",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total",
						"short": "Total number of parking spaces",
						"type": "`$INTEGER`",
					},
				},
				"name": "get_city_parking_info",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "city",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{city}",
								"parts": []any{
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"city": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.lots`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
