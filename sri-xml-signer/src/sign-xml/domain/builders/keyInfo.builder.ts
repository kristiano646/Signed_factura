import { XMLNS_ATTRIBUTE } from "../enums";

export class KeyInfoBuilder {
  build(params: {
    certificateNumber: string;
    certificateX509: string;
    modulus: string;
    exponent: string;
  }): string {
    const { certificateNumber, certificateX509, modulus, exponent } = params;

    return [
      `<ds:KeyInfo ${XMLNS_ATTRIBUTE} Id="Certificate${certificateNumber}">`,
      "<ds:X509Data>",
      "<ds:X509Certificate>",
      certificateX509,
      "</ds:X509Certificate>",
      "</ds:X509Data>",
      "<ds:KeyValue>",
      "<ds:RSAKeyValue>",
      "<ds:Modulus>",
      modulus,
      "</ds:Modulus>",
      "<ds:Exponent>",
      exponent,
      "</ds:Exponent>",
      "</ds:RSAKeyValue>",
      "</ds:KeyValue>",
      "</ds:KeyInfo>",
    ].join("");
  }
}
