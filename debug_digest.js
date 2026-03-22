const crypto = require('crypto');
const { DOMParser } = require('@xmldom/xmldom');

// Función para calcular SHA256
function calculateSHA256(content) {
    return crypto.createHash('sha256').update(content, 'utf8').digest('base64');
}

// Función para canonicalizar XML (similar a lo que hace el SRI)
function canonicalizeXML(xmlString) {
    // Eliminar espacios entre etiquetas
    let canonicalized = xmlString
        .replace(/>\s+</g, '><')
        .replace(/^\s+|\s+$/g, '')
        .replace(/(\r\n|\n|\r)/g, '');
    
    return canonicalized;
}

// XML del comprobante sin firma (extraído de los logs)
const comprobanteXML = `<?xml version="1.0" encoding="UTF-8"?><factura id="comprobante" version="1.1.0"><infoTributaria><ambiente>2</ambiente><tipoEmision>1</tipoEmision><razonSocial>ARIAS GRANIZO CHRISTIAN ANTONIO</razonSocial><nombreComercial>ARIAS GRANIZO CHRISTIAN ANTONIO</nombreComercial><ruc>1804799755001</ruc><claveAcceso>2103202601180479975500120010010000000354234525416</claveAcceso><codDoc>01</codDoc><estab>001</estab><ptoEmi>001</ptoEmi><secuencial>000000035</secuencial><dirMatriz>Nicasio Safady</dirMatriz></infoTributaria><infoFactura><fechaEmision>21/03/2026</fechaEmision><dirEstablecimiento>Nicasio Safady</dirEstablecimiento><obligadoContabilidad>NO</obligadoContabilidad><tipoIdentificacionComprador>05</tipoIdentificacionComprador><razonSocialComprador>Consumidor Final</razonSocialComprador><identificacionComprador>9999999999999</identificacionComprador><totalSinImpuestos>1.00</totalSinImpuestos><totalDescuento>0.00</totalDescuento><totalConImpuestos><totalImpuesto><codigo>2</codigo><codigoPorcentaje>4</codigoPorcentaje><baseImponible>1.00</baseImponible><valor>0.15</valor></totalImpuesto></totalConImpuestos><propina>0</propina><importeTotal>1.15</importeTotal><moneda>DOLAR</moneda><pagos><pago><formaPago>01</formaPago><total>1.15</total></pago></pagos></infoFactura><detalles><detalle><codigoPrincipal>DC</codigoPrincipal><descripcion>CARPETA</descripcion><cantidad>1.00</cantidad><precioUnitario>1.00</precioUnitario><descuento>0.00</descuento><precioTotalSinImpuesto>1.00</precioTotalSinImpuesto><impuestos><impuesto><codigo>2</codigo><codigoPorcentaje>4</codigoPorcentaje><tarifa>15</tarifa><baseImponible>1.00</baseImponible><valor>0.15</valor></impuesto></impuestos></detalle></detalles><infoAdicional><campoAdicional nombre="Email">kristiano.l646@gmail.com</campoAdicional></infoAdicional></factura>`;

console.log('🔍 ANÁLISIS DE DIGEST DEL COMPROBANTE');
console.log('=====================================');

// 1. Digest actual (nuestro cálculo)
const canonicalized = canonicalizeXML(comprobanteXML);
const ourDigest = calculateSHA256(canonicalized);

console.log('📊 Nuestro Digest:', ourDigest);
console.log('📏 Longitud XML:', comprobanteXML.length);
console.log('📏 Longitud Canonicalizado:', canonicalized.length);

// 2. Digest que aparece en el XML firmado
const digestFromSignedXML = 'ajB2Zhw4KYZxHK/sO1W5tlpan8O0RNdJwkOMyNuo4Hg=';

console.log('\n📊 Digest en XML Firmado:', digestFromSignedXML);
console.log('🆚 ¿Coinciden?', ourDigest === digestFromSignedXML ? '✅ SÍ' : '❌ NO');

if (ourDigest !== digestFromSignedXML) {
    console.log('\n🚨 PROBLEMA: Los digests no coinciden');
    console.log('🔍 Esto explica por qué el SRI rechaza la firma');
    console.log('\n💡 Solución: El SRI está canonicalizando diferente');
    
    // Intentar diferentes canonicalizaciones
    console.log('\n🧪 Probando diferentes canonicalizaciones:');
    
    // Opción 1: Con espacios preservados
    const withSpaces = comprobanteXML.replace(/(\r\n|\n|\r)/g, '');
    const digestWithSpaces = calculateSHA256(withSpaces);
    console.log('1. Con espacios (solo eliminar saltos):', digestWithSpaces);
    
    // Opción 2: Con indentación estándar
    const withIndent = comprobanteXML.replace(/></g, '>\n<');
    const digestWithIndent = calculateSHA256(withIndent);
    console.log('2. Con indentación:', digestWithIndent);
    
    // Opción 3: Exactamente como lo genera .NET
    console.log('3. ¿Coincide con alguno?', digestWithSpaces === digestFromSignedXML ? '✅ SÍ (espacios)' : '❌ NO');
} else {
    console.log('\n✅ Los digests coinciden - el problema no está aquí');
}

console.log('\n📄 XML Canonicalizado:');
console.log(canonicalized.substring(0, 200) + '...');
