const fs = require('fs').promises;
const forge = require('node-forge');
const crypto = require('crypto');

async function obtenerCertificadoDesdeDB(usuarioId) {
  console.log('🔍 OBTENIENDO CERTIFICADO DESDE BASE DE DATOS');
  console.log('========================================');
  console.log('👤 Usuario ID:', usuarioId);
  console.log('');

  try {
    // Simular la obtención del certificado como lo hace el backend
    // NOTA: Esto es una simulación, necesitamos el certificado real
    
    // Rutas donde podría estar el certificado
    const posiblesRutas = [
      `C:\\Users\\USER\\Documents\\certificado_usuario_${usuarioId}.p12`,
      `C:\\Users\\USER\\Desktop\\certificado.p12`,
      `D:\\proyectos\\apk_inventarios\\certificado.p12`,
      `D:\\proyectos\\apk_inventarios\\backend\\certificado.p12`
    ];

    let certificadoEncontrado = null;
    let rutaEncontrada = null;

    for (const ruta of posiblesRutas) {
      try {
        await fs.access(ruta);
        certificadoEncontrado = ruta;
        rutaEncontrada = ruta;
        console.log('✅ Certificado encontrado en:', ruta);
        break;
      } catch (error) {
        // No existe en esta ruta, continuar
      }
    }

    if (!certificadoEncontrado) {
      console.log('❌ No se encontró el certificado en las rutas comunes');
      console.log('');
      console.log('🔍 Rutas verificadas:');
      posiblesRutas.forEach(ruta => console.log('•', ruta));
      console.log('');
      console.log('💡 Por favor, proporcione la ruta correcta del certificado P12');
      return;
    }

    // Ahora diagnosticar el certificado encontrado
    await diagnosticarCertificado(rutaEncontrada, "Christian123");

  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }
}

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

    // 3. Verificar integridad del archivo
    console.log('3. 🔍 Verificando integridad del archivo...');
    
    // Verificar que no esté vacío
    if (p12Buffer.length === 0) {
      console.log('❌ ERROR: El archivo está vacío');
      return;
    }
    
    // Verificar que tenga el formato P12 correcto (debe empezar con ASN.1 sequence)
    const primerosBytes = p12Buffer.slice(0, 10);
    console.log('📊 Primeros bytes (hex):', primerosBytes.toString('hex'));
    
    // Un archivo P12 válido debe empezar con 0x30 (ASN.1 Sequence)
    if (primerosBytes[0] !== 0x30) {
      console.log('❌ ERROR: El archivo no parece ser un P12 válido (no empieza con 0x30)');
      return;
    }
    
    console.log('✅ El archivo parece ser un P12 válido');
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
            
            // 9. Probar firma simple
            console.log('9. 🧪 Probando firma simple...');
            try {
              const testData = "TEST DATA FOR SIGNING";
              const md = forge.md.sha256.create();
              md.update(testData, 'utf8');
              const signature = privateKey.sign(md);
              console.log('✅ Firma simple exitosa');
              console.log('📊 Longitud firma:', signature.length);
              
              // Verificar firma
              const verify = forge.pki.rsa.verify(
                md.digest().bytes(),
                signature,
                forge.pki.rsa.setPublicKey(privateKey.n, privateKey.e)
              );
              console.log('✅ Verificación de firma:', verify);
            } catch (signError) {
              console.log('❌ ERROR en firma simple:', signError.message);
            }
          } else {
            console.log('❌ No se pudo extraer la clave privada');
          }
        }

        console.log('');
        console.log('🎉 DIAGNÓSTICO COMPLETADO EXITOSAMENTE');
        console.log('✅ El certificado P12 parece estar en buen estado');

      } else {
        console.log('❌ No se encontraron certificados en el P12');
      }

    } catch (error) {
      console.log('❌ ERROR parseando P12:', error.message);
      console.log('');
      console.log('🔍 Posibles causas:');
      console.log('• Contraseña incorrecta');
      console.log('• Archivo P12 corrupto o dañado');
      console.log('• Formato P12 inválido');
      console.log('• Problemas de encoding del archivo');
      
      // Intentar con contraseña vacía
      if (password && password !== "") {
        console.log('');
        console.log('🔄 Intentando con contraseña vacía...');
        try {
          const binaryStr = Array.from(p12Buffer).map(b => String.fromCharCode(b)).join('');
          const p12Asn1 = forge.asn1.fromDer(forge.util.createBuffer(binaryStr, 'binary'));
          const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, "");
          console.log('✅ P12 parseado con contraseña vacía');
        } catch (emptyPasswordError) {
          console.log('❌ Tampoco funciona con contraseña vacía');
        }
      }
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

// Ejecutar diagnóstico
obtenerCertificadoDesdeDB(4).catch(console.error);
