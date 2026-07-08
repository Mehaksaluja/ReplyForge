import type { Request, Response, NextFunction } from "express";
import { getSupabase } from "../db/supabase.js";

export interface AuthedUser {
  id: string;
  googleSub: string;
  email: string;
  name: string;
  freeRepliesUsed: number;
  subscriptionStatus: string;
}

export interface AuthedRequest extends Request {
  user?: AuthedUser;
}

interface GoogleUserInfo {
  sub: string;
  email: string;
  name?: string;
}

async function verifyGoogleToken(token: string): Promise<GoogleUserInfo> {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error("Invalid Google token");
  }
  const data = (await res.json()) as GoogleUserInfo;
  if (!data.sub || !data.email) {
    throw new Error("Google token missing sub/email");
  }
  return data;
}

async function getOrCreateUser(googleSub: string, email: string) {
  const supabase = getSupabase();

  const { data: existing, error: selectError } = await supabase
    .from("users")
    .select("*")
    .eq("google_sub", googleSub)
    .maybeSingle();
  if (selectError) throw selectError;
  if (existing) return existing;

  const { data: created, error: insertError } = await supabase
    .from("users")
    .insert({ google_sub: googleSub, email })
    .select("*")
    .single();
  if (insertError) throw insertError;
  return created;
}

export async function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "missing_token" });
    return;
  }
  const token = header.slice("Bearer ".length);

  try {
    const { sub, email, name } = await verifyGoogleToken(token);
    const row = await getOrCreateUser(sub, email);
    req.user = {
      id: row.id,
      googleSub: row.google_sub,
      email: row.email,
      name: name ?? row.email,
      freeRepliesUsed: row.free_replies_used,
      subscriptionStatus: row.subscription_status,
    };
    next();
  } catch {
    res.status(401).json({ error: "invalid_token" });
  }
}
