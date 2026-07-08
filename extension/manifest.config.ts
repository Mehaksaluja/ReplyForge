import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "MailPilot",
  version: "0.1.0",
  description: "Chat with your email, right inside Gmail.",
  action: {
    default_title: "MailPilot",
  },
  background: {
    service_worker: "src/background/service-worker.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["https://mail.google.com/*"],
      js: ["src/content/content-script.tsx"],
    },
  ],
  permissions: [],
  host_permissions: ["http://localhost:3000/*"],
});
