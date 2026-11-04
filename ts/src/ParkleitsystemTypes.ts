// Typed models for the Parkleitsystem SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GetAllCity {
  api_version?: string
  cities?: Record<string, any>
  reference?: string
  server_version?: string
}

export interface GetAllCityLoadMatch {
  api_version?: string
  cities?: Record<string, any>
  reference?: string
  server_version?: string
}

export interface GetCityParkingInfo {
  address?: string
  coords?: Record<string, any>
  forecast?: boolean
  free?: number
  id?: string
  lot_type?: string
  name?: string
  region?: string
  state?: string
  total?: number
}

export interface GetCityParkingInfoListMatch {
  city: string
}

