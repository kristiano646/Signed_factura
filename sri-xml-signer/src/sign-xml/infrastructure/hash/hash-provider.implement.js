import * as forge from "node-forge";
export class HashProviderImplement {
    sha1Base64(input) {
        const md = forge.md.sha1.create();
        md.update(input);
        const digestHex = md.digest().toHex();
        const digestBytes = forge.util.hexToBytes(digestHex);
        return forge.util.encode64(digestBytes);
    }
    sha256Base64(input) {
        const md = forge.md.sha256.create();
        md.update(input);
        const digestHex = md.digest().toHex();
        const digestBytes = forge.util.hexToBytes(digestHex);
        return forge.util.encode64(digestBytes);
    }
    sha1RawBase64(input) {
        const md = forge.md.sha1.create();
        md.update(forge.util.createBuffer(input));
        const digestHex = md.digest().toHex();
        const digestBytes = forge.util.hexToBytes(digestHex);
        return forge.util.encode64(digestBytes);
    }
    sha256RawBase64(input) {
        const md = forge.md.sha256.create();
        md.update(forge.util.createBuffer(input));
        const digestHex = md.digest().toHex();
        const digestBytes = forge.util.hexToBytes(digestHex);
        return forge.util.encode64(digestBytes);
    }
}
