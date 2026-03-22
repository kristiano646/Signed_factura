import * as forge from "node-forge";
export class ForgeRsaSha1Signer {
    constructor(privateKey) {
        this.privateKey = privateKey;
    }
    signSha1RsaBase64(input) {
        var _a, _b;
        const md = forge.md.sha1.create();
        md.update(input, "utf8");
        const rawSignature = this.privateKey.sign(md);
        const base64Signature = forge.util.encode64(rawSignature);
        // Esto es opcional: dividir en líneas de 76 caracteres según XAdES
        return (_b = (_a = base64Signature.match(/.{1,76}/g)) === null || _a === void 0 ? void 0 : _a.join("\n")) !== null && _b !== void 0 ? _b : base64Signature;
    }
    signSha256RsaBase64(input) {
        var _a, _b;
        const md = forge.md.sha256.create();
        md.update(input, "utf8");
        const rawSignature = this.privateKey.sign(md);
        const base64Signature = forge.util.encode64(rawSignature);
        // Esto es opcional: dividir en líneas de 76 caracteres según XAdES
        return (_b = (_a = base64Signature.match(/.{1,76}/g)) === null || _a === void 0 ? void 0 : _a.join("\n")) !== null && _b !== void 0 ? _b : base64Signature;
    }
}
