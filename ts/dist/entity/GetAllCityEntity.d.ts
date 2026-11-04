import { ParkleitsystemEntityBase } from '../ParkleitsystemEntityBase';
import type { ParkleitsystemSDK } from '../ParkleitsystemSDK';
import type { Control } from '../types';
import type { GetAllCity, GetAllCityLoadMatch } from '../ParkleitsystemTypes';
declare class GetAllCityEntity extends ParkleitsystemEntityBase<GetAllCity> {
    constructor(client: ParkleitsystemSDK, entopts: any);
    make(this: GetAllCityEntity): GetAllCityEntity;
    load(this: any, reqmatch?: GetAllCityLoadMatch, ctrl?: Control): Promise<GetAllCityEntity>;
}
export { GetAllCityEntity };
