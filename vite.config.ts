import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3002, // Optional: to keep the same port as CRA
        open: true    // Optional: to open the browser automatically
    },
    build: {
        outDir: 'build' // Optional: to keep the same output directory name as CRA
    }
});