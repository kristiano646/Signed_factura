// ⏰ Forzar zona horaria UTC-5 (Ecuador) ANTES de cargar la librería
require('./date-override');

// server-production-final.js - VERSIÓN MEJORADA CON VALIDACIÓN XML Y MANEJO DE ERRORES SRI
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const { signXml } = require('./dist/index');
const forge = require('node-forge');
const crypto = require('crypto');
const { DOMParser, XMLSerializer } = require('@xmldom/xmldom');
const axios = require('axios');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.text({ type: 'application/xml' }));

// Validador XML para SRI Ecuador (usando xmldom en lugar de libxmljs)
function validarXMLSRI(xmlString) {
  const errores = [];
  const advertencias = [];
  
  try {
    // 1. Validar estructura XML básica
    const parser = new DOMParser({
      onError: (error) => {
        if (error.fatalError) {
          errores.push(`Error grave XML: ${error.message}`);
        } else if (error.error) {
          errores.push(`Error XML: ${error.message}`);
        } else if (error.warning) {
          advertencias.push(`Advertencia XML: ${error.message}`);
        }
      }
    });
    
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    // Verificar si hay errores de parsing
    if (errores.length > 0) {
      return { valido: false, errores, advertencias };
    }
    
    // 2. Validar elementos requeridos para facturación electrónica
    const root = xmlDoc.documentElement;
    if (!root) {
      errores.push('XML sin elemento raíz');
      return { valido: false, errores, advertencias };
    }
    
    // 3. Validar que sea un comprobante fiscal válido
    const comprobantesValidos = ['factura', 'notaDebito', 'notaCredito', 'guiaRemision', 'retencion'];
    const nombreComprobante = root.tagName.toLowerCase();
    
    if (!comprobantesValidos.includes(nombreComprobante)) {
      errores.push(`Tipo de comprobante '${root.tagName}' no es válido para SRI`);
    }
    
    // 4. Validar infoTributaria
    const infoTributaria = root.getElementsByTagName('infoTributaria')[0];
    let claveAcceso = '';
    let ruc = '';
    let razonSocial = '';
    
    if (!infoTributaria) {
      errores.push('Falta el elemento infoTributaria');
    } else {
      // Validar campos obligatorios de infoTributaria
      const camposObligatorios = ['razonSocial', 'nombreComercial', 'ruc', 'claveAcceso', 'codDoc', 'estab', 'ptoEmi', 'secuencial', 'dirMatriz'];
      
      camposObligatorios.forEach(campo => {
        const elemento = infoTributaria.getElementsByTagName(campo)[0];
        const valor = elemento ? elemento.textContent?.trim() : '';
        if (!valor) {
          errores.push(`Campo obligatorio faltante en infoTributaria: ${campo}`);
        }
      });
      
      // Validar formato de clave de acceso
      const claveAccesoElement = infoTributaria.getElementsByTagName('claveAcceso')[0];
      claveAcceso = claveAccesoElement ? claveAccesoElement.textContent : '';
      if (claveAcceso && claveAcceso.length !== 49) {
        errores.push('La clave de acceso debe tener exactamente 49 caracteres');
      }
      
      // Validar RUC
      const rucElement = infoTributaria.getElementsByTagName('ruc')[0];
      ruc = rucElement ? rucElement.textContent : '';
      if (ruc && !/^\d{13}$/.test(ruc)) {
        errores.push('El RUC debe tener exactamente 13 dígitos');
      }
      
      // Obtener razón social
      const razonSocialElement = infoTributaria.getElementsByTagName('razonSocial')[0];
      razonSocial = razonSocialElement ? razonSocialElement.textContent : '';
    }
    
    // 5. Validar infoFactura (para facturas)
    if (nombreComprobante === 'factura') {
      const infoFactura = root.getElementsByTagName('infoFactura')[0];
      if (!infoFactura) {
        errores.push('Falta el elemento infoFactura para factura');
      } else {
        // Validar campos obligatorios de infoFactura
        const fechaEmisionElement = infoFactura.getElementsByTagName('fechaEmision')[0];
        const fechaEmision = fechaEmisionElement ? fechaEmisionElement.textContent : '';
        if (!fechaEmision) {
          errores.push('Falta fecha de emisión');
        } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(fechaEmision)) {
          errores.push('Formato de fecha inválido (debe ser dd/mm/yyyy)');
        }
        
        const totalSinImpuestosElement = infoFactura.getElementsByTagName('totalSinImpuestos')[0];
        const totalSinImpuestos = totalSinImpuestosElement ? totalSinImpuestosElement.textContent : '';
        if (!totalSinImpuestos || isNaN(parseFloat(totalSinImpuestos))) {
          errores.push('totalSinImpuestos debe ser un número válido');
        }
        
        const importeTotalElement = infoFactura.getElementsByTagName('importeTotal')[0];
        const importeTotal = importeTotalElement ? importeTotalElement.textContent : '';
        if (!importeTotal || isNaN(parseFloat(importeTotal))) {
          errores.push('importeTotal debe ser un número válido');
        }
      }
    }
    
    // 6. Validar detalles (mínimo un detalle)
    const detalles = root.getElementsByTagName('detalles')[0];
    if (!detalles) {
      errores.push('Debe existir al menos un detalle en el comprobante');
    } else {
      const detalleNodes = detalles.getElementsByTagName('detalle');
      if (!detalleNodes || detalleNodes.length === 0) {
        errores.push('No se encontraron detalles en el comprobante');
      }
    }
    
    // 7. Validaciones de formato SRI específicas
    const xmlSinEspacios = xmlString.replace(/>\s+</g, '><').trim();
    
    // Verificar que no haya caracteres no permitidos
    if(/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(xmlString)) {
      advertencias.push('El XML contiene caracteres de control no recomendados');
    }
    
    // Validar encoding
    if (!xmlString.includes('<?xml') && !xmlString.includes('encoding=')) {
      advertencias.push('Recomendado incluir declaración XML con encoding');
    }
    
    return {
      valido: errores.length === 0,
      errores,
      advertencias,
      comprobante: nombreComprobante,
      claveAcceso: claveAcceso,
      ruc: ruc,
      razonSocial: razonSocial
    };
    
  } catch (error) {
    return {
      valido: false,
      errores: [`Error parsing XML: ${error.message}`],
      advertencias: []
    };
  }
}

