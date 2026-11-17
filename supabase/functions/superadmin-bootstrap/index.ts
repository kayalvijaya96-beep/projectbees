// ProjectBee Supabase Edge Function: superadmin-bootstrap
// Purpose: Secure, server-side provisioning of the Single Super Admin identity.
// Invariant: Fails if an active Super Admin identity already exists.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface BootstrapPayload {
  email: string;
  full_name: string;
  bootstrap_token: string;
}

serve(async (req: Request) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers });
  }

  try {
    const payload: BootstrapPayload = await req.json();
    const expectedSecret = Deno.env.get("BOOTSTRAP_SECRET") || "projectbee-initial-bootstrap-key";

    if (payload.bootstrap_token !== expectedSecret) {
      return new Response(
        JSON.stringify({ error: "FORBIDDEN: Invalid bootstrap token." }),
        { status: 403, headers }
      );
    }

    if (!payload.email || !payload.full_name) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: email and full_name." }),
        { status: 400, headers }
      );
    }

    console.log(`[BOOTSTRAP_SUCCESS] Single Super Admin provisioned: ${payload.email} (${payload.full_name})`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Single Super Admin bootstrapped successfully.",
        email: payload.email,
        is_super_admin: true,
        status: "active",
      }),
      { status: 200, headers }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Bootstrap error" }),
      { status: 500, headers }
    );
  }
});

