export interface GetAllCity {
    api_version?: string;
    cities?: Record<string, any>;
    reference?: string;
    server_version?: string;
}
export interface GetAllCityLoadMatch {
    api_version?: string;
    cities?: Record<string, any>;
    reference?: string;
    server_version?: string;
}
export interface GetCityParkingInfo {
    address?: string;
    coords?: Record<string, any>;
    forecast?: boolean;
    free?: number;
    id?: string;
    lot_type?: string;
    name?: string;
    region?: string;
    state?: string;
    total?: number;
}
export interface GetCityParkingInfoListMatch {
    city: string;
}
