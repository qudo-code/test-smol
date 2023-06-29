import { defineConfig, loadEnv } from "vite";
import preprocess from "svelte-preprocess";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig(({ command, mode }) => {
    const isProduction = mode === "production";

    const env = loadEnv(mode, process.cwd(), "");

    return {
        // define: {
        //     __API_URL__: env.VITE_API_URL,
        // },
        plugins: [
            svelte({
                dev: !isProduction,
                preprocess: preprocess(),
            }),
        ],
    };
});