// Manejo de errores específicos del SRI
function clasificarErrorSRI(error, xmlValidacion) {
  const erroresComunes = {
    'CLAVE_ACCESO_DUPLICADA': {
      mensaje: 'La clave de acceso ya fue utilizada anteriormente',
      solucion: 'Genere una nueva clave de acceso con secuencia correlativo'
    },
    'RUC_INVALIDO': {
      mensaje: 'El RUC proporcionado no es válido',
      solucion: 'Verifique el RUC del emisor'
    },
    'FECHA_FUTURA': {
      mensaje: 'La fecha de emisión no puede ser futura',
      solucion: 'Use la fecha actual o una fecha anterior'
    },
    'XML_MAL_FORMADO': {
      mensaje: 'El XML no está bien formado',
      solucion: 'Revise la estructura del XML'
    },
    'CERTIFICADO_VENCIDO': {
      mensaje: 'El certificado digital está vencido',
      solucion: 'Renueve el certificado digital'
    },
    'CERTIFICADO_REVOCADO': {
      mensaje: 'El certificado digital está revocado',
      solucion: 'Obtenga un nuevo certificado digital'
    }
  };
  
  const mensajeError = error.message.toLowerCase();
  
  for (const [codigo, info] of Object.entries(erroresComunes)) {
    if (mensajeError.includes(codigo.toLowerCase()) || 
        mensajeError.includes(info.mensaje.toLowerCase())) {
      return {
        tipo: codigo,
        ...info,
        original: error.message
      };
    }
  }
  
  // Clasificación por patrones
  if (mensajeError.includes('clave') && mensajeError.includes('acceso')) {
    return {
      tipo: 'CLAVE_ACCESO_ERROR',
      mensaje: 'Error relacionado con la clave de acceso',
      solucion: 'Verifique que la clave de acceso tenga 49 dígitos y sea única',
      original: error.message
    };
  }
  
  if (mensajeError.includes('certificado') || mensajeError.includes('firma')) {
    return {
      tipo: 'CERTIFICADO_ERROR',
      mensaje: 'Error relacionado con el certificado digital',
      solucion: 'Verifique que el certificado sea válido y no esté vencido',
      original: error.message
    };
  }
  
  return {
    tipo: 'ERROR_GENERAL',
    mensaje: 'Error no clasificado',
    solucion: 'Revise los logs para más detalles',
    original: error.message
  };
}

