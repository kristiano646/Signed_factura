/**
 * Fija la zona horaria del proceso a Ecuador (UTC-5) sin alterar el reloj real.
 */

process.env.TZ = process.env.TZ || 'America/Guayaquil';

console.log('⏰ Timezone del proceso fijada a America/Guayaquil');
