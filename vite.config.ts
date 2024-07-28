import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    base: process.env.GITHUB_REF ? `/front/pr-preview/${process.env.GITHUB_REF}/` : '/',
});
