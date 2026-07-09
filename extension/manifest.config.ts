import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "ReplyForge",
  version: "0.1.0",
  description: "Chat with your email, right inside Gmail.",
  icons: {
    "16": "public/icons/icon16.png",
    "48": "public/icons/icon48.png",
    "128": "public/icons/icon128.png",
  },
  action: {
    default_title: "ReplyForge",
    default_icon: {
      "16": "public/icons/icon16.png",
      "48": "public/icons/icon48.png",
      "128": "public/icons/icon128.png",
    },
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
  permissions: ["identity"],
  host_permissions: [
    "http://localhost:3000/*",
    // TODO: replace with your deployed Railway backend URL before shipping (see README)
    "https://YOUR-RAILWAY-APP.up.railway.app/*",
  ],
  oauth2: {
    // TODO: replace with your Google OAuth client ID (see README "Google OAuth setup")
    client_id: "296237434626-kk8h6mgq6jshfm4ehb0pduvf2d6bmss9.apps.googleusercontent.com",
    scopes: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  },
  commands: {
    "toggle-panel": {
      suggested_key: {
        default: "Ctrl+Shift+M",
        mac: "Command+Shift+M",
      },
      description: "Toggle the ReplyForge panel",
    },
  },
});
