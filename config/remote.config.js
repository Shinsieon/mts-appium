import {wdioConfig} from "./wdio.config.js";

export const remoteConfig = {
    protocol: "http",
    hostname: "127.0.0.1",
    port: 4723,
    path: "/",
    logLevel: 'error',
    capabilities: wdioConfig,
  }