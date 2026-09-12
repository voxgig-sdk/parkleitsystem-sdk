import { ParkleitsystemEntityBase } from '../ParkleitsystemEntityBase';
import type { ParkleitsystemSDK } from '../ParkleitsystemSDK';
import type { Control } from '../types';
import type { GetAllCity, GetAllCityListMatch } from '../ParkleitsystemTypes';
declare class GetAllCityEntity extends ParkleitsystemEntityBase<GetAllCity> {
    constructor(client: ParkleitsystemSDK, entopts: any);
    make(this: GetAllCityEntity): GetAllCityEntity;
    list(this: any, reqmatch?: GetAllCityListMatch, ctrl?: Control): Promise<GetAllCityEntity[]>;
}
export { GetAllCityEntity };
