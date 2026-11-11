// POC mock API layer.
// Every production service calls the shared axios instance (src/services/api.js).
// We replace axios' default adapter so those calls resolve from local fixtures
// instead of the real backend. Service files and components stay unchanged.
import axios from "axios";
import { routes } from "./fixtures";

const seen = new Set();

const mockAdapter = async (config) => {
  const method = (config.method || "get").toUpperCase();
  const url = (config.url || "").replace(/^https?:\/\/[^/]+/, "");
  const match = routes.find(
    (r) => (!r.method || r.method === method) && r.test.test(url)
  );
  let data = { result: {} };
  if (match) {
    data = typeof match.data === "function" ? match.data(url, config) : match.data;
  } else if (!seen.has(`${method} ${url}`)) {
    seen.add(`${method} ${url}`);
    console.info(`[POC mock] no fixture for ${method} ${url}`);
  }
  await new Promise((r) => setTimeout(r, 120));
  return {
    data: structuredClone(data),
    status: 200,
    statusText: "OK",
    headers: {},
    config,
    request: {},
  };
};

axios.defaults.adapter = mockAdapter;
export default mockAdapter;
