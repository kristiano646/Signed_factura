/**
 * Override global Date para forzar UTC-5 (Ecuador)
 * Esto asegura que signXml() use la hora correcta
 */

const OriginalDate = global.Date;

class EcuadorDate extends OriginalDate {
  constructor(...args) {
    if (args.length === 0) {
      // new Date() sin argumentos → usar fecha actual en UTC-5
      const now = new OriginalDate();
      const utcTime = now.getTime();
      const ecuadorTime = new OriginalDate(utcTime - 5 * 60 * 60 * 1000); // UTC-5
      super(ecuadorTime.toUTCString());
    } else {
      super(...args);
    }
  }

  static now() {
    const now = OriginalDate.now();
    return now - 5 * 60 * 60 * 1000; // Restar 5 horas
  }

  static parse(dateString) {
    return OriginalDate.parse(dateString);
  }

  static UTC(...args) {
    return OriginalDate.UTC(...args);
  }
}

// Copiar propiedades estáticas
Object.setPrototypeOf(EcuadorDate, OriginalDate);
EcuadorDate.prototype = Object.create(OriginalDate.prototype);

global.Date = EcuadorDate;

console.log('⏰ Date override aplicado: UTC-5 (Ecuador)');
