/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development
 *   server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
    // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
    // MY_KV_NAMESPACE: KVNamespace;
    //
    // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
    // MY_DURABLE_OBJECT: DurableObjectNamespace;
    //
    // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
    // MY_BUCKET: R2Bucket;
    //
    // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
    // MY_SERVICE: Fetcher;
}

const jsonFromRequest = async (request: Request) => {
    let json = {};

    try {
        json = await request.json();
    } catch (e) {
        json = {
            error: "Invalid JSON",
        };
    }

    return json;
};

const handleApplicationSubmission = async (request: Request) => {
    const json = await jsonFromRequest(request);

    const response = new Response(JSON.stringify({}), { status: 200 });

    // eslint-disable-next-line no-console
    console.log(json);

    return response;
};

const generateResponse = async (request: Request) => {
    const pathname = new URL(request.url).pathname;

    switch (request.method) {
        case "OPTIONS":
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods":
                        "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Origin": "*",
                },
                status: 204,
            });

        case "POST":
            switch (pathname) {
                case "/mentor-application":
                    return await handleApplicationSubmission(request);
            }

        default:
            return new Response("You're lost.", { status: 404 });
    }
};

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        const response = await generateResponse(request);

        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Credentials", "true");

        return response;
    },
};
