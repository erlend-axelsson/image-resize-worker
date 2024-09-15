/// <reference types="vitest" />
import {resolve} from "path"
import {defineConfig} from "vite";

export default defineConfig({
    build: {
        copyPublicDir: false,
        lib: {
            formats: ["es"],
            entry: resolve(__dirname, "lib/main.ts"),
            name: "image-resize-worker",
            fileName: "image-resize-worker",
        }
    }
});


