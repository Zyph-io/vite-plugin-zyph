# vite-plugin-zyph

vite plugin to connect to Zyph SDK

## install

```
npm i Zyph-io/vite-plugin-zyph
```

vite.config.ts
```ts
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import zyph from "vite-plugin-zyph";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react(), zyph()],
});
```