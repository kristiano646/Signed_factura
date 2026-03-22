import { ClassFieldDecorator, Constructor } from "./types";
export declare function getValidationRules(instance: any): Record<string, any>;
export declare function IsEnum(enumObj: Record<string | number, string | number>, message?: string): ClassFieldDecorator;
export declare function IsRequired(): ClassFieldDecorator;
export declare function IsOptional(): ClassFieldDecorator;
export declare function IsString(): ClassFieldDecorator;
export declare function IsNumber(): ClassFieldDecorator;
export declare function IsBoolean(): ClassFieldDecorator;
export declare function ValidateNested(type: () => Constructor<any>): ClassFieldDecorator;
export declare function IsArray(itemType: () => Constructor<any>): ClassFieldDecorator;
export declare function Length(options: {
    min?: number;
    max?: number;
    exact?: number;
    minMessage?: string;
    maxMessage?: string;
    exactMessage?: string;
}): ClassFieldDecorator;
export declare function IsNumericString(message?: string): ClassFieldDecorator;
export declare function IsDate(message?: string): ClassFieldDecorator;
export declare function MaxDigits(max: number, message?: string): ClassFieldDecorator;
export declare function Digits(options: {
    integer: number;
    fraction: number;
}, message?: string): ClassFieldDecorator;
