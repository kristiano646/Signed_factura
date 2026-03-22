export function getValidationRules(instance) {
    // Collect rules from prototype chain
    const rules = {};
    let current = instance;
    while (current && current !== Object.prototype) {
        if (current.__validationRules) {
            Object.assign(rules, current.__validationRules);
        }
        current = Object.getPrototypeOf(current);
    }
    return rules;
}
export function IsEnum(enumObj, message) {
    return function (target, context) {
        context.addInitializer(function () {
            if (!this.__validationRules)
                this.__validationRules = {};
            this.__validationRules[context.name] = {
                ...(this.__validationRules[context.name] || {}),
                type: "enum",
                enum: enumObj,
                message,
            };
        });
    };
}
export function IsRequired() {
    return (_, context) => {
        context.addInitializer(function () {
            this.__validationRules = this.__validationRules || {};
            this.__validationRules[context.name] = {
                ...(this.__validationRules[context.name] || {}),
                required: true,
            };
        });
    };
}
export function IsOptional() {
    return function (target, context) {
        context.addInitializer(function () {
            if (!this.__validationRules)
                this.__validationRules = {};
            this.__validationRules[context.name] = {
                ...(this.__validationRules[context.name] || {}),
                required: false,
            };
        });
    };
}
export function IsString() {
    return function (target, context) {
        context.addInitializer(function () {
            if (!this.__validationRules)
                this.__validationRules = {};
            this.__validationRules[context.name] = {
                ...(this.__validationRules[context.name] || {}),
                type: "string",
            };
        });
    };
}
export function IsNumber() {
    return function (target, context) {
        context.addInitializer(function () {
            if (!this.__validationRules)
                this.__validationRules = {};
            this.__validationRules[context.name] = {
                ...(this.__validationRules[context.name] || {}),
                type: "number",
            };
        });
    };
}
export function IsBoolean() {
    return function (target, context) {
        context.addInitializer(function () {
            if (!this.__validationRules)
                this.__validationRules = {};
            this.__validationRules[context.name] = {
                ...(this.__validationRules[context.name] || {}),
                type: "boolean",
            };
        });
    };
}
export function ValidateNested(type) {
    return (_, context) => {
        if (context.kind !== "field") {
            throw new Error(`ValidateNested solo puede usarse en propiedades`);
        }
        context.addInitializer(function () {
            this.__validationRules = this.__validationRules || {};
            this.__validationRules[context.name] = {
                ...(this.__validationRules[context.name] || {}),
                type: "object",
                nestedType: type,
            };
        });
    };
}
export function IsArray(itemType) {
    return (_, context) => {
        if (context.kind !== "field") {
            throw new Error(`IsArray solo puede usarse en propiedades`);
        }
        context.addInitializer(function () {
            this.__validationRules = this.__validationRules || {};
            this.__validationRules[context.name] = {
                ...(this.__validationRules[context.name] || {}),
                type: "array",
                arrayItemType: itemType,
            };
        });
    };
}
export function Length(options) {
    return function (target, context) {
        context.addInitializer(function () {
            if (!this.__validationRules)
                this.__validationRules = {};
            const rule = this.__validationRules[context.name] || {};
            // 💡 Forzar tipo string si aún no ha sido definido
            if (!rule.type) {
                rule.type = "string";
            }
            if (rule.type !== "string") {
                throw new Error(`@Length solo puede usarse en propiedades de tipo string`);
            }
            this.__validationRules[context.name] = {
                ...rule,
                minLength: options.min,
                maxLength: options.max,
                exactLength: options.exact,
                minLengthMessage: options.minMessage,
                maxLengthMessage: options.maxMessage,
                exactLengthMessage: options.exactMessage,
            };
        });
    };
}
// decorators.ts
export function IsNumericString(message) {
    return function (_, context) {
        context.addInitializer(function () {
            this.__validationRules = this.__validationRules || {};
            this.__validationRules[context.name] = {
                ...(this.__validationRules[context.name] || {}),
                type: "string", // sigue siendo string
                numericOnly: true,
                message,
            };
        });
    };
}
// decorators.ts
export function IsDate(message) {
    return (_, context) => {
        context.addInitializer(function () {
            this.__validationRules = this.__validationRules || {};
            this.__validationRules[context.name] = {
                ...(this.__validationRules[context.name] || {}),
                type: "date",
                message,
            };
        });
    };
}
export function MaxDigits(max, message) {
    return (_, context) => {
        context.addInitializer(function () {
            this.__validationRules = this.__validationRules || {};
            this.__validationRules[context.name] = {
                ...(this.__validationRules[context.name] || {}),
                type: "number",
                maxDigits: max,
                maxDigitsMessage: message,
            };
        });
    };
}
// decorators.ts
export function Digits(options, message) {
    return (_, context) => {
        context.addInitializer(function () {
            this.__validationRules = this.__validationRules || {};
            this.__validationRules[context.name] = {
                ...(this.__validationRules[context.name] || {}),
                type: "number",
                digits: options,
                digitsMessage: message,
            };
        });
    };
}
