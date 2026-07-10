import { useCallback, useEffect, useState } from "react";
import { GOOGLE_CLIENT_ID } from "../config";

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient(config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token?: string; error?: string }) => void;
          }): { requestAccessToken(): void };
        };
      };
    };
  }
}

const GIS_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

let scriptLoadPromise: Promise<void> | null = null;

function loadGoogleScript(): Promise<void> {
  if (scriptLoadPromise) return scriptLoadPromise;
  scriptLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${GIS_SCRIPT_SRC}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = GIS_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Sign-In script"));
    document.head.appendChild(script);
  });
  return scriptLoadPromise;
}

interface GoogleIdentity {
  email: string;
  name: string;
  accessToken: string;
}

type AuthStatus = "idle" | "loading" | "signed-in" | "error";

export function useGoogleAuth() {
  const [status, setStatus] = useState<AuthStatus>("idle");
  const [identity, setIdentity] = useState<GoogleIdentity | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGoogleScript().catch(() => setError("Could not load Google Sign-In. Check your connection and retry."));
  }, []);

  const signIn = useCallback(() => {
    if (!GOOGLE_CLIENT_ID) {
      setError("Google Sign-In isn't configured yet.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);

    loadGoogleScript()
      .then(() => {
        const client = window.google?.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
          callback: async (response) => {
            if (!response.access_token) {
              setError(response.error ?? "Sign-in was cancelled.");
              setStatus("error");
              return;
            }
            try {
              const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { Authorization: `Bearer ${response.access_token}` },
              });
              if (!res.ok) throw new Error("Could not verify Google account");
              const data = (await res.json()) as { email: string; name?: string };
              setIdentity({ email: data.email, name: data.name ?? data.email, accessToken: response.access_token as string });
              setStatus("signed-in");
            } catch {
              setError("Could not verify your Google account. Please try again.");
              setStatus("error");
            }
          },
        });
        client?.requestAccessToken();
      })
      .catch(() => {
        setError("Could not load Google Sign-In. Check your connection and retry.");
        setStatus("error");
      });
  }, []);

  return { status, identity, error, signIn };
}
