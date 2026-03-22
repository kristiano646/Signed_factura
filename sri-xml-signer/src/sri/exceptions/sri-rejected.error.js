import { BaseSRIError } from "./base-sri.error";
export class SRIRejectedError extends BaseSRIError {
    constructor(params) {
        super(params);
    }
}
