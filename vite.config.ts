import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    base: process.env.NODE_ENV === 'production' ? '/front/pr-preview/pr-40/' : '',

});

