// Typed models for the Parkleitsystem SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GetAllCity {
  coord?: Record<string, any>
  id?: string
  name?: string
}

export type GetAllCityListMatch = Partial<GetAllCity>

export interface GetCityParkingInfo {
  address?: string
  coord?: Record<string, any>
  free?: number
  id?: string
  lot_type?: string
  name?: string
  state?: string
  total?: number
}

export interface GetCityParkingInfoListMatch {
  id: string
}

