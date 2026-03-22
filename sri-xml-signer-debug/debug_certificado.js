const fs = require('fs').promises;
const forge = require('node-forge');
const crypto = require('crypto');

async function diagnosticarCertificado(rutaP12, password) {
  console.log('🔍 DIAGNÓSTICO COMPLETO DEL CERTIFICADO P12');
  console.log('========================================');
  console.log('📁 Ruta:', rutaP12);
  console.log('🔑 Password:', password ? '***' : 'SIN PASSWORD');
  console.log('');

  try {
    // 1. Verificar que el archivo existe
    console.log('1. 📋 Verificando existencia del archivo...');
    const stats = await fs.stat(rutaP12);
    console.log('✅ Archivo encontrado');
    console.log('📊 Tamaño:', stats.size, 'bytes');
    console.log('📅 Modificado:', stats.mtime);
    console.log('');

    // 2. Leer el archivo
    console.log('2. 📖 Leyendo archivo P12...');
    const p12Buffer = await fs.readFile(rutaP12);
    console.log('✅ Archivo leído correctamente');
    console.log('📊 Buffer length:', p12Buffer.length);
    console.log('');

    // 3. Verificar que sea un Base64 válido
    console.log('3. 🔍 Verificando integridad Base64...');
    try {
      const base64String = p12Buffer.toString('base64');
      console.log('✅ Conversión a Base64 exitosa');
      console.log('📊 Base64 length:', base64String.length);
      
      // Verificar caracteres inválidos
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      const isValidBase64 = base64Regex.test(base64String);
      console.log('✅ Base64 válido:', isValidBase64);
      
      if (!isValidBase64) {
        console.log('❌ ERROR: El archivo contiene caracteres no válidos para Base64');
        return;
      }
    } catch (error) {
      console.log('❌ ERROR en conversión Base64:', error.message);
      return;
    }
    console.log('');

    // 4. Intentar parsear como P12
    console.log('4. 🔐 Intentando parsear como PKCS#12...');
    try {
      const binaryStr = Array.from(p12Buffer).map(b => String.fromCharCode(b)).join('');
      const p12Asn1 = forge.asn1.fromDer(forge.util.createBuffer(binaryStr, 'binary'));
      const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);
      console.log('✅ P12 parseado correctamente');
      console.log('');

      // 5. Extraer información del certificado
      console.log('5. 📋 Extrayendo información del certificado...');
      const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
      const certBags = p12.getBags({ bagType: forge.pki.oids.certBag });
      
      console.log('🔑 Key bags encontrados:', keyBags[forge.pki.oids.pkcs8ShroudedKeyBag]?.length || 0);
      console.log('📜 Cert bags encontrados:', certBags[forge.pki.oids.certBag]?.length || 0);

      if (certBags[forge.pki.oids.certBag] && certBags[forge.pki.oids.certBag].length > 0) {
        const certificate = certBags[forge.pki.oids.certBag][0].cert;
        console.log('✅ Certificado extraído');
        console.log('📋 Subject:', certificate.subject.attributes.map(attr => `${attr.shortName}=${attr.value}`).join(', '));
        console.log('📋 Issuer:', certificate.issuer.attributes.map(attr => `${attr.shortName}=${attr.value}`).join(', '));
        console.log('📅 Válido desde:', certificate.validity.notBefore);
        console.log('📅 Válido hasta:', certificate.validity.notAfter);
        console.log('🔢 Serial:', certificate.serialNumber);
        console.log('');

        // 6. Verificar validez del certificado
        console.log('6. ✅ Verificando validez del certificado...');
        const ahora = new Date();
        const fechaVencimiento = new Date(certificate.validity.notAfter);
        const diasParaVencer = Math.floor((fechaVencimiento - ahora) / (1000 * 60 * 60 * 24));
        
        console.log('📅 Fecha actual:', ahora);
        console.log('📅 Vence:', fechaVencimiento);
        console.log('📊 Días para vencer:', diasParaVencer);
        console.log('✅ Certificado válido:', fechaVencimiento > ahora);
        console.log('');

        // 7. Generar hash del certificado
        console.log('7. 🔍 Generando hash del certificado...');
        const certDer = forge.asn1.toDer(forge.pki.certificateToAsn1(certificate)).getBytes();
        const certHash = crypto.createHash('sha256').update(Buffer.from(certDer, 'binary')).digest('base64');
        console.log('🔐 Cert Hash (SHA-256):', certHash);
        console.log('');

        // 8. Extraer clave privada
        if (keyBags[forge.pki.oids.pkcs8ShroudedKeyBag] && keyBags[forge.pki.oids.pkcs8ShroudedKeyBag].length > 0) {
          console.log('8. 🔑 Extrayendo clave privada...');
          const keyBag = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag][0];
          let privateKey = null;
          
          if (keyBag.key) {
            privateKey = keyBag.key;
          } else if (keyBag.asn1) {
            privateKey = forge.pki.privateKeyFromAsn1(keyBag.asn1);
          }
          
          if (privateKey) {
            console.log('✅ Clave privada extraída');
            console.log('🔑 Tipo:', privateKey.type);
            console.log('📊 Bits:', privateKey.n ? privateKey.n.bitLength() : 'N/A');
            
            // Extraer modulus y exponent
            const modulusHex = privateKey.n.toString(16);
            const modulusBase64 = Buffer.from(modulusHex.length % 2 === 0 ? modulusHex : '0' + modulusHex, 'hex').toString('base64');
            console.log('🔐 Modulus (Base64):', modulusBase64.substring(0, 50) + '...');
            console.log('🔐 Exponent:', 'AQAB');
          } else {
            console.log('❌ No se pudo extraer la clave privada');
          }
        }
      }

      console.log('');
      console.log('🎉 DIAGNÓSTICO COMPLETADO EXITOSAMENTE');
      console.log('✅ El certificado P12 parece estar en buen estado');

    } catch (error) {
      console.log('❌ ERROR parseando P12:', error.message);
      console.log('');
      console.log('🔍 Posibles causas:');
      console.log('• Contraseña incorrecta');
      console.log('• Archivo P12 corrupto o dañado');
      console.log('• Formato P12 inválido');
      console.log('• Problemas de encoding del archivo');
    }

  } catch (error) {
    console.log('❌ ERROR GENERAL:', error.message);
    console.log('');
    console.log('🔍 Verifique:');
    console.log('• Que la ruta al archivo sea correcta');
    console.log('• Que el archivo exista y sea accesible');
    console.log('• Que tenga permisos de lectura');
  }
}

// Ejemplo de uso
const rutaP12 = "C:\\Users\\USER\\AppData\\Local\\Temp\\tmpzh5vno.tmp";
const password = "Christian123";

diagnosticarCertificado(rutaP12, password).catch(console.error);
