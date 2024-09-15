/// <reference types="vitest" />
import {resolve} from "path"
import {defineConfig} from "vite";
import dts from 'vite-plugin-dts'

export default defineConfig({
    base:"./",
    build: {
        copyPublicDir: false,
        lib: {
            formats: ["es"],
            entry: resolve(__dirname, "lib/resize.ts"),
            name: "image-resize-worker",
            fileName: "image-resize-worker",
        }
    },
    plugins: [dts({ tsconfigPath: './tsconfig.json' })]
});


