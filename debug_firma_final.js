const crypto = require('crypto');

// XML firmado del SRI que está fallando
const xmlFirmado = `<?xml version="1.0" encoding="UTF-8"?><factura id="comprobante" version="1.1.0"><infoTributaria><ambiente>2</ambiente><tipoEmision>1</tipoEmision><razonSocial>ARIAS GRANIZO CHRISTIAN ANTONIO</razonSocial><nombreComercial>ARIAS GRANIZO CHRISTIAN ANTONIO</nombreComercial><ruc>1804799755001</ruc><claveAcceso>2103202601180479975500120010010000000359783534612</claveAcceso><codDoc>01</codDoc><estab>001</estab><ptoEmi>001</ptoEmi><secuencial>000000035</secuencial><dirMatriz>Nicasio Safady</dirMatriz></infoTributaria><infoFactura><fechaEmision>21/03/2026</fechaEmision><dirEstablecimiento>Nicasio Safady</dirEstablecimiento><obligadoContabilidad>NO</obligadoContabilidad><tipoIdentificacionComprador>05</tipoIdentificacionComprador><razonSocialComprador>Consumidor Final</razonSocialComprador><identificacionComprador>9999999999999</identificacionComprador><totalSinImpuestos>1.00</totalSinImpuestos><totalDescuento>0.00</totalDescuento><totalConImpuestos><totalImpuesto><codigo>2</codigo><codigoPorcentaje>4</codigoPorcentaje><baseImponible>1.00</baseImponible><valor>0.15</valor></totalImpuesto></totalConImpuestos><propina>0</propina><importeTotal>1.15</importeTotal><moneda>DOLAR</moneda><pagos><pago><formaPago>01</formaPago><total>1.15</total></pago></pagos></infoFactura><detalles><detalle><codigoPrincipal>DC</codigoPrincipal><descripcion>CARPETA</descripcion><cantidad>1.00</cantidad><precioUnitario>1.00</precioUnitario><descuento>0.00</descuento><precioTotalSinImpuesto>1.00</precioTotalSinImpuesto><impuestos><impuesto><codigo>2</codigo><codigoPorcentaje>4</codigoPorcentaje><tarifa>15</tarifa><baseImponible>1.00</baseImponible><valor>0.15</valor></impuesto></impuestos></detalle></detalles><infoAdicional><campoAdicional nombre="Email">kristiano.l646@gmail.com</campoAdicional></infoAdicional><ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:etsi="http://uri.etsi.org/01903/v1.3.2#" Id="Signature2950047"><ds:SignedInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:etsi="http://uri.etsi.org/01903/v1.3.2#" Id="Signature-SignedInfo4530030"><ds:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/><ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><ds:Reference Id="SignedPropertiesID488014" Type="http://uri.etsi.org/01903#SignedProperties" URI="#Signature2950047-SignedProperties9215136"><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>3mFK0ilSD3y1xFiIFfe141uKQ9pVhitFjBPfiPom/nc=</ds:DigestValue></ds:Reference><ds:Reference Id="Reference-ID-4719862" URI="#comprobante"><ds:Transforms><ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/></ds:Transforms><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>ajB2Zhw4KYZxHK/sO1W5tlpan8O0RNdJwkOMyNuo4Hg=</ds:DigestValue></ds:Reference></ds:SignedInfo><ds:SignatureValue Id="SignatureValue8188437">KCfQ/ugI9D/iW2pqWfxliDaiRLh5gNee8DUVuN81SB8rlveara7X8u77Cr0NCWMAXlvW9ZXXIASMopp0hVkHX6whzRvYe7rGJPFutltviY6DuoteWNmxXhD9lOqFIsS4A9SSI4WoDTa3GejO9nRG0PWOHoBsHPXBFmmKGbgEuoo3j9MwGfHXDDnlWvFbJuTrAG3gDF8l5vNNSQW2XegxNWIbjBoP6fgr2Ug/dP4Jy4SYFwCLHo5Ac7HpzA8PautF7DS5LoOgHbrye25jC4KRe58uxAYMS81LuJ61MTpMYZxCVbD/pENFPlLEFJBPzfOg/z+fdCKBbAaS3//DbSYlag==</ds:SignatureValue><ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:etsi="http://uri.etsi.org/01903/v1.3.2#" Id="Certificate5409898"><ds:X509Data><ds:X509Certificate>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</ds:X509Certificate></ds:X509Data><ds:KeyValue><ds:RSAKeyValue><ds:Modulus>k0D9j84YQE6MZC0P0/3Ud8Mr0j2ocWriOrJ7mMO64pSoA+k8vQYAUw+zyu8g2S+gtS0NfnwK3l/3z2jkUCz04CFCzALkR0ozJA91ollFxdQSlW1kY35pn2yG34Pulv/CKVXOkTqCXhF4iBYDN0LNQ9vqp7WUHxCHr9Fm5sveMaykjNMXcPpvm92B8CJYp2+2Xnphs5K1gj351E2lGD2dfdwOegWG5LAZ4wYVS1kBZDHkQ6zl1LPKoCI7mn1Yu7c/KNZQlOqXaBCFfqEUb2sHG3LuASXbTQDTytf2ncMhRfAEm+igs5QolDw1MVl6X/rWwbuKJaDIk3c0QaLDeX+IaQ==</ds:Modulus><ds:Exponent>AQAB</ds:Exponent></ds:RSAKeyValue></ds:KeyValue></ds:KeyInfo><ds:Object Id="Signature2950047-Object4979020"><etsi:QualifyingProperties Target="#Signature2950047"><etsi:SignedProperties xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:etsi="http://uri.etsi.org/01903/v1.3.2#" Id="Signature2950047-SignedProperties9215136"><etsi:SignedSignatureProperties><etsi:SigningTime>2026-03-21T16:53:58-05:00</etsi:SigningTime><etsi:SigningCertificate><etsi:Cert><etsi:CertDigest><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>4stgb97+rOZO8p55CVXtzMJuOWs=</ds:DigestValue></etsi:CertDigest><etsi:IssuerSerial><ds:X509IssuerName>L=AMBATO,CN=AUTORIDAD DE CERTIFICACION SUBCA-1 FIRMASEGURA S.A.S.,ST=TUNGURAHUA,OU=ENTIDAD DE CERTIFICACION DE INFORMACION,O=FIRMASEGURA S.A.S.,C=EC</ds:X509IssuerName><ds:X509SerialNumber>262361224604500346405023647177112389032</ds:X509SerialNumber></etsi:IssuerSerial></etsi:Cert></etsi:SigningCertificate></etsi:SignedSignatureProperties><etsi:SignedDataObjectProperties><etsi:DataObjectFormat ObjectReference="#Reference-ID-4719862"><etsi:Description>FIRMA DIGITAL SRI</etsi:Description><etsi:MimeType>text/xml</etsi:MimeType><etsi:Encoding>UTF-8</etsi:Encoding></etsi:DataObjectFormat></etsi:SignedDataObjectProperties></etsi:SignedProperties></etsi:QualifyingProperties></ds:Object></ds:Signature></factura>`;

