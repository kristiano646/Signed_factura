// import { defineConfig } from 'tsup';

// export default defineConfig({
//     entry: ['src/index.ts'],
//     format: ['cjs', 'esm'],
//     dts: true,
//     clean: true,
//     minify: false, // Desactivar minificación para reducir uso de memoria
//     sourcemap: false, // Desactivar sourcemaps para reducir uso de memoria
// });

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // ← Deshabilitar generación de tipos
  clean: true,
  sourcemap: false,
  minify: false,
  target: 'es2019',
});