function limpiarXML(xml) {
  if (!xml) return '';
  console.log("limpiando...");
  return xml
    .replace(/\\r\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/^"|"$/g, '')
    .trim();
}

function obtenerModulusExponent(privateKey) {
  try {
    const modulusHex = privateKey.n.toString(16);
    const modulusHexPadded = modulusHex.length % 2 === 0 ? modulusHex : '0' + modulusHex;
    const modulusBuffer = Buffer.from(modulusHexPadded, 'hex');
    const modulusBase64 = modulusBuffer.toString('base64');
    console.log('Modulus (Base64):', modulusBase64);
    return { modulus: modulusBase64, exponent: 'AQAB' };
  } catch (error) {
    console.error('Error obteniendo modulus:', error);
    return { modulus: '', exponent: 'AQAB' };
  }
}

async function extraerCertificadoYClave(p12Buffer, password) {
  try {
    
    
    const binaryStr = Array.from(p12Buffer).map(b => String.fromCharCode(b)).join('');
    const p12Asn1 = forge.asn1.fromDer(forge.util.createBuffer(binaryStr, 'binary'));
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);
    
    const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
    const certBags = p12.getBags({ bagType: forge.pki.oids.certBag });
    
    const keyBag = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag];
    if (!keyBag || keyBag.length === 0) throw new Error('No se encontró clave privada');
    
    let privateKey = null;
    if (keyBag[0].key) {
      privateKey = keyBag[0].key;
    } else if (keyBag[0].asn1) {
      privateKey = forge.pki.privateKeyFromAsn1(keyBag[0].asn1);
    }
    
    if (!privateKey) throw new Error('No se pudo extraer la clave privada');
    
    const certificates = certBags[forge.pki.oids.certBag];
    if (!certificates || certificates.length === 0) throw new Error('No se encontró certificado');
    
    const certificate = certificates[0].cert;
    
    const certDer = forge.asn1.toDer(forge.pki.certificateToAsn1(certificate)).getBytes();
    const certHash = crypto.createHash('sha256').update(Buffer.from(certDer, 'binary')).digest('base64');
    
    const issuerName = certificate.issuer.attributes
      .reverse()
      .map(attr => {
        let name = attr.shortName || attr.name || attr.type;
        if (name === 'emailAddress') name = 'E';
        let value = String(attr.value).replace(/[&<>]/g, m => m === '&' ? '&amp;' : m === '<' ? '&lt;' : '&gt;');
        return `${name}=${value}`;
      })
      .join(',');
    
    const certBase64 = forge.util.encode64(certDer);
    const { modulus, exponent } = obtenerModulusExponent(privateKey);
    console.log('Issuer Name:', issuerName);
    console.log('Modulus:', modulus);
    console.log('Exponent:', exponent);
    console.log('Certificate Hash (SHA-256):', certHash);
    console.log('Certificate (Base64):', certBase64);
    console.log('Clave privada extraída correctamente');
    console.log('Certificado extraído correctamente');
    console.log('========================================');
    console.log('Información del certificado:');
    console.log('Issuer Name:', issuerName);
    console.log('Modulus:', modulus);
    console.log('Exponent:', exponent);
    console.log('Certificate Hash (SHA-256):', certHash);
    return {
      privateKey,
      certificate,
      certificateX509: certBase64,
      certificateHash: certHash,
      issuerName,
      modulus,
      exponent
    };
  } catch (error) {
    console.error('Error extrayendo certificado:', error);
    throw error;
  }
} // <--- Agregada llave de cierre