console.log('🔍 === ANÁLISIS DE FIRMA DIGITAL ===');

// Extraer el SignedInfo del XML
const signedInfoMatch = xmlFirmado.match(/<ds:SignedInfo[^>]*>.*?<\/ds:SignedInfo>/s);
if (!signedInfoMatch) {
    console.error('❌ No se encontró SignedInfo');
    process.exit(1);
}

const signedInfoXml = signedInfoMatch[0];
console.log('📋 SignedInfo XML:');
console.log(signedInfoXml);
console.log('\n');

// Extraer la firma del XML
const signatureValueMatch = xmlFirmado.match(/<ds:SignatureValue[^>]*>(.*?)<\/ds:SignatureValue>/s);
if (!signatureValueMatch) {
    console.error('❌ No se encontró SignatureValue');
    process.exit(1);
}

const signatureValue = signatureValueMatch[1].replace(/\s/g, '');
console.log('🔐 SignatureValue (Base64):');
console.log(signatureValue);
console.log('\n');

// Extraer el certificado del XML
const certMatch = xmlFirmado.match(/<ds:X509Certificate>(.*?)<\/ds:X509Certificate>/s);
if (!certMatch) {
    console.error('❌ No se encontró X509Certificate');
    process.exit(1);
}

const certPem = `-----BEGIN CERTIFICATE-----\n${certMatch[1].match(/.{1,64}/g).join('\n')}\n-----END CERTIFICATE-----`;
console.log('📜 Certificado PEM:');
console.log(certPem);
console.log('\n');

// Cargar el certificado y extraer la clave pública
const publicKey = crypto.createPublicKey(certPem);

console.log('🔑 Clave Pública Extraída:');
console.log('Key Type:', publicKey.type);
console.log('Algorithm:', publicKey.asymmetricKeyType);
console.log('\n');

// Intentar verificar la firma
try {
    // Convertir el SignedInfo a bytes (simulación de canonicalización)
    const signedInfoBytes = Buffer.from(signedInfoXml, 'utf8');
    
    // Convertir la firma a bytes
    const signatureBytes = Buffer.from(signatureValue, 'base64');
    
    console.log('📊 Datos para Verificación:');
    console.log('• SignedInfo length:', signedInfoBytes.length);
    console.log('• Signature length:', signatureBytes.length);
    console.log('\n');
    
    // Verificar la firma con RSA-SHA256
    const isValid = crypto.verify('rsa-sha256', signedInfoBytes, publicKey, signatureBytes);
    
    console.log('✅ RESULTADO DE VERIFICACIÓN:');
    console.log('• Firma válida:', isValid);
    
    if (!isValid) {
        console.log('\n🔍 POSIBLES PROBLEMAS:');
        console.log('1. La canonicalización del SignedInfo no es correcta');
        console.log('2. El algoritmo de firma no coincide');
        console.log('3. La clave privada usada para firmar no corresponde al certificado');
        console.log('4. El formato del SignedInfo no es el esperado');
        
        // Intentar con canonicalización simple (remover espacios y saltos de línea)
        console.log('\n🔧 Intentando canonicalización simple...');
        const canonicalizedSignedInfo = signedInfoXml
            .replace(/>\s+</g, '><')  // Remover espacios entre tags
            .replace(/\s+/g, ' ')     // Reemplazar múltiples espacios con uno solo
            .trim();
        
        const canonicalizedBytes = Buffer.from(canonicalizedSignedInfo, 'utf8');
        console.log('• Canonicalizado length:', canonicalizedBytes.length);
        
        const isValidCanonical = crypto.verify('rsa-sha256', canonicalizedBytes, publicKey, signatureBytes);
        console.log('• Firma válida (canonicalizado):', isValidCanonical);
    }
    
} catch (error) {
    console.error('❌ Error en verificación:', error.message);
}

console.log('\n🎯 === PRÓXIMOS PASOS ===');
console.log('1. Verificar que la canonicalización del SignedInfo sea correcta');
console.log('2. Asegurar que se use RSA-SHA256 para firmar');
console.log('3. Verificar que la clave privada corresponda al certificado público');
console.log('4. Revisar el formato exacto del SignedInfo antes de firmar');
