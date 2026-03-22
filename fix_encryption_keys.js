const crypto = require('crypto');

console.log('🔧 GENERANDO CLAES DE ENCRIPTACIÓN VÁLIDAS');
console.log('========================================');

// Generar Key de 32 bytes (256 bits) para AES-256
const key = crypto.randomBytes(32);
const keyBase64 = key.toString('base64');

// Generar IV de 16 bytes (128 bits) para AES
const iv = crypto.randomBytes(16);
const ivBase64 = iv.toString('base64');

console.log('🔑 Nueva Key (32 bytes):', keyBase64);
console.log('📊 Longitud Key:', keyBase64.length);
console.log('');

console.log('🔑 Nuevo IV (16 bytes):', ivBase64);
console.log('📊 Longitud IV:', ivBase64.length);
console.log('');

console.log('📋 Configuración para appsettings.json:');
console.log('{');
console.log('  "Encryption": {');
console.log(`    "Key": "${keyBase64}",`);
console.log(`    "IV": "${ivBase64}"`);
console.log('  }');
console.log('}');
console.log('');

// Verificar que sean Base64 válidos
console.log('✅ Verificando que las claves son Base64 válidos...');

try {
  const keyBuffer = Buffer.from(keyBase64, 'base64');
  console.log('✅ Key válida - Longitud:', keyBuffer.length, 'bytes');
} catch (error) {
  console.log('❌ Key inválida:', error.message);
}

try {
  const ivBuffer = Buffer.from(ivBase64, 'base64');
  console.log('✅ IV válida - Longitud:', ivBuffer.length, 'bytes');
} catch (error) {
  console.log('❌ IV inválida:', error.message);
}

console.log('');
console.log('🎉 ¡Claves generadas exitosamente!');
console.log('💡 Copia y reemplaza la sección "Encryption" en tu appsettings.json');
