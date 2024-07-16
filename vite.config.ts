// vite.config.ts
import { defineConfig } from 'vite'
import webExtension from 'vite-plugin-web-extension'

let target = process.env.TARGET || 'chrome'

export default defineConfig({
    plugins: [
        webExtension({
            manifest:
                target == 'chrome'
                    ? 'src/manifest.json'
                    : 'src/manifest.v2.json',
        }),
    ],
})
