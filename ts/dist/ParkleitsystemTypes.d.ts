export interface GetAllCity {
    coords?: Record<string, any>;
    id?: string;
    name?: string;
}
export interface GetAllCityListMatch {
    coords?: Record<string, any>;
    id?: string;
    name?: string;
}
export interface GetCityParkingInfo {
    address?: string;
    coords?: Record<string, any>;
    free?: number;
    id?: string;
    lot_type?: string;
    name?: string;
    state?: string;
    total?: number;
}
export interface GetCityParkingInfoListMatch {
    id: string;
}
