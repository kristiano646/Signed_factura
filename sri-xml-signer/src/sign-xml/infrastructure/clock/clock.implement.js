export class ClockImplement {
    nowISO() {
        const date = new Date();
        const localOffset = date.getTimezoneOffset(); // en minutos
        const desiredOffset = 300; // UTC-5 → Ecuador
        // Si ya estamos en Ecuador, no modificar
        const targetDate = localOffset === desiredOffset
            ? date
            : new Date(date.getTime() + (localOffset - desiredOffset) * 60000);
        const y = targetDate.getFullYear();
        const mo = String(targetDate.getMonth() + 1).padStart(2, "0");
        const d = String(targetDate.getDate()).padStart(2, "0");
        const h = String(targetDate.getHours()).padStart(2, "0");
        const mi = String(targetDate.getMinutes()).padStart(2, "0");
        const s = String(targetDate.getSeconds()).padStart(2, "0");
        return `${y}-${mo}-${d}T${h}:${mi}:${s}-05:00`;
    }
}
