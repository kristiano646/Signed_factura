import { SriAuthorizationMessage } from "../interfaces";
/**
 * Normalize the SRI `mensaje` property to always return an array.
 */
export declare function normalizeSriMessages(message: SriAuthorizationMessage | SriAuthorizationMessage[] | undefined): SriAuthorizationMessage[] | null;