// ENDPOINTS
app.post('/firmar', async (req, res) => {
  const startTime = Date.now();
  let xmlValidacion = null;
  
  try {
    let xmlRaw, id, p12Base64, password, signingTime;
    
    if (typeof req.body === 'string') {
      xmlRaw = req.body;
      id = req.query.id || 'default';
      p12Base64 = req.query.p12Base64;
      password = req.query.password;
      signingTime = req.query.signingTime; // ← Obtener hora del backend
    } else {
      xmlRaw = req.body.xml;
      id = req.body.id;
      p12Base64 = req.body.p12Base64;
      password = req.body.password;
      signingTime = req.body.signingTime; // ← Obtener hora del backend
    }
    
    console.log('========================================');
    console.log('📋 NUEVA SOLICITUD DE FIRMA');
    console.log('ID:', id);
    console.log('P12 Base64:', p12Base64 ? `${p12Base64.substring(0, 50)}...` : 'null');
    console.log('Timestamp:', new Date().toISOString());
    console.log('========================================');
    
    // Validaciones básicas
    if (!xmlRaw) {
      return res.status(400).json({ 
        success: false,
        error: 'VALIDACION_ERROR',
        mensaje: 'Campo xml vacío',
        solucion: 'Proporcione el XML a firmar'
      });
    }
    
    if (!p12Base64) {
      return res.status(400).json({ 
        success: false,
        error: 'VALIDACION_ERROR', 
        mensaje: 'Campo p12Base64 vacío',
        solucion: 'Proporcione el certificado P12 en formato Base64'
      });
    }
    
    if (!password) {
      return res.status(400).json({ 
        success: false,
        error: 'VALIDACION_ERROR',
        mensaje: 'Campo password vacío',
        solucion: 'Proporcione la contraseña del certificado'
      });
    }

    // 1. VALIDACIÓN XML ANTES DE PROCESAR
    console.log('🔍 Validando estructura XML...');
    const xmlLimpio = limpiarXML(String(xmlRaw));
    xmlValidacion = validarXMLSRI(xmlLimpio);
    
    if (!xmlValidacion.valido) {
      console.error('❌ Validación XML fallida:', xmlValidacion.errores);
      return res.status(400).json({
        success: false,
        error: 'XML_INVALIDO',
        mensaje: 'El XML no cumple con las especificaciones del SRI',
        errores: xmlValidacion.errores,
        advertencias: xmlValidacion.advertencias,
        solucion: 'Corrija los errores de estructura del XML antes de continuar'
      });
    }
    
    if (xmlValidacion.advertencias.length > 0) {
      console.warn('⚠️ Advertencias de validación:', xmlValidacion.advertencias);
    }
    
    console.log('✅ Validación XML exitosa');
    console.log(`📄 Tipo comprobante: ${xmlValidacion.comprobante}`);
    console.log(`🔑 Clave acceso: ${xmlValidacion.claveAcceso}`);

    // 2. CONVERTIR P12 BASE64 A BUFFER
    console.log('🔐 Procesando certificado P12 desde Base64...');
    let p12Buffer;
    try {
      p12Buffer = Buffer.from(p12Base64, 'base64');
      console.log(`✅ P12 convertido desde Base64. Tamaño: ${p12Buffer.length} bytes`);
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'CERTIFICADO_INVALIDO',
        mensaje: 'No se pudo decodificar el certificado P12 desde Base64',
        solucion: 'Verifique que el certificado esté correctamente codificado en Base64',
        detalle: error.message
      });
    }
    
    // 3. EXTRACCIÓN DE CERTIFICADO
    console.log('📋 Extrayendo datos del certificado...');
    const {
      privateKey,
      certificateX509,
      issuerName,
      certificate
    } = await extraerCertificadoYClave(p12Buffer, password);

    // 4. VALIDACIÓN DE CERTIFICADO
    const ahora = new Date();
    if (certificate.validity && certificate.validity.notAfter) {
      const fechaVencimiento = new Date(certificate.validity.notAfter);
      if (fechaVencimiento < ahora) {
        return res.status(400).json({
          success: false,
          error: 'CERTIFICADO_VENCIDO',
          mensaje: 'El certificado digital está vencido',
          solucion: 'Renueve su certificado digital',
          fechaVencimiento: fechaVencimiento.toISOString()
        });
      }
      
      // Advertencia si está por vencerse (30 días)
      const diasParaVencer = Math.floor((fechaVencimiento - ahora) / (1000 * 60 * 60 * 24));
      if (diasParaVencer <= 30) {
        console.warn(`⚠️ Certificado se vence en ${diasParaVencer} días`);
      }
    }

    // 5. FIRMA XML
    console.log('✍️ Firmando XML con XAdES-BES...');
    
    // Convertir XML a buffer para la función signXml
    const xmlBuffer = Buffer.from(xmlLimpio, 'utf8');
    
    const xmlFirmado = await signXml({
      p12Buffer: new Uint8Array(p12Buffer),
      password: password,
      xmlBuffer: new Uint8Array(xmlBuffer)
    });

    const endTime = Date.now();
    const processingTime = endTime - startTime;
    
    console.log('✅ XML firmado exitosamente');
    console.log(`⏱️ Tiempo de procesamiento: ${processingTime}ms`);
    console.log('📊 Resumen de la operación:');
    console.log(`   - Tipo: ${xmlValidacion.comprobante}`);
    console.log(`   - Clave acceso: ${xmlValidacion.claveAcceso}`);
    console.log(`   - Emisor: ${xmlValidacion.razonSocial || 'N/A'}`);
    console.log(`   - RUC: ${xmlValidacion.ruc || 'N/A'}`);
    
    return res.json({
      success: true,
      firmado: xmlFirmado,
      message: 'XML firmado correctamente',
      metadata: {
        tipoComprobante: xmlValidacion.comprobante,
        claveAcceso: xmlValidacion.claveAcceso,
        tiempoProcesamiento: processingTime,
        advertencias: xmlValidacion.advertencias,
        certificado: {
          issuer: issuerName,
          serial: certificate.serialNumber,
          validoHasta: certificate.validity?.notAfter
        }
      }
    });
    
  } catch (err) {
    const endTime = Date.now();
    const processingTime = endTime - startTime;
    
    console.error('❌ Error en el proceso de firma:', {
      error: err.message,
      stack: err.stack,
      tiempoProcesamiento: processingTime
    });
    
    // Clasificar error específico del SRI
    const errorClasificado = clasificarErrorSRI(err, xmlValidacion);
    
    return res.status(500).json({ 
      success: false,
      error: errorClasificado.tipo,
      mensaje: errorClasificado.mensaje,
      solucion: errorClasificado.solucion,
      detalle: err.message,
      tiempoProcesamiento: processingTime,
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint adicional para validación sin firmar
app.post('/validar', async (req, res) => {
  try {
    const { xml } = req.body;
    
    if (!xml) {
      return res.status(400).json({
        success: false,
        error: 'XML_REQUERIDO',
        mensaje: 'Se requiere el XML para validar'
      });
    }
    
    const xmlLimpio = limpiarXML(String(xml));
    const validacion = validarXMLSRI(xmlLimpio);
    
    return res.json({
      success: true,
      validacion: validacion
    });
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'ERROR_VALIDACION',
      mensaje: 'Error al validar XML',
      detalle: err.message
    });
  }
});

// Endpoint para verificar estado del certificado
app.post('/verificar-certificado', async (req, res) => {
  try {
    const { rutaP12, password } = req.body;
    
    if (!rutaP12 || !password) {
      return res.status(400).json({
        success: false,
        error: 'PARAMETROS_REQUERIDOS',
        mensaje: 'Se requiere rutaP12 y password'
      });
    }
    
    await fs.access(rutaP12);
    const p12Buffer = await fs.readFile(rutaP12);
    const { certificate } = await extraerCertificadoYClave(p12Buffer, password);
    
    const ahora = new Date();
    const fechaVencimiento = new Date(certificate.validity.notAfter);
    const diasParaVencer = Math.floor((fechaVencimiento - ahora) / (1000 * 60 * 60 * 24));
    
    return res.json({
      success: true,
      certificado: {
        valido: fechaVencimiento > ahora,
        diasParaVencer,
        fechaVencimiento: fechaVencimiento.toISOString(),
        issuer: certificate.issuer.attributes.map(attr => `${attr.shortName}=${attr.value}`).join(','),
        serial: certificate.serialNumber
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'ERROR_CERTIFICADO',
      mensaje: 'Error al verificar certificado',
      detalle: err.message
    });
  }
});

app.post('/diagnostico-firma', async (req, res) => {
  const startTime = Date.now();

  try {
    const { xml, rutaP12, password } = req.body;

    if (!xml || !rutaP12 || !password) {
      return res.status(400).json({
        success: false,
        error: 'PARAMETROS_REQUERIDOS',
        mensaje: 'Se requiere xml, rutaP12 y password',
        ejemplo: {
          xml: "<?xml version='1.0' encoding='UTF-8'?><factura>...</factura>",
          rutaP12: "C:\\ruta\\a\\certificado.p12",
          password: "contraseña_del_certificado"
        }
      });
    }

    console.log('========================================');
    console.log('🔍 DIAGNÓSTICO COMPLETO DE FIRMA XAdES');
    console.log('========================================');
    console.log(`📄 XML length: ${xml.length} caracteres`);
    console.log(`🔐 Ruta P12: ${rutaP12}`);

    // 1. Análisis del certificado
    console.log('📋 1. ANÁLISIS DEL CERTIFICADO...');
    const p12Buffer = await fs.readFile(rutaP12);
    const certInfo = await extraerCertificadoYClave(p12Buffer, password);

    const diagnostico = {
      certificado: {
        issuer: certInfo.issuerName,
        serial: certInfo.certificate.serialNumber,
        validoHasta: certInfo.certificate.validity.notAfter,
        diasParaVencer: Math.floor((new Date(certInfo.certificate.validity.notAfter) - new Date()) / (1000 * 60 * 60 * 24)),
        modulo: certInfo.modulus.substring(0, 50) + '...', // Primeros 50 caracteres
        exponente: certInfo.exponent,
        hash: certInfo.certificateHash,
        moduloLength: certInfo.modulus.length,
        certificadoLength: certInfo.certificateX509.length
      }
    };

    console.log(`✅ Certificado válido hasta: ${certInfo.certificate.validity.notAfter}`);
    console.log(`✅ Issuer Name: ${certInfo.issuerName}`);

    // 2. Validación XML
    console.log('📄 2. VALIDACIÓN XML...');
    const xmlLimpio = limpiarXML(String(xml));
    const xmlValidacion = validarXMLSRI(xmlLimpio);

    diagnostico.xml = {
      valido: xmlValidacion.valido,
      tipo: xmlValidacion.comprobante,
      claveAcceso: xmlValidacion.claveAcceso,
      errores: xmlValidacion.errores,
      advertencias: xmlValidacion.advertencias,
      tamaño: xmlLimpio.length,
      razonSocial: xmlValidacion.razonSocial,
      ruc: xmlValidacion.ruc
    };

    console.log(`✅ XML válido: ${xmlValidacion.valido}`);
    console.log(`📄 Tipo: ${xmlValidacion.comprobante}`);
    console.log(`🔑 Clave acceso: ${xmlValidacion.claveAcceso}`);

    // 3. Proceso de firma paso a paso
    console.log('✍️ 3. PROCESO DE FIRMA...');

    // 3.1. Extraer información para firma
    const xmlBuffer = Buffer.from(xmlLimpio, 'utf8');

    // 3.2. Generar firma
    const xmlFirmado = await signXml({
      p12Buffer: new Uint8Array(p12Buffer),
      password: password,
      xmlBuffer: new Uint8Array(xmlBuffer)
    });

    console.log(`✅ XML firmado: ${xmlFirmado.length} caracteres`);

    // 3.3. Analizar XML firmado
    const parser = new DOMParser();
    const signedDoc = parser.parseFromString(xmlFirmado, 'text/xml');
    const signatureNode = signedDoc.getElementsByTagName('ds:Signature')[0];

    if (signatureNode) {
      const signatureMethod = signatureNode.getElementsByTagName('ds:SignatureMethod')[0];
      const digestMethods = signatureNode.getElementsByTagName('ds:DigestMethod');
      const issuerName = signatureNode.getElementsByTagName('ds:X509IssuerName')[0];
      const signatureValue = signatureNode.getElementsByTagName('ds:SignatureValue')[0];
      const signedInfo = signatureNode.getElementsByTagName('ds:SignedInfo')[0];
      const keyInfo = signatureNode.getElementsByTagName('ds:KeyInfo')[0];

      diagnostico.firma = {
        signatureEncontrada: true,
        algoritmoFirma: signatureMethod?.getAttribute('Algorithm'),
        algoritmosDigest: Array.from(digestMethods).map(dm => dm.getAttribute('Algorithm')),
        issuerName: issuerName?.textContent,
        signatureValueLength: signatureValue?.textContent?.length,
        signatureValuePreview: signatureValue?.textContent?.substring(0, 100) + '...',
        estructuraCorrecta: true,
        signedInfoEncontrada: !!signedInfo,
        keyInfoEncontrada: !!keyInfo
      };

      console.log(`🔐 Algoritmo firma: ${diagnostico.firma.algoritmoFirma}`);
      console.log(`🔑 Algoritmos digest: ${diagnostico.firma.algoritmosDigest.join(', ')}`);
      console.log(`📝 Issuer Name en firma: ${diagnostico.firma.issuerName}`);
    } else {
      diagnostico.firma = {
        signatureEncontrada: false,
        estructuraCorrecta: false
      };
      console.log('❌ No se encontró nodo de firma');
    }

    // 4. Comparación con XML válido de referencia
    console.log('🔍 4. COMPARACIÓN CON XML VÁLIDO...');

    const referenciaValida = {
      algoritmoFirma: "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256",
      algoritmoDigest: "http://www.w3.org/2001/04/xmlenc#sha256",
      issuerPattern: "L=AMBATO,CN=AUTORIDAD DE CERTIFICACION SUBCA-1 FIRMASEGURA S.A.S.,ST=TUNGURAHUA,OU=ENTIDAD DE CERTIFICACION DE INFORMACION,O=FIRMASEGURA S.A.S.,C=EC"
    };

    diagnostico.comparacion = {
      algoritmoFirmaCorrecto: diagnostico.firma.algoritmoFirma === referenciaValida.algoritmoFirma,
      algoritmoDigestCorrecto: diagnostico.firma.algoritmosDigest?.every(alg => alg === referenciaValida.algoritmoDigest),
      issuerNameCorrecto: diagnostico.firma.issuerName === referenciaValida.issuerPattern,
      todoCorrecto: false,
      detalles: {
        algoritmoFirma: {
          esperado: referenciaValida.algoritmoFirma,
          actual: diagnostico.firma.algoritmoFirma,
          correcto: diagnostico.firma.algoritmoFirma === referenciaValida.algoritmoFirma
        },
        algoritmoDigest: {
          esperado: referenciaValida.algoritmoDigest,
          actual: diagnostico.firma.algoritmosDigest,
          correcto: diagnostico.firma.algoritmosDigest?.every(alg => alg === referenciaValida.algoritmoDigest)
        },
        issuerName: {
          esperado: referenciaValida.issuerPattern,
          actual: diagnostico.firma.issuerName,
          correcto: diagnostico.firma.issuerName === referenciaValida.issuerPattern
        }
      }
    };

    diagnostico.comparacion.todoCorrecto = diagnostico.comparacion.algoritmoFirmaCorrecto && 
                                          diagnostico.comparacion.algoritmoDigestCorrecto && 
                                          diagnostico.comparacion.issuerNameCorrecto;

    console.log(`✅ Algoritmo firma correcto: ${diagnostico.comparacion.algoritmoFirmaCorrecto}`);
    console.log(`✅ Algoritmo digest correcto: ${diagnostico.comparacion.algoritmoDigestCorrecto}`);
    console.log(`✅ Issuer name correcto: ${diagnostico.comparacion.issuerNameCorrecto}`);

    // 5. Recomendaciones
    console.log('💡 5. RECOMENDACIONES...');
    diagnostico.recomendaciones = [];

    if (!diagnostico.xml.valido) {
      diagnostico.recomendaciones.push("❌ Corregir errores de estructura del XML");
    }

    if (!diagnostico.firma.signatureEncontrada) {
      diagnostico.recomendaciones.push("❌ Revisar proceso de generación de firma");
    }

    if (!diagnostico.comparacion.algoritmoFirmaCorrecto) {
      diagnostico.recomendaciones.push("❌ Verificar algoritmo de firma (debe ser RSA-SHA256)");
    }

    if (!diagnostico.comparacion.algoritmoDigestCorrecto) {
      diagnostico.recomendaciones.push("❌ Verificar algoritmo de digest (debe ser SHA256)");
    }

    if (!diagnostico.comparacion.issuerNameCorrecto) {
      diagnostico.recomendaciones.push("❌ Corregir orden de atributos del issuer");
    }

    if (diagnostico.certificado.diasParaVencer < 30) {
      diagnostico.recomendaciones.push(`⚠️ Renovar certificado (se vence en ${diagnostico.certificado.diasParaVencer} días)`);
    }

    if (diagnostico.comparacion.todoCorrecto && diagnostico.xml.valido) {
      diagnostico.recomendaciones.push("✅ La firma parece estructuralmente correcta. El problema podría estar en:");
      diagnostico.recomendaciones.push("   - La clave privada no corresponde al certificado");
      diagnostico.recomendaciones.push("   - Problemas de canonicalización del XML");
      diagnostico.recomendaciones.push("   - Problemas de encoding o padding en la firma");
      diagnostico.recomendaciones.push("   - El certificado podría estar revocado o tener problemas");
    }

    const endTime = Date.now();
    const processingTime = endTime - startTime;

    console.log('✅ Diagnóstico completado');
    console.log(`⏱️ Tiempo de procesamiento: ${processingTime}ms`);
    console.log(`📊 Resultado final: ${diagnostico.comparacion.todoCorrecto ? '✅ CORRECTO' : '❌ CON ERRORES'}`);

    return res.json({
      success: true,
      mensaje: 'Diagnóstico completado',
      tiempoProcesamiento: processingTime,
      resultadoFinal: diagnostico.comparacion.todoCorrecto ? 'CORRECTO' : 'CON_ERRORES',
      diagnostico: diagnostico,
      xmlFirmado: xmlFirmado.substring(0, 1500) + '...', // Primeros 1500 caracteres
      resumen: {
        xmlValido: diagnostico.xml.valido,
        firmaGenerada: diagnostico.firma.signatureEncontrada,
        algoritmosCorrectos: diagnostico.comparacion.todoCorrecto,
        issuerCorrecto: diagnostico.comparacion.issuerNameCorrecto,
        recomendaciones: diagnostico.recomendaciones.length
      }
    });

  } catch (err) {
    const endTime = Date.now();
    const processingTime = endTime - startTime;

    console.error('❌ Error en diagnóstico:', {
      error: err.message,
      stack: err.stack,
      tiempoProcesamiento: processingTime
    });

    return res.status(500).json({
      success: false,
      error: 'ERROR_DIAGNOSTICO',
      mensaje: 'Error durante el diagnóstico',
      detalle: err.message,
      tiempoProcesamiento: processingTime
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'XML Signer with XAdES' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📝 Endpoint: http://localhost:${PORT}/firmar`);
});