import { getForge } from "../../../../utils/forge-loader";
import { SignStrategy } from "../../interfaces";
import {
  PrivateKeyExtractionError,
  SigningKeyNotFoundError,
  EntidadCertificacionNotFoundError,
} from "../../errors";

export class EntidadCertificacionStrategy implements SignStrategy {
  supports(friendlyName: string): boolean {
    return /ENTIDAD DE CERTIFICACION DE INFORMACION/i.test(friendlyName);
  }

  async getPrivateKey(
    bags: any[]
  ): Promise<any> {
    const forge = await getForge();
    const item = bags[0];
    if (!item) throw new SigningKeyNotFoundError("ENTIDAD DE CERTIFICACION DE INFORMACION");
    if (item?.key) {
      return item.key;
    } else if (item?.asn1) {
      return forge.pki.privateKeyFromAsn1(item.asn1);
    } else {
      throw new PrivateKeyExtractionError();
    }
  }

  async overrideIssuerName(certBags: any): Promise<string> {
    const forge = await getForge();
    const certItems = certBags[forge.pki.oids.certBag];
    if (!certItems || !certItems.length) {
      throw new EntidadCertificacionNotFoundError();
    }
    const cert = certItems[0].cert;

    return await this.getX509IssuerName(cert);
  }

  private async getX509IssuerName(cert: any): Promise<string> {
    const forge = await getForge();
    
    // Extraer atributos del issuer en el orden ESPECÍFICO del XML válido del SRI
    const issuerAttributes = cert.issuer.attributes || [];
    
    // Orden exacto del XML válido: L=AMBATO,CN=...,ST=TUNGURAHUA,OU=...,O=...,C=EC
    const orderedAttributes = [];
    
    // Buscar cada atributo en el orden CORRECTO según XML válido
    const findAttribute = (shortName: string, type?: string) => {
      return issuerAttributes.find(attr => 
        (attr.shortName === shortName) || 
        (type && attr.type === type)
      );
    };
    
    // 1. L (Locality)
    const lAttr = findAttribute('L');
    if (lAttr) orderedAttributes.push(`L=${lAttr.value}`);
    
    // 2. CN (Common Name)
    const cnAttr = findAttribute('CN');
    if (cnAttr) orderedAttributes.push(`CN=${cnAttr.value}`);
    
    // 3. ST (State/Province)
    const stAttr = findAttribute('ST');
    if (stAttr) orderedAttributes.push(`ST=${stAttr.value}`);
    
    // 4. OU (Organizational Unit)
    const ouAttr = findAttribute('OU');
    if (ouAttr) orderedAttributes.push(`OU=${ouAttr.value}`);
    
    // 5. O (Organization)
    const oAttr = findAttribute('O');
    if (oAttr) orderedAttributes.push(`O=${oAttr.value}`);
    
    // 6. C (Country)
    const cAttr = findAttribute('C');
    if (cAttr) orderedAttributes.push(`C=${cAttr.value}`);
    
    // 7. E (Email) - si existe
    const eAttr = findAttribute('E') || findAttribute(undefined, 'emailAddress');
    if (eAttr) orderedAttributes.push(`E=${eAttr.value}`);
    
    // Agregar otros atributos no estándar al final
    issuerAttributes.forEach(attr => {
      const name = attr.shortName || attr.name || attr.type;
      const isStandard = ['L', 'CN', 'ST', 'OU', 'O', 'C', 'E', 'emailAddress'].includes(name);
      
      if (!isStandard) {
        orderedAttributes.push(`${name}=${this.hexEncodeUtf8(attr.value, forge)}`);
      }
    });

    return orderedAttributes.join(",");
  }

  private hexEncodeUtf8(value: string, forge: any): string {
    try {
      const utf8Bytes = forge.util.encodeUtf8(value);
      const hex = forge.util.bytesToHex(utf8Bytes);
      return `#0c${utf8Bytes.length.toString(16).padStart(2, "0")}${hex}`;
    } catch (error) {
      console.warn('Error en hexEncodeUtf8:', error);
      return value; // Fallback al valor original
    }
  }
}
