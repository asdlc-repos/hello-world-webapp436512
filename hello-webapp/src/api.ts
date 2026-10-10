import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./generated/hello-api";
import { ForbiddenError, authorizationHeader, classifyResponse } from "./authz/client";

// Same-origin: nginx strips /api and proxies to hello-api through the gateway.
export const helloApi = createClient<paths>({ baseUrl: "/api" });

// Authorization rules live in src/authz/client.ts; this only calls them.
const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const header = await authorizationHeader();
    if (header) request.headers.set("Authorization", header);
    return request;
  },
  async onResponse({ response }) {
    if ((await classifyResponse(response.status)) === "forbidden") {
      throw new ForbiddenError(response.status);
    }
    return response;
  },
};

helloApi.use(authMiddleware);
