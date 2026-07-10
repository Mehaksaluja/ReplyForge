import { useState } from "react";
import { useGoogleAuth } from "../lib/googleAuth";
import { API_BASE_URL } from "../config";

const buttonClass =
  "mt-6 inline-block rounded-full border-2 border-neutral-950 bg-orange-600 px-6 py-3 text-center text-sm font-bold text-white shadow-hard transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#0a0a0a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60";

function StatusBanner() {
  const params = new URLSearchParams(window.location.search);
  const checkoutStatus = params.get("status");

  if (checkoutStatus === "success") {
    return (
      <p className="mb-6 rounded-xl border-2 border-neutral-950 bg-orange-50 px-4 py-3 text-sm font-semibold text-neutral-800">
        Payment complete. Your account is now on Pro — head back to Gmail and start replying.
      </p>
    );
  }
  if (checkoutStatus === "cancelled") {
    return (
      <p className="mb-6 rounded-xl border-2 border-neutral-950 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-800">
        Checkout was cancelled. You can try again below whenever you're ready.
      </p>
    );
  }
  return null;
}

export function Upgrade() {
  const { status, identity, error, signIn } = useGoogleAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  async function handleUpgrade() {
    if (!identity) return;
    setIsRedirecting(true);
    setCheckoutError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/billing/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${identity.accessToken}`,
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Could not start checkout");
      }
      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Could not start checkout");
      setIsRedirecting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16">
        <a href="/" className="mb-10 font-logo text-xl text-neutral-950">
          ReplyForge
        </a>

        <StatusBanner />

        <h1 className="font-marker text-3xl font-bold text-neutral-950">Upgrade to Pro</h1>
        <p className="mt-2 text-neutral-600">Unlimited AI replies, right inside Gmail — $7/month.</p>

        <div className="mt-8 rounded-2xl border-2 border-neutral-950 bg-white p-6 shadow-hard">
          {status !== "signed-in" && (
            <>
              <p className="text-sm font-semibold text-neutral-600">
                Sign in with the Google account you use in Gmail so we know whose account to upgrade.
              </p>
              <button className={buttonClass} onClick={signIn} disabled={status === "loading"}>
                {status === "loading" ? "Signing in..." : "Sign in with Google"}
              </button>
              {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
            </>
          )}

          {status === "signed-in" && identity && (
            <>
              <p className="text-sm font-semibold text-neutral-600">Upgrading</p>
              <p className="mt-1 text-lg font-bold text-neutral-950">{identity.email}</p>
              <p className="mt-1 text-sm text-neutral-500">to ReplyForge Pro — unlimited replies.</p>
              <button className={buttonClass} onClick={handleUpgrade} disabled={isRedirecting}>
                {isRedirecting ? "Redirecting to checkout..." : "Upgrade — $7/month"}
              </button>
              {checkoutError && <p className="mt-3 text-sm font-semibold text-red-600">{checkoutError}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
