import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/2026-siso-web/', // 레포지토리 이름을 정확히 적어주세요!
});
