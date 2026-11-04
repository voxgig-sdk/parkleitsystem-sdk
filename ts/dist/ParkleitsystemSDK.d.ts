import { GetAllCityEntity } from './entity/GetAllCityEntity';
import { GetCityParkingInfoEntity } from './entity/GetCityParkingInfoEntity';
export type * from './ParkleitsystemTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ParkleitsystemEntityBase } from './ParkleitsystemEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class ParkleitsystemSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    GetAllCity(entopts?: Record<string, any>): GetAllCityEntity;
    GetCityParkingInfo(entopts?: Record<string, any>): GetCityParkingInfoEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ParkleitsystemSDK;
    tester(testopts?: any, sdkopts?: any): ParkleitsystemSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ParkleitsystemSDK;
export { stdutil, config, BaseFeature, ParkleitsystemEntityBase, ParkleitsystemSDK, SDK, };
export type { DirectResult };
