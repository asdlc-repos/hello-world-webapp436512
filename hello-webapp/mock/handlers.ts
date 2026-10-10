import { http, HttpResponse } from "msw";
import type { components } from "../src/generated/hello-api";

type Greeting = components["schemas"]["Greeting"];

// State lives in the page: a full reload re-runs this module. Scope checks are
// the gateway's job (mock/authz/gateway.ts), not the handler's.
// Append ?apiDown=1 to the URL to see the GreetingError state.
const apiDown = new URLSearchParams(window.location.search).has("apiDown");

export const handlers = [
  http.get("/api/greeting", () => {
    if (apiDown) return HttpResponse.json({ code: 502, message: "Bad gateway" }, { status: 502 });
    const body: Greeting = { message: "Hello, World!" };
    return HttpResponse.json(body);
  }),
];
