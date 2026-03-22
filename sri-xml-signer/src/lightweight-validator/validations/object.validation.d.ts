import { Constructor } from "../types";
export declare function isPlainObject(obj: any): boolean;
export declare function toDecorated<T>(ctor: Constructor<T>, raw: any): T;
export declare function validateObject(instance: any, path?: string): string[];
