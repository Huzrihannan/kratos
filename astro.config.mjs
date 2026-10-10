import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://kratos.website',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
