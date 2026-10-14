import { Strategy } from 'passport-jwt';
interface JwtPayload {
    sub: number;
    email: string;
    tipo_usuario: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        id_usuario: number;
        email: string;
        tipo_usuario: string;
    }>;
}
export {};
