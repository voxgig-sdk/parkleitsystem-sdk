import { ParkleitsystemEntityBase } from '../ParkleitsystemEntityBase';
import type { ParkleitsystemSDK } from '../ParkleitsystemSDK';
import type { Control } from '../types';
import type { GetCityParkingInfo, GetCityParkingInfoListMatch } from '../ParkleitsystemTypes';
declare class GetCityParkingInfoEntity extends ParkleitsystemEntityBase<GetCityParkingInfo> {
    constructor(client: ParkleitsystemSDK, entopts: any);
    make(this: GetCityParkingInfoEntity): GetCityParkingInfoEntity;
    list(this: any, reqmatch?: GetCityParkingInfoListMatch, ctrl?: Control): Promise<GetCityParkingInfoEntity[]>;
}
export { GetCityParkingInfoEntity };
