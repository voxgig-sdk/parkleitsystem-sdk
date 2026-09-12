import { Context } from './Context';
declare class ParkleitsystemError extends Error {
    isParkleitsystemError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ParkleitsystemError };
