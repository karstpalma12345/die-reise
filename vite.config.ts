import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// base './' = works under any GitHub Pages repository name, no editing needed.
export default defineConfig({ base: './', plugins: [react()] });
