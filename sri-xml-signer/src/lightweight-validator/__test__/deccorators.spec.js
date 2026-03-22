var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { getValidationRules, IsEnum, IsRequired, IsOptional, IsString, IsNumber, IsBoolean, ValidateNested, IsArray, Length, IsNumericString, IsDate, MaxDigits, Digits, } from "../decorators";
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["USER"] = "user";
})(Role || (Role = {}));
let Address = (() => {
    var _a;
    let _street_decorators;
    let _street_initializers = [];
    let _street_extraInitializers = [];
    let _number_decorators;
    let _number_initializers = [];
    let _number_extraInitializers = [];
    return _a = class Address {
            constructor() {
                this.street = __runInitializers(this, _street_initializers, "");
                this.number = (__runInitializers(this, _street_extraInitializers), __runInitializers(this, _number_initializers, 0));
                __runInitializers(this, _number_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _street_decorators = [IsString()];
            _number_decorators = [IsNumber()];
            __esDecorate(null, null, _street_decorators, { kind: "field", name: "street", static: false, private: false, access: { has: obj => "street" in obj, get: obj => obj.street, set: (obj, value) => { obj.street = value; } }, metadata: _metadata }, _street_initializers, _street_extraInitializers);
            __esDecorate(null, null, _number_decorators, { kind: "field", name: "number", static: false, private: false, access: { has: obj => "number" in obj, get: obj => obj.number, set: (obj, value) => { obj.number = value; } }, metadata: _metadata }, _number_initializers, _number_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
let User = (() => {
    var _a;
    let _role_decorators;
    let _role_initializers = [];
    let _role_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _nickname_decorators;
    let _nickname_initializers = [];
    let _nickname_extraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _age_decorators;
    let _age_initializers = [];
    let _age_extraInitializers = [];
    let _isActive_decorators;
    let _isActive_initializers = [];
    let _isActive_extraInitializers = [];
    let _address_decorators;
    let _address_initializers = [];
    let _address_extraInitializers = [];
    let _previousAddresses_decorators;
    let _previousAddresses_initializers = [];
    let _previousAddresses_extraInitializers = [];
    let _username_decorators;
    let _username_initializers = [];
    let _username_extraInitializers = [];
    let _document_decorators;
    let _document_initializers = [];
    let _document_extraInitializers = [];
    let _birthDate_decorators;
    let _birthDate_initializers = [];
    let _birthDate_extraInitializers = [];
    let _salary_decorators;
    let _salary_initializers = [];
    let _salary_extraInitializers = [];
    let _balance_decorators;
    let _balance_initializers = [];
    let _balance_extraInitializers = [];
    return _a = class User {
            constructor() {
                this.role = __runInitializers(this, _role_initializers, Role.USER);
                this.name = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _name_initializers, ""));
                this.nickname = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _nickname_initializers, void 0));
                this.email = (__runInitializers(this, _nickname_extraInitializers), __runInitializers(this, _email_initializers, ""));
                this.age = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _age_initializers, 0));
                this.isActive = (__runInitializers(this, _age_extraInitializers), __runInitializers(this, _isActive_initializers, true));
                this.address = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _address_initializers, new Address()));
                this.previousAddresses = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _previousAddresses_initializers, []));
                this.username = (__runInitializers(this, _previousAddresses_extraInitializers), __runInitializers(this, _username_initializers, ""));
                this.document = (__runInitializers(this, _username_extraInitializers), __runInitializers(this, _document_initializers, ""));
                this.birthDate = (__runInitializers(this, _document_extraInitializers), __runInitializers(this, _birthDate_initializers, new Date()));
                this.salary = (__runInitializers(this, _birthDate_extraInitializers), __runInitializers(this, _salary_initializers, 0));
                this.balance = (__runInitializers(this, _salary_extraInitializers), __runInitializers(this, _balance_initializers, 0));
                __runInitializers(this, _balance_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _role_decorators = [IsEnum(Role, "Invalid role")];
            _name_decorators = [IsRequired()];
            _nickname_decorators = [IsOptional()];
            _email_decorators = [IsString()];
            _age_decorators = [IsNumber()];
            _isActive_decorators = [IsBoolean()];
            _address_decorators = [ValidateNested(() => Address)];
            _previousAddresses_decorators = [IsArray(() => Address)];
            _username_decorators = [Length({ min: 5, max: 10, minMessage: "Too short", maxMessage: "Too long" })];
            _document_decorators = [IsNumericString("Only numbers")];
            _birthDate_decorators = [IsDate("Must be a date")];
            _salary_decorators = [MaxDigits(6, "Too many digits")];
            _balance_decorators = [Digits({ integer: 5, fraction: 2 }, "Wrong digit format")];
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: obj => "role" in obj, get: obj => obj.role, set: (obj, value) => { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _nickname_decorators, { kind: "field", name: "nickname", static: false, private: false, access: { has: obj => "nickname" in obj, get: obj => obj.nickname, set: (obj, value) => { obj.nickname = value; } }, metadata: _metadata }, _nickname_initializers, _nickname_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _age_decorators, { kind: "field", name: "age", static: false, private: false, access: { has: obj => "age" in obj, get: obj => obj.age, set: (obj, value) => { obj.age = value; } }, metadata: _metadata }, _age_initializers, _age_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: obj => "isActive" in obj, get: obj => obj.isActive, set: (obj, value) => { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: obj => "address" in obj, get: obj => obj.address, set: (obj, value) => { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _previousAddresses_decorators, { kind: "field", name: "previousAddresses", static: false, private: false, access: { has: obj => "previousAddresses" in obj, get: obj => obj.previousAddresses, set: (obj, value) => { obj.previousAddresses = value; } }, metadata: _metadata }, _previousAddresses_initializers, _previousAddresses_extraInitializers);
            __esDecorate(null, null, _username_decorators, { kind: "field", name: "username", static: false, private: false, access: { has: obj => "username" in obj, get: obj => obj.username, set: (obj, value) => { obj.username = value; } }, metadata: _metadata }, _username_initializers, _username_extraInitializers);
            __esDecorate(null, null, _document_decorators, { kind: "field", name: "document", static: false, private: false, access: { has: obj => "document" in obj, get: obj => obj.document, set: (obj, value) => { obj.document = value; } }, metadata: _metadata }, _document_initializers, _document_extraInitializers);
            __esDecorate(null, null, _birthDate_decorators, { kind: "field", name: "birthDate", static: false, private: false, access: { has: obj => "birthDate" in obj, get: obj => obj.birthDate, set: (obj, value) => { obj.birthDate = value; } }, metadata: _metadata }, _birthDate_initializers, _birthDate_extraInitializers);
            __esDecorate(null, null, _salary_decorators, { kind: "field", name: "salary", static: false, private: false, access: { has: obj => "salary" in obj, get: obj => obj.salary, set: (obj, value) => { obj.salary = value; } }, metadata: _metadata }, _salary_initializers, _salary_extraInitializers);
            __esDecorate(null, null, _balance_decorators, { kind: "field", name: "balance", static: false, private: false, access: { has: obj => "balance" in obj, get: obj => obj.balance, set: (obj, value) => { obj.balance = value; } }, metadata: _metadata }, _balance_initializers, _balance_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
describe("Decorators validation metadata", () => {
    it("should collect all validation rules", () => {
        const user = new User();
        const rules = getValidationRules(user);
        expect(rules).toHaveProperty("role");
        expect(rules.role).toMatchObject({ type: "enum", enum: Role });
        expect(rules).toHaveProperty("name");
        expect(rules.name.required).toBe(true);
        expect(rules).toHaveProperty("nickname");
        expect(rules.nickname.required).toBe(false);
        expect(rules.email.type).toBe("string");
        expect(rules.age.type).toBe("number");
        expect(rules.isActive.type).toBe("boolean");
        expect(rules.address).toMatchObject({ type: "object" });
        expect(rules.previousAddresses.type).toBe("array");
        expect(rules.username).toMatchObject({ minLength: 5, maxLength: 10 });
        expect(rules.document).toMatchObject({ numericOnly: true });
        expect(rules.birthDate.type).toBe("date");
        expect(rules.salary.maxDigits).toBe(6);
        expect(rules.balance.digits).toMatchObject({ integer: 5, fraction: 2 });
    });
    it("should throw error when ValidateNested used on non-field", () => {
        const mockContext = { kind: "method", addInitializer: () => { } };
        expect(() => ValidateNested(() => Address)(null, mockContext)).toThrow("ValidateNested solo puede usarse en propiedades");
    });
    it("should throw error when IsArray used on non-field", () => {
        const mockContext = { kind: "method", addInitializer: () => { } };
        expect(() => IsArray(() => Address)(null, mockContext)).toThrow("IsArray solo puede usarse en propiedades");
    });
});
