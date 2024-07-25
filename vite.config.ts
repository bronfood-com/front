// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import svgr from 'vite-plugin-svgr';
// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react(), svgr()],
//     base: process.env.NODE_ENV === 'production' ? '/front/#/' : '',
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const prNumber = process.env.PULL_REQUEST_NUMBER;

export default defineConfig({
    plugins: [react(), svgr()],
    base: prNumber ? `/front/pr-preview/pr-${prNumber}/` : '/',
});
