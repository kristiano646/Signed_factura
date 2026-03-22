/**
 * Normalize the SRI `mensaje` property to always return an array.
 */
export function normalizeSriMessages(message) {
    if (!message)
        return null;
    return Array.isArray(message) ? message : [message];
}
